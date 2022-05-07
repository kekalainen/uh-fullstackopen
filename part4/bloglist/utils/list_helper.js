const dummy = (_blogs) => 1;

const favoriteBlog = (blogs) =>
  blogs.reduce((favorite, current) =>
    current.likes > favorite.likes ? current : favorite
  );

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
};
