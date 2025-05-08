import {
    login, navigateToDashboard, navigateToCustomerDetail, selectUserID, searchAndSubmit,
    clickBillingSummary, clickChangeIPAddress, enterPartialIPAddress, clickFilter, ipDropdown, enterComment,
    submit, selectSecondOptionAndStoreValue, verifyIPAddress, assignDeletedIP, GETIPs, dltIpDropdown, assignIP, ncrmModulesDropdown,
    verifyIPNotInDropdown
} from '../support/customerhelpers';

import 'cypress-iframe';


describe('Automating Customer IP Address', () => {
    it('Login,Assign IP and verifying Assigned IP', () => {
        // Step 1: Login using credentials from env
        login(
            Cypress.env('LOGIN_USERNAME'),
            Cypress.env('LOGIN_PASSWORD')
        );

        ncrmModulesDropdown();

        // Step 2: Navigate to Dashboard
        // navigateToDashboard();

        // Step 3: Navigate to Customer Detail
        navigateToCustomerDetail();

        // Step 4: Select User ID and Submit
        selectUserID(1);  // Assuming "1" is the User ID option
        searchAndSubmit('hotspot');  // Search for hotspot User ID and submit

        // Step 5: Click on Billing Summary Icon
        clickBillingSummary();

        // Step 6: Click on Change IP Address
        clickChangeIPAddress();

        // Step 7: Enter Partial IP Address and Submit
        enterPartialIPAddress('58.65');

        // Step 8: Click on Filter Button
        clickFilter();

        // Step 9: Click on the Select IP dropdown
        ipDropdown();

        // Step 10: Select and save the second option from the dropdown
        selectSecondOptionAndStoreValue('[role="option"]').then((value) => {
            cy.wrap(value).as('selectedIPAddress'); // Save the selected value for verification
        });

        // Step 11: Enter Comment
        enterComment('testing');

        // Step 12: Click on Submit button
        submit();

        // Step 13: Verify the Current IP Address reflects the submitted IP Address
        cy.get('@selectedIPAddress').then((selectedIPAddress) => {
            verifyIPAddress('input.form-control:nth-child(2)', selectedIPAddress);
        });
    });


    it('Login,Assigned Deleted IPs and Verified', () => {
        // Step 1: Login
        login('huzaifa.nasir', 'Nayatel123%');

        ncrmModulesDropdown();

        // Step 2: Navigate to Dashboard
        // navigateToDashboard();

        // Step 3: Navigate to Customer Detail
        navigateToCustomerDetail();

        // Step 4: Select User ID and Submit
        selectUserID(1);  // Assuming "1" is the User ID option
        searchAndSubmit('hotspot');  // Search for hotspot User ID and submit

        // Step 5: Click on Billing Summary Icon
        clickBillingSummary();

        // Step 6: Click on Change IP Address
        clickChangeIPAddress();

        // Step 7: Clcik on Assign Deleted IP Module
        assignDeletedIP();

        // Step 8: Click on GET IP(s) Button
        GETIPs();

        // Step 9: Click on Select IP dropdown
        dltIpDropdown();

        // Step 10: Select and save the second option from the dropdown
        selectSecondOptionAndStoreValue('[role="option"]').then((savedIP) => {
            cy.wrap(savedIP).as('savedIPAddress'); // Save the IP address for verification
        });

        // Step 11: Click on Assign IP Button
        assignIP();
        cy.wait(3000);

        // Step 12: Click on GET IP(s) Button
        GETIPs();

        // Step 13: Click on Select IP dropdown
        dltIpDropdown();

        //verify the saved IP is excluded
        cy.get('@savedIPAddress').then((savedIP) => {
            verifyIPNotInDropdown('[role="option"]', savedIP); // Pass the saved IP for exclusion check
        });


    });
});
