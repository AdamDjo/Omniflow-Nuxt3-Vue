describe('Products Test', () => {
  it('Visits page products', () => {
    cy.visit('http://localhost:3000/fr/products');
    const text = 'test input';
    cy.focused().should('id', 'search');
    cy.get('#search').type(text);
    cy.get('#searchText')
      .invoke('text')
      .then((sometext) => cy.expect(sometext.trim().replace(/[/\n]/g, '')).equal(text));

    // Before(() => {
    //   cy.log('before');
    // });
    // After(() => {
    //   cy.log('After');
    // });

    // Then('the url will contains the {string} subdirectory', (subdirectory) => {
    //   cy.url().should('contains', subdirectory);
    // });
  });
});
