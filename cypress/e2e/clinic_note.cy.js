describe('Clinic Note', () => {
  Cypress.on('uncaught:exception', () => false); // Ignore app errors

  it('Logs in to staging 63 website and create a clinic note.', () => {
    cy.visit('https://staging-63.wela-v15.dev/#login')
    cy.get('#login_email').type('jude.micheal@livro.ph')
    cy.get('#login_password').type('Khaelapus_1027')
    cy.get('.btn-login').click()
    cy.wait(1000)

    cy.get('div[app-route="/app"]').click()
    cy.wait(2000)

    cy.get('div[item-name="Clinic"]').click()
    cy.wait(1000)
    cy.get('.widget-body', { timeout: 20000 }).children().eq(1).shadow().find('.dash-card').eq(0).click()
    cy.wait(2000)
    cy.get('button[data-label="Add Clinic Note"]').click()
    cy.wait(2000)

    
  })
})