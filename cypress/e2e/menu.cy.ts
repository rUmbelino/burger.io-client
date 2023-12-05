describe('side menu spec', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('open and closes the menu', () => {
		const menuBtn = cy.get('[data-cy="open-menu-btn"]');
		const oppenedMenu = cy.get('[data-cy="oppened-menu"]');
		const menuContainer = cy.get('[data-cy="menu-container"]');

		menuBtn.click();
		cy.wait(500);
		menuContainer.should('have.class', 'menu-open');

		oppenedMenu.children('.btn-close').click();
		cy.wait(500);
		menuContainer.should('have.class', 'menu-closed');
	});

	it('navigates to homepage', () => {
		cy.visit('/ingredients');
		const menuBtn = cy.get('[data-cy="open-menu-btn"]');
		menuBtn.click();
		cy.wait(500);

		cy.get('h1').click();
		cy.url().should('eq', 'http://localhost:3000/');
	});

	it('navegates through menu pages', () => {
		const menuItems = [
			{ label: 'Lanches', title: 'Lanches:' },
			{ label: 'Pedidos', title: 'Ultimos pedidos:' },
			{ label: 'Ingredientes', title: 'Ingredientes:' },
		];

		menuItems.forEach(({ label, title }) => {
			cy.navigateToPage(label);
			cy.get('h2').should('contain.text', title);
		});
	});
});
