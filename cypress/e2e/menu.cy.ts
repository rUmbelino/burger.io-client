describe('side menu spec', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('open and closes the menu', () => {
		const menuBtn = cy.get('[data-cy="open-menu-btn"]');
		const oppenedMenu = cy.get('[data-cy="oppened-menu-conteiner"]');
		menuBtn.click();
		cy.wait(500);

		menuBtn.should('not.be.visible');
		oppenedMenu.should('be.visible');

		oppenedMenu.children('.btn-close').click();
		cy.wait(500);

		menuBtn.should('be.visible');
		oppenedMenu.should('not.be.visible');
	});
});
