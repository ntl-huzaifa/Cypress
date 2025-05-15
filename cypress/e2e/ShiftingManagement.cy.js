import {
  login, ncrmModulesDropdown, enterStreetNumberOrName, enterShiftingCharges, enterLandmark, typeLocationAndEnter, selectBillingInfoRadio,
  navigateToShiftingManagement, searchUseridAndSubmit, enterShiftingComment, enterShiftingStreet, typeAddressAndEnter, submitShifting,
  validatePDBCustomerAddress, validatePDBCustLandmark, validatePDBTroubleTicket, validatePDBTroubleTicketDetail,
  validatePDBInstallationDetail, validatePDBInstallation, validateODBCustomerAddress, validateODBCustLandmark, validateODBInstallation,
  validateODBTroubleticket, validateODBTroubleticketDetail, validateODBEmailsendingscripts, validateODBinstallationdetail, 
  compareOldSectorWithQuery, compareOldSubSectorWithQuery

} from '../support/customerhelpers';

import 'cypress-iframe';


describe('Automating Shifting Management', () => {
  const userId = 'testndoctor11';
  const operator = 'huzaifa.nasir';
  it('Login and run test with both installation and billing addresses updated', () => {
    // Step 1: Login using credentials from env
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Step 2: Select NCRM Modules Dropdown
    ncrmModulesDropdown();

    // Step 3: Click on Shifting Management
    navigateToShiftingManagement();

    // Step 4: Search for User ID and Submit
    searchUseridAndSubmit(userId);

    // Step 5: Enter Shifting Comment
    enterShiftingComment('hntesting shifting automation');

    // Step 6: Compare the old sector with the query result
    compareOldSectorWithQuery(userId);

    // Step 7: Compare the old sub-sector with the query result
    compareOldSubSectorWithQuery(userId);

    // Step 8: Type Address and Enter
    typeAddressAndEnter();

    // Step 9: Type Location and Enter
    typeLocationAndEnter();

    // Step 10: Enter Shifting Street
    enterShiftingStreet('22');

    // Step 11: Enter Street Number or Name
    enterStreetNumberOrName('B-2');

    // Step 12: Enter Shifting Charges
    enterShiftingCharges();

    // Step 13: Enter Optional Landmark
    enterLandmark('test landmark');

    // Step 14: Select Billing Info Radio button
    selectBillingInfoRadio();

    // Step 15: Click on Shifting Submit button
    submitShifting();

    // Step 16: Wait (up to 2 minutes) for the success confirmation prompt
    cy.contains('Shifting Case has been initiated Successfully', { timeout: 150000 })
      .should('be.visible');


    // Step 17: Validate DB Entries in PostgreSQL
    validatePDBCustomerAddress(userId, operator);
    validatePDBCustLandmark(userId, operator);
    validatePDBTroubleTicket(userId, operator);
    validatePDBTroubleTicketDetail(userId, operator);
    validatePDBInstallation(userId, operator);
    validatePDBInstallationDetail(userId, operator);


    // Step 18: Validate DB Entries in OracleDB
    validateODBCustomerAddress(userId, operator);
    validateODBCustLandmark(userId, operator);
    validateODBInstallation(userId);
    validateODBinstallationdetail(userId, operator);
    validateODBTroubleticket(userId, operator);
    validateODBTroubleticketDetail(userId, operator);
    validateODBEmailsendingscripts(userId, operator);

  });

  it('Login and run test with updated installation address only', () => {
    // Step 1: Login using credentials from env
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Step 2: Select NCRM Modules Dropdown
    ncrmModulesDropdown();

    // Step 3: Click on Shifting Management
    navigateToShiftingManagement();

    // Step 4: Search for User ID and Submit
    searchUseridAndSubmit(userId);

    // Step 5: Enter Shifting Comment
    enterShiftingComment('hntesting shifting automation');

    // Step 6: Compare the old sector with the query result
    compareOldSectorWithQuery(userId);

    // Step 7: Compare the old sub-sector with the query result
    compareOldSubSectorWithQuery(userId);

    // Step 8: Type Address and Enter
    typeAddressAndEnter();

    // Step 9: Type Location and Enter
    typeLocationAndEnter();

    // Step 10: Enter Shifting Street
    enterShiftingStreet('22');

    // Step 11: Enter Street Number or Name
    enterStreetNumberOrName('B-2');

    // Step 12: Enter Shifting Charges
    enterShiftingCharges();

    // Step 13: Enter Optional Landmark
    enterLandmark('test landmark');

    // Step 14: Select Billing Info Radio button
    // selectBillingInfoRadio();

    // Step 15: Click on Shifting Submit button
    submitShifting();

    // Step 16: Wait (up to 2 minutes) for the success confirmation prompt
    cy.contains('Shifting Case has been initiated Successfully', { timeout: 150000 })
      .should('be.visible');

    // Step 17: Validate DB Entries in PostgreSQL
    validatePDBCustomerAddress(userId, operator);
    validatePDBCustLandmark(userId, operator);
    validatePDBTroubleTicket(userId, operator);
    validatePDBTroubleTicketDetail(userId, operator);
    validatePDBInstallation(userId, operator);
    validatePDBInstallationDetail(userId, operator);

    // Step 18: Validate DB Entries in OracleDB
    validateODBCustomerAddress(userId, operator);
    validateODBCustLandmark(userId, operator);
    validateODBInstallation(userId);
    validateODBinstallationdetail(userId, operator);
    validateODBTroubleticket(userId, operator);
    validateODBTroubleticketDetail(userId, operator);
    validateODBEmailsendingscripts(userId, operator);
  });

  it('Login and test fields limit also verify old address', () => {
    // Step 1: Login using credentials from environment variables
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Step 2: Open NCRM Modules Dropdown
    ncrmModulesDropdown();

    // Step 3: Navigate to Shifting Management
    navigateToShiftingManagement();

    // Step 4: Search for the User ID and submit the form
    searchUseridAndSubmit(userId);

    // Step 5: Enter a Shifting Comment with 501 characters to test the limit
    enterShiftingComment(`This is a test paragraph designed specifically to reach the exact limit of five hundred characters. 
      It serves the purpose of validating whether a form field correctly handles input of this length without cutting off text 
      or throwing validation errors. By using a precise number of characters, testers can ensure that boundary conditions are 
      properly managed in both front-end and back-end validation processes. Accurate testing helps avoid future user experience 
      or data integrity issues. Accurate test`);

    // Step 6: Verify the error message for exceeding the character limit in the comment field
    cy.contains('Maximum 500 Characters allowed!', { timeout: 150000 })
      .should('be.visible');

    // Step 7: Compare the old sector with the query result
    compareOldSectorWithQuery(userId);

    // Step 8: Compare the old sub-sector with the query result
    compareOldSubSectorWithQuery(userId);
      
    // Step 9: Enter Address and submit
    typeAddressAndEnter();

    // Step 10: Enter Location and submit
    typeLocationAndEnter();

    // Step 11: Enter a Shifting Street with 51 characters to test the limit
    enterShiftingStreet('This is a test paragraph designed specifically to r');
    
    // Step 12: Verify the error message for exceeding the character limit in the street field
    cy.contains('Maximum 50 Characters allowed!', { timeout: 150000 })
      .should('be.visible');

    // Step 13: Enter a Street Number or Name with 51 characters to test the limit
    enterStreetNumberOrName('This is a test paragraph designed specifically to r');

    // Step 14: Verify the error message for exceeding the character limit in the street number field
    cy.contains('Maximum 50 Characters allowed!', { timeout: 150000 })
      .should('be.visible');

    // Step 15: Enter Shifting Charges
    enterShiftingCharges();

    // Step 16: Enter an Optional Landmark with 51 characters to test the limit
    enterLandmark('This is a test paragraph designed specifically to r');

    // Step 17: Verify the error message for exceeding the character limit in the landmark field
    cy.contains('Maximum 50 Characters allowed!', { timeout: 150000 })
      .should('be.visible');
  });
});
