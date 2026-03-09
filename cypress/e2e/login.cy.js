describe ('Login Automation: Correct Credentials', () => {
  Cypress.on('uncaught:exception', () => false); // Ignore app errors

  // try logging in using correct credentials
  it ('Should login successfully to OLLES Staging Site and go to the School Management System App', () =>{
    cy.visit('https://staging-63.wela-v15.dev/#login') // go to the staging site
    cy.get('input[placeholder="ID Number"]').type('jude.micheal@livro.ph').should('have.value','jude.micheal@livro.ph') //get email field > input email > assert
    cy.wait(1000)
    cy.get('#login_password').type('Khaelapus_1027').should('have.value','Khaelapus_1027') //get password field > type password > assert
    cy.get('.btn-login').click() // click Login button
    cy.wait(3000)
    cy.url().should('include', '/apps') // if successful ang pag login, dapat mo move na siya didto sa mag select ug App. so mag change iyang url naa nay '/apps'
    cy.get('div[app-route="/app"]').click() // click/select School Management System  App
    cy.url().should('include', '/home') // if makasulod na siya sa School Management System  App, ma addan ug '/home' ang iya url so dapat included na siya sa current url
    cy.wait(5000)
  })
})


describe ('Login Automation: Incorrect Credentials', () =>{
  Cypress.on('uncaught:exception', () => false); // Ignore app errors

  //try logging in using wrong password
  it ('Should fail logging in to the OLLES Staging Site', () =>{
    cy.visit('https://staging-63.wela-v15.dev/#login')
    cy.get('input[placeholder="ID Number"]').type('jude.micheal@livro.ph').should('have.value', 'jude.micheal@livro.ph')
    cy.wait(1000)
    cy.get('#login_password').type('dheudhunnndd').should('have.value', 'dheudhunnndd')
    cy.get('.btn-login').click()
    cy.wait(1000)
    cy.get('.btn-login').should('have.text', 'Invalid Login. Try again.') //dapat ma change ang text sa login button
    cy.wait(5000)
  })
})


describe ('Login Automation: Forgot Password', () =>{
  Cypress.on('uncaught:exception', () => false); // Ignore app errors

  it ('Access the Forgot Password', () =>{
    cy.visit('https://staging-63.wela-v15.dev/login#login')
    cy.get('.forgot-password-message').contains('Forgot Password').click()
    cy.get('#forgot_email').type('jude.michael@livro.ph').should('have.value', 'jude.michael@livro.ph')
    cy.get('.btn-forgot').click()
    //cy.get('.msgprint').should('have.text', 'Password reset instruction have been sent to you email')
    cy.get('.msgprint').invoke('text').should('match', /You hit the rate limit because of too many requests. Please try after sometime.|Password reset instruction have been sent to you email/)
    cy.wait(1000)
    cy.get('.close').click()
    cy.wait(1000)
    cy.contains('Back to Login').click()
  })
})

describe ('Login Automation: Login with Email Link', () => {
  Cypress.on('uncaught:exception', () => false); // Ignore app errors

  it ('Login using email link', () =>{
    cy.visit('https://staging-63.wela-v15.dev/login#login')
    //cy.get('.btn-login-with-email-link').click()
    cy.contains('Login with Email Link').click()
    cy.wait(1000)
    cy.get('#login_with_email_link_email').type('jude.michael@livro.ph')
    //cy.get('.btn-login-with-email-link').click()
    cy.contains('Send login link').click()
    cy.wait(300)
    //cy.get('.btn-login-with-email-link').should('match', 'Login link sent to your email')
    //cy.wait(4000)
    cy.contains('Back to Login').click()
  })
})
