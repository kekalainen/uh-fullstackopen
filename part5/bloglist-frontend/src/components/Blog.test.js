import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

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

const setup = (props) => ({
  user: userEvent.setup(),
  ...render(<Blog blog={blog} user={user} {...props} />),
  expandButton: screen.getByRole('button', { name: /expand/i }),
});

describe('when collapsed', () => {
  beforeEach(() => setup());

  it('renders the title and author', () => {
    expect(screen.getByText(new RegExp(blog.title))).toBeVisible();
    expect(screen.getByText(new RegExp(blog.author))).toBeVisible();
  });

  it('does not render the URL or likes', () => {
    expect(screen.queryByText(new RegExp(blog.url))).not.toBeInTheDocument();
    expect(screen.queryByText(/likes/i)).not.toBeInTheDocument();
  });
});

describe('when expanded', () => {
  it('renders the URL and likes', async () => {
    const { expandButton, user } = setup();
    await user.click(expandButton);

    expect(screen.queryByText(new RegExp(blog.url))).toBeVisible();
    expect(screen.queryByText(/likes/i)).toBeVisible();
  });
});
