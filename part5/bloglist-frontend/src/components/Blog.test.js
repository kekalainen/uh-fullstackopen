import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Blog from './Blog';

const user = {
  username: 'Example username',
  name: 'Example user',
};

const blog = {
  author: 'Example author',
  title: 'Example title',
  url: 'https://example.com/blog',
  likes: 0,
  user,
};

beforeEach(() => {
  render(<Blog blog={blog} user={user} />);
});

describe('when collapsed', () => {
  it('renders the title and author', () => {
    expect(screen.getByText(new RegExp(blog.title))).toBeVisible();
    expect(screen.getByText(new RegExp(blog.author))).toBeVisible();
  });

  it('does not render the URL or likes', () => {
    expect(screen.queryByText(new RegExp(blog.url))).not.toBeInTheDocument();
    expect(screen.queryByText(/likes/i)).not.toBeInTheDocument();
  });
});
