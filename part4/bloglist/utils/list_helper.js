const dummy = (_blogs) => 1;

const favoriteBlog = (blogs) =>
  blogs.length
    ? blogs.reduce((favorite, current) =>
        current.likes > favorite.likes ? current : favorite
      )
    : null;

const mostBlogs = (blogs) => {
  if (!blogs.length) return;

  let blogCounts = {};

  blogs.forEach(
    (blog) => (blogCounts[blog.author] = (blogCounts[blog.author] ?? 0) + 1)
  );

  const highestCount = Object.entries(blogCounts).reduce((selected, current) =>
    current[1] > selected[1] ? current : selected
  );

  return {
    author: highestCount[0],
    blogs: highestCount[1],
  };
};

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  totalLikes,
};
