describe ('Login Automation: Correct Credentials', () => {
  Cypress.on('uncaught:exception', () => false); // Ignore app errors

  // try logging in using correct credentials
  it ('Should login successfully to OLLES Staging Site and go to the School Management System App', () =>{
    cy.visit('https://staging-63.wela-v15.dev/#login')                     // go to the staging site
    cy.get('input[placeholder="ID Number"]').type(Cypress.env('email')) // get email field > input email
    cy.wait(1000)                                                          // wait for 1 second
    cy.get('#login_password').type(Cypress.env('password'))                       // get password field > type password
    cy.wait(1000)                                                          // wait for 1 second
    cy.get('.btn-login').click()                                           // click Login button
    cy.url().should('include', '/apps')                                    // confirm login by checking url
    cy.wait(3000)                                                          // wait for 3 seconds
    cy.get('div[app-route="/app"]').click()                                // click/select School Management System  App
    cy.url().should('include', '/home')                                    // confirm that it went to home by checking url
    cy.wait(3000)                                                          // wait for 3 seconds
  })
})


describe ('Login Automation: Incorrect Credentials', () =>{
  Cypress.on('uncaught:exception', () => false); // Ignore app errors

  //try logging in using wrong credentials                              
  it ('Should fail logging in to the OLLES Staging Site', () =>{
    cy.visit('https://staging-63.wela-v15.dev/#login')                       //visit site
    cy.get('input[placeholder="ID Number"]').type(Cypress.env('email'))   //get email field > input email
    cy.wait(1000)                                                            //wait 1 second
    cy.get('#login_password').type('dheudhunnndd')                           //get password field > input password
    cy.wait(1000)                                                            //wait 1 second
    cy.get('.btn-login').click()                                             //click the login button
    cy.get('.btn-login').should('have.text', 'Invalid Login. Try again.')    //check if the text in the login button changed to Invalid Login...
    cy.wait(3000)                                                            //wait for 3 seconds
  })
})


describe ('Login Automation: Forgot Password', () =>{
  Cypress.on('uncaught:exception', () => false); // Ignore app errors

  it ('Access the Forgot Password', () =>{
    cy.visit('https://staging-63.wela-v15.dev/login#login')                   //visit site
    cy.get('.forgot-password-message').contains('Forgot Password').click()    //click Forgot Password
    cy.wait(2000)                                                             //wait 2 seconds             
    cy.get('#forgot_email').type('jude.michael@livro.ph')                     //get forgot email field > input email
    cy.wait(1000)                                                             //wait 1 second                                     
    cy.get('.btn-forgot').click()                                             //click Reset Password button 
    //check if confirmation message show
    cy.get('.msgprint').invoke('text').should('match', /You hit the rate limit because of too many requests. Please try after sometime.|Password reset instruction have been sent to you email/)
    cy.wait(2000)                                                             //wait 2 seconds
    cy.get('.close').click()                                                  //click x to close the message
    cy.wait(2000)                                                             //wait 2 seconds
    cy.contains('Back to Login').click()                                      //click Back to Login
    cy.wait(3000)                                                             //wait for 3 seconds
  })
})

describe ('Login Automation: Login with Email Link', () => {
  Cypress.on('uncaught:exception', () => false); // Ignore app errors

  it ('Login using email link', () =>{
    cy.visit('https://staging-63.wela-v15.dev/login#login')                   //visit site
    cy.contains('Login with Email Link').click()                              //click Login with Email Link button
    cy.wait(1000)                                                             //wait 1 second
    cy.get('#login_with_email_link_email').type('jude.michael@livro.ph')      //get email field > input field
    cy.wait(2000)                                                             //wait 2 seconds
    cy.contains('Send login link').click()                                    //click the Send login link button
    cy.wait(2000)                                                             //wait 2 seconds
    //check if the button text changed to Login link sent to your email
    cy.get('button[type="submit"]').last().should('have.text','Login link sent to your email')  
    cy.wait(2000)                                                            //wait 2 seconds
    cy.get('a[href="#login"').eq(1).click()                                  //click back to login
    cy.wait(3000)                                                            //wait for 3 seconds
  })
})
