import * as customerHelpers from '../support/customerhelpers';
import 'cypress-iframe';


describe('Automating Customer IP Address', () => {
    it('Login,Assign IP and verifying Assigned IP', () => {
        // Step 1: Login using credentials from env
        customerHelpers.login(
            Cypress.env('LOGIN_USERNAME'),
            Cypress.env('LOGIN_PASSWORD')
        );

        customerHelpers.ncrmModulesDropdown();

        // Step 2: Navigate to Dashboard
        // customerHelpers.navigateToDashboard();

        // Step 3: Navigate to Customer Detail
        customerHelpers.navigateToCustomerDetail();

        // Step 4: Select User ID and Submit
        customerHelpers.selectUserID(1);  // Assuming "1" is the User ID option
        customerHelpers.searchAndSubmit('hotspot');  // Search for hotspot User ID and submit

        // Step 5: Click on Billing Summary Icon
        customerHelpers.clickBillingSummary();

        // Step 6: Click on Change IP Address
        customerHelpers.clickChangeIPAddress();

        // Step 7: Enter Partial IP Address and Submit
        customerHelpers.enterPartialIPAddress();

        // Step 8: Click on Filter Button
        customerHelpers.clickFilter();

        // Step 9: Click on the Select IP dropdown
        customerHelpers.ipDropdown();

        // Step 10: Select and save the second option from the dropdown
        customerHelpers.selectSecondOptionAndStoreValue('[role="option"]').then((value) => {
            cy.wrap(value).as('selectedIPAddress'); // Save the selected value for verification
        });

        // Step 11: Enter Comment
        customerHelpers.enterComment('testing');

        // Step 12: Click on Submit button
        customerHelpers.submit();

        // Step 13: Verify the Current IP Address reflects the submitted IP Address
        cy.get('@selectedIPAddress').then((selectedIPAddress) => {
            customerHelpers.verifyIPAddress('input.form-control:nth-child(2)', selectedIPAddress);
        });
    });


    it('Login,Assigned Deleted IPs and Verified', () => {
        // Step 1: Login
        customerHelpers.login(
            Cypress.env('LOGIN_USERNAME'),
            Cypress.env('LOGIN_PASSWORD')
        );

        customerHelpers.ncrmModulesDropdown();

        // Step 2: Navigate to Dashboard
        // customerHelpers.navigateToDashboard();

        // Step 3: Navigate to Customer Detail
        customerHelpers.navigateToCustomerDetail();

        // Step 4: Select User ID and Submit
        customerHelpers.selectUserID(1);  // Assuming "1" is the User ID option
        customerHelpers.searchAndSubmit('hotspot');  // Search for hotspot User ID and submit

        // Step 5: Click on Billing Summary Icon
        customerHelpers.clickBillingSummary();

        // Step 6: Click on Change IP Address
        customerHelpers.clickChangeIPAddress();

        // Step 7: Clcik on Assign Deleted IP Module
        customerHelpers.assignDeletedIP();

        // Step 8: Click on GET IP(s) Button
        customerHelpers.GETIPs();

        // Step 9: Click on Select IP dropdown
        customerHelpers.dltIpDropdown();

        // Step 10: Select and save the second option from the dropdown
        customerHelpers.selectSecondOptionAndStoreValue('[role="option"]').then((savedIP) => {
            cy.wrap(savedIP).as('savedIPAddress'); // Save the IP address for verification
        });

        // Step 11: Click on Assign IP Button
        customerHelpers.assignIP();
        cy.wait(3000);

        // Step 12: Click on GET IP(s) Button
        customerHelpers.GETIPs();

        // Step 13: Click on Select IP dropdown
        customerHelpers.dltIpDropdown();

        //verify the saved IP is excluded
        cy.get('@savedIPAddress').then((savedIP) => {
            customerHelpers.verifyIPNotInDropdown('[role="option"]', savedIP); // Pass the saved IP for exclusion check
        });


    });
});
