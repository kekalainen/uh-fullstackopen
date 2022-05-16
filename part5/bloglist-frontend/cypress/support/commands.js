Cypress.Commands.add('requestWithAuth', (params) => {
  cy.request({
    ...params,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
  });
});
