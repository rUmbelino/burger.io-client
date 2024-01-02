import ingredient from '../fixtures/ingredient.json';
import ingredientList from '../fixtures/ingredientList.json';

describe('ingredints spec', () => {
	beforeEach(() => {
		cy.intercept('GET', `${Cypress.env('apiUrl')}/ingredient`, { fixture: 'ingredientList' });
		cy.intercept('PUT|POST|DELETE|GET', `${Cypress.env('apiUrl')}/ingredient/*`);
		cy.visit('/ingredients');
	});

	describe('ingredient item list', () => {
		it('list correct amount of ingredients', () => {
			cy.get('[data-cy="page-container"] .list-group-item').should('have.length', ingredientList.length);
		});

		it('render each item as expected', () => {
			ingredientList.forEach(({ icon, name, storedAmount }) => {
				cy.get('[data-cy="icon-element"]').contains(icon);
				cy.get('[data-cy="icon-element"]').contains(`${name} - ${storedAmount} em estoque`);
				cy.get('[data-cy="amount-selector"]').contains(storedAmount);
			});
		});

		it('validate item storage actions', () => {
			ingredientList.forEach(({ storedAmount }, index) => {
				cy.get('[data-cy="amount-selector"]').eq(index).contains('-').click();
				cy.get('[data-cy="amount-selector"]').contains(storedAmount - 1);
				cy.get('[data-cy="amount-selector"]').eq(index).contains('+').click();
				cy.get('[data-cy="amount-selector"]').contains(storedAmount);
			});
		});

		it('validate save request actions', () => {
			const [{ storedAmount, icon }] = ingredientList;
			cy.get('[data-cy="page-container"] .list-group-item').eq(0).contains('Salvar').click();
			cy.get('.Toastify__toast-body').should('have.text', `${storedAmount}x ${icon} - Estoque atualizado!`);
			cy.get('.Toastify__close-button').click();
		});

		it('validate delete request actions', () => {
			cy.get('[data-cy="page-container"] .list-group-item').eq(0).contains('Deletar').click();

			cy.get('[data-cy="tooltip"]').contains('Deseja remover este item de maneira permanente?');
			cy.get('[data-cy="tooltip"]').contains('Sim').click();

			cy.get('.Toastify__toast-body').should('have.text', 'Ingrediente removido com sucesso!');
			cy.get('.Toastify__close-button').click();
		});
	});

	describe('Ingredient Form', () => {
		it('open and closes the modal', () => {
			cy.get('button').contains('Cadastrar Ingrediente').click();
			cy.get('.modal-dialog').should('exist');
			cy.get('.modal-dialog .btn-close').click();
			cy.get('.modal-dialog').should('not.exist');
		});

		it('register a new Ingredient', () => {
			cy.get('button').contains('Cadastrar Ingrediente').click();
			cy.wait(500);

			cy.get('[name=name]').type(ingredient.name);
			cy.get('[name=icon]').type(ingredient.icon);
			cy.get('[name=storedAmount]').type(ingredient.storedAmount.toString());

			cy.get('.modal-content .btn').contains('Salvar').click();
			cy.get('.Toastify__toast-body').should('have.text', 'Ingrediente cadastrado com sucesso!');
			cy.get('.Toastify__close-button').click();
		});
	});
});
