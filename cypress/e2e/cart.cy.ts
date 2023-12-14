import recipes from '../fixtures/recipes.json';

describe('cart spec', () => {
	beforeEach(() => {
		cy.visit('/recipes');

		cy.intercept('POST', `${Cypress.env('apiUrl')}/order`, { statusCode: 200 });
		cy.intercept('GET', `${Cypress.env('apiUrl')}/recipe`, {
			statusCode: 200,
			body: recipes,
		});

		cy.wait(500);
	});

	it('renders proper empty cart layout', () => {
		cy.contains('🛒').click();

		cy.get('.modal-title').should('have.text', 'Carrinho');
		cy.get('.modal-body').should('have.text', 'Seu carrinho esta vazio!');
		cy.get('.modal-footer').contains('Fechar').click();
		cy.get('.modal-content').should('not.exist');
	});

	it('add item to cart', () => {
		const [{ icon, name }] = recipes;
		cy.get('.btn').contains('Pedir').click();

		cy.get('.modal-body [data-cy="icon-element"] i').should('have.text', icon);
		cy.get('.modal-body [data-cy="icon-element"] span').should('have.text', name);
		cy.get('.modal-body [data-cy="amount-selector"] span').should('have.text', 1);

		cy.get('button').contains('Fazer Pedido').click();
		cy.get('.Toastify__toast-body').should('have.text', 'Pedido realizado com sucesso!');
		cy.get('.Toastify__close-button').click();
	});
});
