import * as customerHelpers from '../support/customerhelpers';
import 'cypress-iframe';


describe('Automating Shifting Management', () => {
  const userId = 'testndoctor11';
  const operator = 'huzaifa.nasir';
  it('Login and run test with both installation and billing addresses updated', () => {
    // Step 1: Login using credentials from env
    customerHelpers.login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Step 2: Select NCRM Modules Dropdown
    customerHelpers.ncrmModulesDropdown();

    // Step 3: Click on Shifting Management
    customerHelpers.navigateToShiftingManagement();

    // Step 4: Search for User ID and Submit
    customerHelpers.searchUseridAndSubmit(userId);

    // Step 5: Enter Shifting Comment
    customerHelpers.enterShiftingComment('hntesting shifting automation');

    // Step 6: Compare the old sector with the query result
    customerHelpers.compareOldSectorWithQuery(userId);

    // Step 7: Compare the old sub-sector with the query result
    customerHelpers.compareOldSubSectorWithQuery(userId);

    // Step 8: Type Address and Enter
    customerHelpers.typeAddressAndEnter();

    // Step 9: Type Location and Enter
    customerHelpers.typeLocationAndEnter();

    // Step 10: Enter Shifting Street
    customerHelpers.enterShiftingStreet('22');

    // Step 11: Enter Street Number or Name
    customerHelpers.enterStreetNumberOrName('B-2');

    // Step 12: Enter Shifting Charges
    customerHelpers.enterShiftingCharges();

    // Step 13: Enter Optional Landmark
    customerHelpers.enterLandmark('test landmark');

    // Step 14: Select Billing Info Radio button
    customerHelpers.selectBillingInfoRadio();

    // Step 15: Click on Shifting Submit button
    customerHelpers.submitShifting();

    // Step 16: Wait (up to 2 minutes) for the success confirmation prompt
    cy.contains('Shifting Case has been initiated Successfully', { timeout: 150000 })
      .should('be.visible');


    // Step 17: Validate DB Entries in PostgreSQL
    customerHelpers.validatePDBCustomerAddress(userId, operator);
    customerHelpers.validatePDBCustLandmark(userId, operator);
    customerHelpers.validatePDBTroubleTicket(userId, operator);
    customerHelpers.validatePDBTroubleTicketDetail(userId, operator);
    customerHelpers.validatePDBInstallation(userId, operator);
    customerHelpers.validatePDBInstallationDetail(userId, operator);


    // Step 18: Validate DB Entries in OracleDB
    customerHelpers.validateODBCustomerAddress(userId, operator);
    customerHelpers.validateODBCustLandmark(userId, operator);
    customerHelpers.validateODBInstallation(userId);
    customerHelpers.validateODBinstallationdetail(userId, operator);
    customerHelpers.validateODBTroubleticket(userId, operator);
    customerHelpers.validateODBTroubleticketDetail(userId, operator);
    customerHelpers.validateODBEmailsendingscripts(userId, operator);

  });

  it('Login and run test with updated installation address only', () => {
    // Step 1: Login using credentials from env
    customerHelpers.login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Step 2: Select NCRM Modules Dropdown
    customerHelpers.ncrmModulesDropdown();

    // Step 3: Click on Shifting Management
    customerHelpers.navigateToShiftingManagement();

    // Step 4: Search for User ID and Submit
    customerHelpers.searchUseridAndSubmit(userId);

    // Step 5: Enter Shifting Comment
    customerHelpers.enterShiftingComment('hntesting shifting automation');

    // Step 6: Compare the old sector with the query result
    customerHelpers.compareOldSectorWithQuery(userId);

    // Step 7: Compare the old sub-sector with the query result
    customerHelpers.compareOldSubSectorWithQuery(userId);

    // Step 8: Type Address and Enter
    customerHelpers.typeAddressAndEnter();

    // Step 9: Type Location and Enter
    customerHelpers.typeLocationAndEnter();

    // Step 10: Enter Shifting Street
    customerHelpers.enterShiftingStreet('22');

    // Step 11: Enter Street Number or Name
    customerHelpers.enterStreetNumberOrName('B-2');

    // Step 12: Enter Shifting Charges
    customerHelpers.enterShiftingCharges();

    // Step 13: Enter Optional Landmark
    customerHelpers.enterLandmark('test landmark');

    // Step 14: Select Billing Info Radio button
    // customerHelpers.selectBillingInfoRadio();

    // Step 15: Click on Shifting Submit button
    customerHelpers.submitShifting();

    // Step 16: Wait (up to 2 minutes) for the success confirmation prompt
    cy.contains('Shifting Case has been initiated Successfully', { timeout: 150000 })
      .should('be.visible');

    // Step 17: Validate DB Entries in PostgreSQL
    customerHelpers.validatePDBCustomerAddress(userId, operator);
    customerHelpers.validatePDBCustLandmark(userId, operator);
    customerHelpers.validatePDBTroubleTicket(userId, operator);
    customerHelpers.validatePDBTroubleTicketDetail(userId, operator);
    customerHelpers.validatePDBInstallation(userId, operator);
    customerHelpers.validatePDBInstallationDetail(userId, operator);

    // Step 18: Validate DB Entries in OracleDB
    customerHelpers.validateODBCustomerAddress(userId, operator);
    customerHelpers.validateODBCustLandmark(userId, operator);
    customerHelpers.validateODBInstallation(userId);
    customerHelpers.validateODBinstallationdetail(userId, operator);
    customerHelpers.validateODBTroubleticket(userId, operator);
    customerHelpers.validateODBTroubleticketDetail(userId, operator);
    customerHelpers.validateODBEmailsendingscripts(userId, operator);
  });

  it('Login and test fields limit also verify old address', () => {
    // Step 1: Login using credentials from environment variables
    customerHelpers.login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Step 2: Open NCRM Modules Dropdown
    customerHelpers.ncrmModulesDropdown();

    // Step 3: Navigate to Shifting Management
    customerHelpers.navigateToShiftingManagement();

    // Step 4: Search for the User ID and submit the form
    customerHelpers.searchUseridAndSubmit(userId);

    // Step 5: Enter a Shifting Comment with 501 characters to test the limit
    customerHelpers.enterShiftingComment(`This is a test paragraph designed specifically to reach the exact limit of five hundred characters. 
      It serves the purpose of validating whether a form field correctly handles input of this length without cutting off text 
      or throwing validation errors. By using a precise number of characters, testers can ensure that boundary conditions are 
      properly managed in both front-end and back-end validation processes. Accurate testing helps avoid future user experience 
      or data integrity issues. Accurate test`);

    // Step 6: Verify the error message for exceeding the character limit in the comment field
    cy.contains('Maximum 500 Characters allowed!', { timeout: 150000 })
      .should('be.visible');

    // Step 7: Compare the old sector with the query result
    customerHelpers.compareOldSectorWithQuery(userId);

    // Step 8: Compare the old sub-sector with the query result
    customerHelpers.compareOldSubSectorWithQuery(userId);

    // Step 9: Enter Address and submit
    customerHelpers.typeAddressAndEnter();

    // Step 10: Enter Location and submit
    customerHelpers.typeLocationAndEnter();

    // Step 11: Enter a Shifting Street with 51 characters to test the limit
    customerHelpers.enterShiftingStreet('This is a test paragraph designed specifically to r');

    // Step 12: Verify the error message for exceeding the character limit in the street field
    cy.contains('Maximum 50 Characters allowed!', { timeout: 150000 })
      .should('be.visible');

    // Step 13: Enter a Street Number or Name with 51 characters to test the limit
    customerHelpers.enterStreetNumberOrName('This is a test paragraph designed specifically to r');

    // Step 14: Verify the error message for exceeding the character limit in the street number field
    cy.contains('Maximum 50 Characters allowed!', { timeout: 150000 })
      .should('be.visible');

    // Step 15: Enter Shifting Charges
    customerHelpers.enterShiftingCharges();

    // Step 16: Enter an Optional Landmark with 51 characters to test the limit
    customerHelpers.enterLandmark('This is a test paragraph designed specifically to r');

    // Step 17: Verify the error message for exceeding the character limit in the landmark field
    cy.contains('Maximum 50 Characters allowed!', { timeout: 150000 })
      .should('be.visible');
  });

  it('Verify that on clicking cancel button the page is going to its initial stage except Customer ID', () => {
    // Step 1: Login using credentials from environment variables
    customerHelpers.login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Step 2: Open NCRM Modules Dropdown
    customerHelpers.ncrmModulesDropdown();

    // Step 3: Navigate to Shifting Management
    customerHelpers.navigateToShiftingManagement();

    // Step 4: Search for the User ID and submit the form
    customerHelpers.searchUseridAndSubmit(userId);

    // Step 5: Enter Shifting Comment
    customerHelpers.enterShiftingComment('Test comment for cancel functionality');

    // Step 6: Enter Address and submit
    customerHelpers.typeAddressAndEnter();

    // Step 7: Enter Location and submit
    customerHelpers.typeLocationAndEnter();

    // Step 8: Enter Shifting Street
    customerHelpers.enterShiftingStreet('Test Street');

    // Step 9: Enter Street Number or Name
    customerHelpers.enterStreetNumberOrName('123');

    // Step 10: Enter Shifting Charges
    customerHelpers.enterShiftingCharges();

    // Step 11: Enter Optional Landmark
    customerHelpers.enterLandmark('Test Landmark');

    // Step 12: Click the Cancel button
    customerHelpers.cancelShifting();

    // Step 13: Verify the page is reset to its initial state
    customerHelpers.verifyFormReset();

    // Step 14: Verify that the Customer ID field retains its value
    customerHelpers.customeIdretain(userId);
  });

});
