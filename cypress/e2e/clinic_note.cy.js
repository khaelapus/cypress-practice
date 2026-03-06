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
    //cy.get('.sidebar-toggle-btn').click()
    //cy.wait(2000)
    cy.get('div[item-name="Clinic"]').click()
    cy.wait(3000)
    cy.xpath('/html/body/div[1]/div[2]/div[2]/div[2]/div[2]/div/div[3]/div[2]/div[1]/div[2]/div/div/div[1]/div[2]/div/div/div/div[2]/custom-block-aoofo//div/div/div[2]/div[1]').click()
    cy.wait(2000)
    //cy.get('.widget-body')
    //cy.contains('div', 'Clinic Note').click()
    //cy.wait(2000)
    //cy.get('button[data-label="Add Clinic Note"]').click()
    //cy.wait(2000)
  })
})