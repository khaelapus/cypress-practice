describe ('Login Automation: Correct Credentials', () => {
  Cypress.on('uncaught:exception', () => false); // Ignore app errors

  // try logging in using correct credentials
  it ('Should login successfully to OLLES Staging Site', () =>{
    cy.visit('https://staging-63.wela-v15.dev/#login') // go to the staging site
    cy.get('input[placeholder="ID Number"]').type('jude.micheal@livro.ph').should('have.value','jude.micheal@livro.ph') //get email field > input email > assert
    cy.get('#login_password').type('Khaelapus_1027').should('have.value','Khaelapus_1027') //get password field > type password > assert
    cy.get('.btn-login').click() // click Login button
    cy.url().should('include', '/apps') // if successful ang pag login, dapat mo move na siya didto sa mag select ug App. so mag change iyang url naa nay '/apps'
    cy.get('div[app-route="/app"]').click() // click/select School Management System  App
    cy.url().should('include', '/home') // if makasulod na siya sa School Management System  App, ma addan ug '/home' ang iya url so dapat included na siya sa current url
  })

describe ('Login Automation: Wrong Password', () =>{
  Cypress.on('uncaught:exception', () => false); // Ignore app errors

  //try logging in using wrong password
  it ('Should fail logging in to the OLLES Staging Site', () =>{
    cy.visit('https://staging-63.wela-v15.dev/#login')
    cy.get('input[placeholder="ID Number"]').type('jude.micheal@livro.ph').should('have.value', 'jude.micheal@livro.ph')
    cy.get('#login_password').type('dheudhunnndd').should('have.value', 'dheudhunnndd')
    cy.get('.btn-login').click()
    cy.get('.btn-login').contains('Invalid Login. Try again.')
  })
})

})