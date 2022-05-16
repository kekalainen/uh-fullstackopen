describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('shows the login form', function () {
    cy.contains(/log in/i);
    cy.get('form');
  });
});
