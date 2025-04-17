import {
  login, ncrmModulesDropdown, enterStreetNumberOrName, enterShiftingCharges, enterLandmark, typeLocationAndEnter, selectBillingInfoRadio,
  navigateToShiftingManagement, searchUseridAndSubmit, enterShiftingComment, enterShiftingStreet, typeAddressAndEnter, submitShifting,
  validatePDBCustomerAddress, validatePDBCustLandmark, validatePDBTroubleTicket, validatePDBTroubleTicketDetail,validateODBTroubleTicketDetail,

} from '../support/customerhelpers';

import 'cypress-iframe';


describe('Automating Shifting Management', () => {
  it('Login And Run With Valid Data', () => {

    const userId = 'testndoctor11';
    const operator = 'huzaifa.nasir';

    // Step 1: Login
    login('huzaifa.nasir', 'Nayatel123%');

    // Step 2: Select NCRM Modules Dropdown
    ncrmModulesDropdown();

    // Step 3: Click on Shifting Management
    navigateToShiftingManagement();

    // Step 4: Search for User ID and Submit
    searchUseridAndSubmit(userId);

    // Step 5: Enter Shifting Comment
    enterShiftingComment('hntesting shifting automation');

    // Step 6: Type Address and Enter
    typeAddressAndEnter();

    // Step 7: Type Location and Enter
    typeLocationAndEnter();

    // Step 8: Enter Shifting Street
    enterShiftingStreet('22');

    // Step 9: Enter Street Number or Name
    enterStreetNumberOrName('B-2');

    // Step 10: Enter Shifting Charges
    enterShiftingCharges();

    // Step 11: Enter Optional Landmark
    enterLandmark('test landmark');

    // Step 12: Select Billing Info Radio button
    // selectBillingInfoRadio();

    // Step 13: Click on Shifting Submit button
    submitShifting();

    // Step 14: Wait (up to 2 minutes) for the success confirmation prompt
    cy.contains('Shifting Case has been initiated Successfully', { timeout: 150000 }) 
      .should('be.visible');


    // Step 15: Validate DB Entries in PostgreSQL
    validatePDBCustomerAddress(userId, operator);
    validatePDBCustLandmark(userId, operator);
    validatePDBTroubleTicket(userId, operator);
    validatePDBTroubleTicketDetail(userId, operator);

    
    // Step 16: Validate DB Entries in OracleDB
    validateODBTroubleTicketDetail(userId, operator);

  });
});
