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

    cy.get('input[data-fieldname="quarter"]').clear().type('First Quarter')
    const d = new Date()
    const date = `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}`
    const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    cy.get('input[data-fieldname="note_date"]').type(date, { force: true }).type('{enter}')   
    cy.get('input[data-fieldname="time_of_visit"]').type(time).type('{enter}')
    cy.get('div[data-fieldname="__column_1"]').click()
    cy.get('select[data-fieldtype="Select"]').eq(0).select('Student')
    cy.get('input[data-fieldname="student"]').type('TEST, QA').wait(1000).type('{enter}')

    //cy.get('input[data-fieldname="visit_reason"]').type('Felt sick. Had headaches.')
    cy.get('select[data-fieldtype="Select"]').eq(1).select('Sent Home')
    cy.get('textarea[data-fieldtype="Small Text"]').eq(0).type('Was given paracetamol by the nurse. Asked parent to pick them up to go home and get rest.')
    cy.get('input[data-fieldname="contact_numbers"]').type('09155819175')
    cy.get('button[data-label="Save"]').click()
    cy.wait(2000)
    cy.get('a[href="/app/clinic-note"]').click()
    //cy.get('.flex.fill-width.title-area').should('have.text','Clinic Note')
    cy.url().should('include', '/clinic-note')

  })
})