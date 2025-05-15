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
  // it('Login and run test with both installation and billing addresses updated', () => {
  //   // Step 1: Login using credentials from env
  //   login(
  //     Cypress.env('LOGIN_USERNAME'),
  //     Cypress.env('LOGIN_PASSWORD')
  //   );

  //   // Step 2: Select NCRM Modules Dropdown
  //   ncrmModulesDropdown();

  //   // Step 3: Click on Shifting Management
  //   navigateToShiftingManagement();

  //   // Step 4: Search for User ID and Submit
  //   searchUseridAndSubmit(userId);

  //   // Step 5: Enter Shifting Comment
  //   enterShiftingComment('hntesting shifting automation');

  //   // Step 6: Type Address and Enter
  //   typeAddressAndEnter();

  //   // Step 7: Type Location and Enter
  //   typeLocationAndEnter();

  //   // Step 8: Enter Shifting Street
  //   enterShiftingStreet('22');

  //   // Step 9: Enter Street Number or Name
  //   enterStreetNumberOrName('B-2');

  //   // Step 10: Enter Shifting Charges
  //   enterShiftingCharges();

  //   // Step 11: Enter Optional Landmark
  //   enterLandmark('test landmark');

  //   // Step 12: Select Billing Info Radio button
  //   selectBillingInfoRadio();

  //   // Step 13: Click on Shifting Submit button
  //   submitShifting();

  //   // Step 14: Wait (up to 2 minutes) for the success confirmation prompt
  //   cy.contains('Shifting Case has been initiated Successfully', { timeout: 150000 })
  //     .should('be.visible');


  //   // Step 15: Validate DB Entries in PostgreSQL
  //   validatePDBCustomerAddress(userId, operator);
  //   validatePDBCustLandmark(userId, operator);
  //   validatePDBTroubleTicket(userId, operator);
  //   validatePDBTroubleTicketDetail(userId, operator);
  //   validatePDBInstallation(userId, operator);
  //   validatePDBInstallationDetail(userId, operator);


  //   // Step 16: Validate DB Entries in OracleDB
  //   validateODBCustomerAddress(userId, operator);
  //   validateODBCustLandmark(userId, operator);
  //   validateODBInstallation(userId);
  //   validateODBinstallationdetail(userId, operator);
  //   validateODBTroubleticket(userId, operator);
  //   validateODBTroubleticketDetail(userId, operator);
  //   validateODBEmailsendingscripts(userId, operator);

  // });

  // it('Login and run test with updated installation address only', () => {
  //   // Step 1: Login using credentials from env
  //   login(
  //     Cypress.env('LOGIN_USERNAME'),
  //     Cypress.env('LOGIN_PASSWORD')
  //   );

  //   // Step 2: Select NCRM Modules Dropdown
  //   ncrmModulesDropdown();

  //   // Step 3: Click on Shifting Management
  //   navigateToShiftingManagement();

  //   // Step 4: Search for User ID and Submit
  //   searchUseridAndSubmit(userId);

  //   // Step 5: Enter Shifting Comment
  //   enterShiftingComment('hntesting shifting automation');

  //   // Step 6: Type Address and Enter
  //   typeAddressAndEnter();

  //   // Step 7: Type Location and Enter
  //   typeLocationAndEnter();

  //   // Step 8: Enter Shifting Street
  //   enterShiftingStreet('22');

  //   // Step 9: Enter Street Number or Name
  //   enterStreetNumberOrName('B-2');

  //   // Step 10: Enter Shifting Charges
  //   enterShiftingCharges();

  //   // Step 11: Enter Optional Landmark
  //   enterLandmark('test landmark');

  //   // Step 12: Select Billing Info Radio button
  //   // selectBillingInfoRadio();

  //   // Step 13: Click on Shifting Submit button
  //   submitShifting();

  //   // Step 14: Wait (up to 2 minutes) for the success confirmation prompt
  //   cy.contains('Shifting Case has been initiated Successfully', { timeout: 150000 })
  //     .should('be.visible');


  //   // Step 15: Validate DB Entries in PostgreSQL
  //   validatePDBCustomerAddress(userId, operator);
  //   validatePDBCustLandmark(userId, operator);
  //   validatePDBTroubleTicket(userId, operator);
  //   validatePDBTroubleTicketDetail(userId, operator);
  //   validatePDBInstallation(userId, operator);
  //   validatePDBInstallationDetail(userId, operator);


  //   // Step 16: Validate DB Entries in OracleDB
  //   validateODBCustomerAddress(userId, operator);
  //   validateODBCustLandmark(userId, operator);
  //   validateODBInstallation(userId);
  //   validateODBinstallationdetail(userId, operator);
  //   validateODBTroubleticket(userId, operator);
  //   validateODBTroubleticketDetail(userId, operator);
  //   validateODBEmailsendingscripts(userId, operator);
  // });

  it('Login and test fields limit', () => {
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

    // Step 5: Enter Shifting Comment of 501 characters to exceed the limit
    enterShiftingComment(`This is a test paragraph designed specifically to reach the exact limit of five hundred characters. 
      It serves the purpose of validating whether a form field correctly handles input of this length without cutting off text 
      or throwing validation errors. By using a precise number of characters, testers can ensure that boundary conditions are 
      properly managed in both front-end and back-end validation processes. Accurate testing helps avoid future user experience 
      or data integrity issues. Accurate test`);

    
    compareOldSectorWithQuery(userId);

    compareOldSubSectorWithQuery(userId);

    // step 6: Verify the error message for exceeding character limit
    cy.contains('Maximum 500 Characters allowed!', { timeout: 150000 })
      .should('be.visible');
      
    // Step 7: Type Address and Enter
    typeAddressAndEnter();

    // Step 8: Type Location and Enter
    typeLocationAndEnter();

    // Step 9: Enter Shifting Street
    enterShiftingStreet('This is a test paragraph designed specifically to r');
    
    // step 10: Verify the error message for exceeding character limit
    cy.contains('Maximum 50 Characters allowed!', { timeout: 150000 })
      .should('be.visible');

    // Step 11: Enter Street Number or Name
    enterStreetNumberOrName('This is a test paragraph designed specifically to r');

    // step 12: Verify the error message for exceeding character limit
    cy.contains('Maximum 50 Characters allowed!', { timeout: 150000 })
      .should('be.visible');

    // Step 13: Enter Shifting Charges
    enterShiftingCharges();

    // Step 14: Enter Optional Landmark
    enterLandmark('This is a test paragraph designed specifically to r');

    // step 15: Verify the error message for exceeding character limit
    cy.contains('Maximum 50 Characters allowed!', { timeout: 150000 })
      .should('be.visible');
  });
});
