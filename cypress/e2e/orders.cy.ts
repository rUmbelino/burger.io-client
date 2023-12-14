import orders from '../fixtures/orders.json';

describe('orders spec', () => {
	beforeEach(() => {
		cy.intercept('POST', `${Cypress.env('apiUrl')}/order`, { statusCode: 200, body: orders });

		cy.visit('/orders');
		cy.wait(500);
	});

	it('renders the list of orders', () => {
		orders.forEach(({ id, recepies }) => {
			cy.get('.accordion-button').should('have.text', `Pedido #${id}`);

			recepies.forEach(({ icon, quantity, name }, i) => {
				cy.get('[data-cy="icon-element"] i').eq(i).should('have.text', icon);
				cy.get('[data-cy="icon-element"] span').eq(i).should('have.text', `${quantity}x - ${name}`);
			});

			cy.get('button').contains('Pedir Novamente').click();
			cy.get('.modal-content').should('exist');
		});
	});
});
