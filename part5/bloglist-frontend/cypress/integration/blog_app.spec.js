const user = {
  name: 'Tester',
  username: 'tester',
  password: 'hunter2',
};

const attemptLogin = ({ username, password }) => {
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
};

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3000/api/users', user);
    cy.visit('http://localhost:3000');
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
});
