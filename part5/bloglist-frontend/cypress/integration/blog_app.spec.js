const apiBaseUrl = 'http://localhost:3003/api',
  baseUrl = 'http://localhost:3000';

const user = {
  name: 'Tester',
  username: 'tester',
  password: 'hunter2',
};

const blog = {
  author: 'Example author',
  title: 'Example title',
  url: 'https://example.com/blog',
};

const attemptLogin = ({ username, password }) => {
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
};

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${apiBaseUrl}/testing/reset`);
    cy.request('POST', `${apiBaseUrl}/users`, user);
    cy.visit(baseUrl);
  });

  it('shows the login form', function () {
    cy.contains(/log in/i);
    cy.get('form');
  });

  describe('Login', function () {
    it('succeeds with valid credentials', function () {
      attemptLogin(user);
      cy.contains(/log out/i);
    });

    it('fails with invalid credentials', function () {
      attemptLogin({ username: 'invalid', password: 'invalid' });
      cy.get('.notification.error').contains(/invalid/i);
    });
  });

  context('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', `${apiBaseUrl}/auth`, user).then((response) => {
        localStorage.setItem('auth', JSON.stringify(response.body));
        cy.visit(baseUrl);
      });
    });

    it('can create a new blog', function () {
      cy.contains('button', /new blog/i).click();

      cy.contains('label', /title/i).children('input').type(blog.title);
      cy.contains('label', /author/i)
        .children('input')
        .type(blog.author);
      cy.contains('label', /url/i).children('input').type(blog.url);
      cy.contains('button[type="submit"]', /create/i).click();

      cy.contains(':not(.notification)', blog.title);
    });

    context('and a blog exists', function () {
      beforeEach(function () {
        cy.requestWithAuth({
          method: 'POST',
          url: `${apiBaseUrl}/blogs`,
          body: blog,
        }).then(() => cy.visit(baseUrl));
      });

      it('can like a blog', function () {
        cy.contains('button', /expand/i).click();
        cy.contains(/likes 0/i);

        cy.contains('button', /like/i).click();
        cy.get('.notification').contains(/like/i);
        cy.contains(/likes 1/i);
      });
    });
  });
});
