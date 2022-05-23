import { getSystemErrorMap } from 'util';

describe('examples', () => {
  beforeEach(() => cy.visit('/list'));

  it('should have working search filter', () => {
    let searchInput = cy.get('input[data-filter-field=search]');
    searchInput.should('have.value', '');
    searchInput.type('Adrian');
    searchInput.should('have.value', 'Adrian');
  });
  it('should have multiple filter', () => {
    cy.get('input[data-filter-field=search]')
      .should('have.value', '')
      .type('Adrian')
      .should('have.value', 'Adrian');
    cy.get('button[data-role=filter-buttons]').focus().click();
    cy.get('div[data-role=filter-buttons-menu] button[role=menuitem]:first')
      .focus()
      .click();
    cy.get('[data-role=filter-form] > div').its('length').should('eq', 2);
  });
  it('should display 10 row of data', () => {
    cy.get('input[data-filter-field=search]').type('Adrian');
    cy.get('table tbody tr').its('length').should('eq', 10);
  });
  it('should change page', () => {
    cy.get('input[data-filter-field=search]').type('Adrian');
    cy.get('table tbody tr').its('length').should('eq', 10);
    cy.get('[data-role=list-navigation]').get('button').eq(2).focus().click();
  });
});
