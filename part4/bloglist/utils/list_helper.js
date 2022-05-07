const dummy = (_blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

module.exports = {
  dummy,
  totalLikes,
};
