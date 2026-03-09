describe('Clinic Note', () => {
  Cypress.on('uncaught:exception', () => false); // Ignore app errors

  it('Logs in to staging 63 website and create a clinic note.', () => {
    cy.visit('https://staging-63.wela-v15.dev/#login')     //go to the staging site
    cy.get('#login_email').type('jude.micheal@livro.ph')   //input email
    cy.get('#login_password').type('Khaelapus_1027')       //input password
    cy.get('.btn-login').click()                           //click login button
    cy.wait(1000)                                          //wait for 1 second

    cy.url().should('include', '/apps')                    //confirm that u login succesfully by checking the url

    cy.get('div[app-route="/app"]').click()                //select and click School Management System App
    cy.url().should('include', '/app/home')                //confirm that u get into the homepage by checking the url
    cy.wait(2000)                                          //wait for 2 seconds

    cy.get('div[item-name="Clinic"]').click()              //click clinic in the sidebar
    cy.url().should('include', '/app/clinic')              //confirm that u get into the clinic by checking the url
    cy.wait(2000)                                          //wait for 1 second 

    //select the dash card for clinic note
    cy.get('.widget-body', { timeout: 20000 }).children().eq(1).shadow().find('.dash-card').eq(0).click()  
    cy.url().should('include', '/app/clinic-note')         //confirm that u got into the clinic note list by checking the url
    cy.wait(1000)                                          //wait for 1 second

    cy.get('button[data-label="Add Clinic Note"]').click() //click the Add Clinic Note button
    cy.url().should('include', '/new-clinic-note')         //confirm that u got into the new clinic note interface by checking the url
    cy.wait(1000)                                          //wait for 1 second
    
    cy.get('input[data-fieldname="quarter"]').clear().type('First Quarter')  //clear the quarter field and input 'First Quarter'
    const d = new Date()                                                     //get current Date and time
    const date = `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}`       //format date into string: 'mm-dd-yyyy'
    const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`       //format time into string: 'hh:mm:ss'
    cy.get('input[data-fieldname="note_date"]').type(date).type('{enter}').type('{esc}')      //input date
    cy.get('input[data-fieldname="time_of_visit"]').type(time).type('{esc}')                  //input time
    cy.get('select[data-fieldtype="Select"]').eq(0).select('Student')        //set Patient type to 'Student'
    cy.get('input[data-fieldname="student"]').type('TEST, QA').wait(1000).type('{enter}')     //search and select student

    cy.get('select[data-fieldtype="Select"]').eq(1).select('Sent Home')      //set Status of Person to 'Sent Home'
    //Select Note areafield and input note
    cy.get('textarea[data-fieldtype="Small Text"]').eq(0).type('Was given paracetamol by the nurse. Asked parent to pick them up to go home and get rest.').wait(1000)
    cy.get('button[data-fieldname="get_contact_number"]').click()               //click the Get Contact Number button to get contact no. of patient
    
    //if else statement: if no contanct number get then manually type contact number
    cy.get('input[data-fieldname="contact_numbers"]').then(() =>{
      if (cy.get('input[data-fieldname="contact_numbers"]').invoke('text')){
      }
      else {
        cy.get('input[data-fieldname="contact_numbers"]').type('09262357494')  //manually input contact number
      }
    })
 
    cy.get('button[data-label="Save"]').click()                               //click Save button
    cy.get('span[class="indicator-pill no-indicator-dot whitespace-nowrap orange"]').should('not.exist')   //Not Saved status should not exist anymore after saving
    cy.wait(2000)                                          //wait for 2 seconds
    
    cy.get('a[href="/app/clinic-note"]').click()           //click Clinic Note to go back to Clinic Note list
    cy.url().should('include', '/clinic-note')             //confirm thru url that were back to the Clinic Note List
  })
})