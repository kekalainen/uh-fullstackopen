const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./blog_api_test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Promise.all(helper.initialBlogs.map((blog) => new Blog(blog).save()));
});

describe('indexing blogs', () => {
  test('media type is JSON', () =>
    api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/));

  test('all blogs are present', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('identifier property is not prefixed with an underscore', async () => {
    const blog = (await api.get('/api/blogs')).body[0];
    expect(blog._id).toBeUndefined();
    expect(blog.id).toBeDefined();
  });
});

describe('creating a blog', () => {
  test('succeeds with valid data', async () => {
    await api
      .post('/api/blogs')
      .send(helper.exampleBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const finalBlogs = await helper.blogsInDb();
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(finalBlogs.map((blog) => blog.title)).toContain(
      helper.exampleBlog.title
    );
  });

  test('likes property is set to 0 by default', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.exampleBlog)
      .expect(201);

    expect(response.body.likes).toEqual(0);
  });

  test('fails with missing properties', () =>
    api.post('/api/blogs').send({}).expect(400));
});

afterAll(() => mongoose.connection.close());
