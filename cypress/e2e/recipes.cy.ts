import recipes from '../fixtures/recipes.json';
import ingredients from '../fixtures/ingredientList.json';

describe('recipes spec', () => {
	beforeEach(() => {
		cy.intercept('GET', `${cy.getApiPath()}/recipe`, {
			statusCode: 200,
			body: recipes,
		});

		cy.intercept('GET', `${cy.getApiPath()}/ingredient`, {
			statusCode: 200,
			body: ingredients,
		});

		cy.visit('/recipes');
		cy.wait(500);
	});

	it('lists the recepies', () => {
		recipes.forEach(({ icon, name, ingredients }, i) => {
			cy.get('[data-cy="icon-element"]').contains(`${icon}${name}`);

			cy.get('.accordion-item').eq(i).click();
			ingredients.forEach(({ icon, name, storedAmount, recipeAmount }, j) => {
				cy.get('[data-cy="icon-element"]').contains(`${icon}${name}`);

				cy.get('span').contains(`${storedAmount} em estoque`);
				cy.get('span').contains(`${recipeAmount} são usados em cada receita`);
			});
		});
	});

	it.only('creates a new recipe', () => {
		const [recipe] = recipes;
		cy.get('button').contains('Cadastrar Lanche').click();
		cy.wait(500);

		cy.get('[name=name]').type(recipe.name);
		cy.get('[name=icon]').type(recipe.icon);

		const [{ name, recipeAmount }] = recipe.ingredients;
		cy.get('.modal-body svg').click();
		cy.get('.modal-body').contains(name).click({ force: true });
		cy.get('[name="ingredient_0_recipeAmount"]').type(recipeAmount.toString());

		cy.get('.modal-body').contains('Salvar').click();
		cy.get('.Toastify__toast-body').should('have.text', 'Receita cadastrada com sucesso!');
		cy.get('.Toastify__close-button').click();
	});
});
