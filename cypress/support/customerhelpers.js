// Helper function for login
export function login(username, password) {
  cy.visit('https://crmstg.nayatel.com/views/crmViews/extendedView.php');
  cy.get('span').click();
  cy.login(username, password);
}


// Helper function to navigate to Dashboard
export function navigateToDashboard() {
  cy.get('a[href="https://crmfebilling.nayatel.com/dashboard"]')
    .then(($link) => {
      const href = $link.attr('href');
      cy.visit(href);
    });
  cy.contains('Dashboard').should('be.visible');
}


// Helper function to open customer dropdown and navigate to NCRM MODULES Dropdown
export function ncrmModulesDropdown() {
  cy.xpath('/html/body/div[2]/div[1]/div[1]/div/div/div/div/ul/li[14]/a/i[2]')
    .should('be.visible').click();
}


// Helper function to open customer dropdown and navigate to Customer Detail
export function navigateToCustomerDetail() {
  cy.get('li.dropdown:nth-child(14) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)')
    .should('have.attr', 'target', '_blank')
    .invoke('removeAttr', 'target')
    .click();
}


// Helper function to open customer dropdown and navigate to Shifting Management
export function navigateToShiftingManagement() {
  cy.get('li.dropdown:nth-child(14) > ul:nth-child(2) > li:nth-child(10) > a:nth-child(1)')
    .should('have.attr', 'target', '_blank')
    .invoke('removeAttr', 'target')
    .click();
}


// Helper function to select the User ID from dropdown
export function selectUserID(userID) {
  cy.get('.css-cz9fds').click();
  cy.get('#react-select-1-input').click();
  cy.get(`#react-select-1-option-${userID}`).scrollIntoView()
    .should('be.visible').click();
}


// Helper function to search for a user and submit
export function searchAndSubmit(userSearch) {
  cy.get('.form-control').click();
  cy.get('.form-control').type(userSearch);
  cy.get('.text-right > .custom-bg-color').scrollIntoView().should('be.visible').click();
}


// Helper function to click on Billing Summary
export function clickBillingSummary() {
  cy.get('.d-flex > :nth-child(1) > .fa', { timeout: 10000 }).scrollIntoView()
    .should('be.visible').click();
}


// Helper function to click on Change IP Address button
export function clickChangeIPAddress() {
  cy.wait(3000);
  cy.get(':nth-child(23) > :nth-child(1) > :nth-child(2) > .btn', { timeout: 10000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });
}


// Helper function to input partial IP address
export function enterPartialIPAddress(ipAddress) {
  cy.get('input[placeholder="Enter Provide Partial IP Address"]', { timeout: 20000 })
    .should('be.visible')
    .click();
  cy.get('input[placeholder="Enter Provide Partial IP Address"]').type(ipAddress);
}


// Helper function to click on Filter Button
export function clickFilter() {
  cy.get('.form-group > .d-flex > .btn').click();
}


// Helper function to click on Select IP Dropdown
export function ipDropdown() {
  cy.get('.css-1xc3v61-indicatorContainer')
    .should('be.visible')
    .click();
}


// Helper function to type a random address and press enter
export function typeAddressAndEnter() {
  const addresses = [
    "F-7-1-Islamabad",
    "F-7-2-Islamabad",
    "F-7-3-Islamabad",
    "F-7-4-Islamabad",
    "F-7-Markaz-Islamabad",
    "F-8-1-Islamabad",
    "F-8-2-Islamabad",
    "F-8-3-Islamabad",
    "F-8-4-Islamabad",
    "F-8-Markaz-Islamabad",
    "F-6-1-Islamabad",
    "F-6-2-Islamabad",
    "F-6-3-Islamabad",
    "F-6-4-Islamabad",
    "F-6-Markaz-Islamabad",
    "F-5-1-Islamabad",
    "F-5-2-Islamabad"
  ];

  const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];

  cy.get(':nth-child(4) > :nth-child(1) > .css-b62m3t-container > .css-1sjib0a-control > .css-hlgwow > .css-cz9fds')
    .should('be.visible')
    .type(`${randomAddress}{enter}`);
}


// Helper function to type a random location and press enter
export function typeLocationAndEnter() {
  const locations = [
    "House",
    "Shop",
    "Office",
    "Building",
    "Apartment",
    "Flat",
    "Plot",
    "Villa"
  ];

  const randomLocation = locations[Math.floor(Math.random() * locations.length)];

  cy.get(':nth-child(2) > .css-b62m3t-container > .css-1sjib0a-control > .css-hlgwow > .css-cz9fds')
    .should('be.visible')
    .type(`${randomLocation}{enter}`);
}


// Helper function to input street
export function enterShiftingStreet(street) {
  cy.get(':nth-child(5) > :nth-child(1) > .form-control').click()
  cy.get(':nth-child(5) > :nth-child(1) > .form-control').type(street)
}


// Helper function to input street number
export function enterStreetNumberOrName(streetNumberorName) {
  cy.get(':nth-child(5) > :nth-child(2) > .form-control').click()
  cy.get(':nth-child(5) > :nth-child(2) > .form-control').type(streetNumberorName)
}


// Helper function to input Shifting Charges
export function enterShiftingCharges() {
  cy.get('div.row:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)')
    .should('be.visible')
    .type('1000{enter}');
}


// Helper function to input Optional Landmark
export function enterLandmark(landmark) {
  cy.get(':nth-child(7) > :nth-child(2) > .form-control').click()
  cy.get(':nth-child(7) > :nth-child(2) > .form-control').type(landmark)
}


// Helper function to click on Billing Info Radio button
export function selectBillingInfoRadio() {
  cy.get('#BILLING_INFO_CHECK').click({ force: true });
}


// Helper function to click on Shifting Submit button
export function submitShifting() {
  cy.get('.btn-primary').click();
}

// Helper function to click on the second option in a dropdown and store its value
export function selectSecondOptionAndStoreValue(optionSelector) {
  let selectedValue = ''; // Declare a variable to store the selected value

  // Select the second option, store its value, and click it
  cy.get(optionSelector)
    .eq(1) // Select the second option
    .invoke('text') // Retrieve the text content of the option
    .then((text) => {
      selectedValue = text.trim(); // Store the selected value
      cy.wrap(selectedValue).as('selectedValue'); // Save value for later use
      cy.get(optionSelector).eq(1).click(); // Click to select the second option
    });

  return cy.get('@selectedValue'); // Return the selected value as a Cypress alias
}


// Helper function to input shifting comment
export function enterShiftingComment(comment) {
  cy.get('.row.mt-4 > .form-group > .form-control').click()
  cy.get('.row.mt-4 > .form-group > .form-control').type(comment)
}


// Helper function to input comment
export function enterComment(comment) {
  cy.get(':nth-child(3) > .form-control').click()
  cy.get(':nth-child(3) > .form-control').type(comment)
}


// Helper function to click on Submit Button
export function submit() {
  cy.get('.col-md-12 > .d-flex > .btn').click()
}


// Helper function to Confirm the label "Customer IP Address:" is shown
export function changeIPAddressLabel() {
  cy.get('.mt-5 > :nth-child(1) > .control-label')
    .should('be.visible')
    .and('have.text', 'Current IP Address:');

}


// Helper function to Verify IP Address(matching)
export function verifyIPAddress(inputSelector, expectedValueAlias) {
  // Verify the Current IP Address reflects the submitted IP Address
  cy.get(inputSelector, { timeout: 10000 }) // Selector for Current IP Address
    .should('be.visible')
    .should(($input) => {
      const currentIPAddress = $input.val().trim(); // Get the current value
      expect(currentIPAddress).to.equal(expectedValueAlias); // Verify the value matches the submitted IP
    });
}


// Helper function for click on "Assign Deleted IP" submodule
export function assignDeletedIP() {
  cy.get('#assignDeletedIp', { timeout: 20000 }).click();
}


// Helper function to click on GET IP(s) Button
export function GETIPs() {
  cy.get(':nth-child(1) > .btn', { timeout: 5000 }).click();
}


// Helper function to click on Select IP dropdown
export function dltIpDropdown() {
  cy.get('.css-1xc3v61-indicatorContainer')
    .should('be.visible')
    .click();
}


// Helper function to click on Assign IP Button
export function assignIP() {
  cy.get('.d-flex > .btn', { timeout: 5000 })
    .should('be.visible')
    .click();
}


// Helper function to check dropdown excludes a specific value
export function verifyIPNotInDropdown(optionSelector, excludedIP) {
  cy.get(optionSelector, { timeout: 10000 })
    .should('have.length.greaterThan', 0)
    .each(($option) => {
      const optionText = $option.text().trim();
      cy.log(`Dropdown option: ${optionText}`); // Debug log
      expect(optionText).not.to.equal(excludedIP);
    });
}


// Helper function to search for a user and submit
export function searchUseridAndSubmit(userSearch) {
  cy.get('.form-control').click();
  cy.get('.form-control').type(userSearch);
  cy.get('.btn').click();
}


// Helper function to verify customer_address table entry in PostgreSQL
export function validatePDBCustomerAddress(userId, operator) {
  return cy.task('runPostgresQuery', `
      SELECT ca.modified_by 
      FROM customer c 
      JOIN customer_address ca ON ca.accountid = c.accountid 
      WHERE c.userid = '${userId}'
        AND ca.record_status = 'active'
        AND ca.modified_by = '${operator}'
        AND ca.modified_datetime >= NOW() - INTERVAL '5 minutes'
    `).then((rows) => {
    if (rows.length > 0) {
      cy.log('✅ Success: Entry inserted in customer_address of PostgreSQL.');
    } else {
      cy.log('❌ Failure: No entry in customer_address of PostgreSQL.');
    }
    expect(rows.length).to.be.greaterThan(0);
  });
}


// Helper function to verify cust_landmark table entry in PostgreSQL
export function validatePDBCustLandmark(userId, operator) {
  return cy.task('runPostgresQuery', `
      SELECT cl."operator"  
      FROM customer c 
      JOIN cust_landmark cl 
        ON cl.accountid = c.accountid::text 
      WHERE c.userid = '${userId}' 
        AND cl.record_status = 'active' 
        AND cl.modified_by IS NULL
        AND cl.modified_datetime IS NULL 
        AND cl."operator" = '${operator}'
        AND cl.datetime >= NOW() - INTERVAL '5 minutes'
    `).then((rows) => {
    if (rows.length > 0) {
      cy.log('✅ Success: Entry inserted in cust_landmark table of PostgreSQL.');
    } else {
      cy.log('❌ Failure: No entry in cust_landmark table of PostgreSQL.');
    }
    expect(rows.length).to.be.greaterThan(0);
  });
}


// Helper function to verify troubleticket table entry in PostgreSQL
export function validatePDBTroubleTicket(userId, operator) {
  return cy.task('runPostgresQuery', `
      SELECT t."operator" 
      FROM troubleticket t 
      WHERE t.operator = '${operator}'
        AND t.userid = '${userId}' 
        AND t.description = 'Hardware Removal Required'
        AND t.faulttype = 'Hardware Removal'
        AND t.subfaulttype = 'Shifting case'
        AND t.createdby = '${operator}'
        AND t.tickettype = 'Requirements/VAS' 
        AND t.tt_creation_time >= NOW() - INTERVAL '5 minutes'
        AND t.datetime >= NOW() - INTERVAL '5 minutes' 
        AND t.record_status = 'active' 
        AND t.row_status = 'active'
        AND LOWER(t.forwardto) LIKE '%tx-%' 
        AND t.category = 'CUSTOMER'
    `).then((rows) => {
    if (rows.length > 0) {
      cy.log('✅ Success: Entry inserted in troubleticket table of PostgreSQL.');
    } else {
      cy.log('❌ Failure: No entry in troubleticket table of PostgreSQL.');
    }
    expect(rows.length).to.be.greaterThan(0);
  });
}


// Helper function to verify troubleticketdetail table entry in PostgreSQL
export function validatePDBTroubleTicketDetail(userId, operator) {
  return cy.task('runPostgresQuery', `
      SELECT t2.ticketid
      FROM troubleticket t 
      JOIN troubleticketdetail t2 ON t2.ticketid = t.id 
      WHERE t.userid = '${userId}' 
        AND t2.record_status = 'active' 
        AND t2.row_status = 'active'
        AND t2.datetime >= NOW() - INTERVAL '5 minutes'
        AND t2.status = 'open' 
        AND t2.department = 'Enterprise Solutions'
        AND t2.operationtype IN ('ISSUE TT', 'TT COMMENT', 'FORWARD TT')
        AND t2."comments" LIKE '%${operator}/Enterprise Solutions%'
      GROUP BY t2.ticketid
      HAVING COUNT(*) = 4 AND COUNT(DISTINCT t2.operationtype) = 3
    `).then((rows) => {
    if (rows.length > 0) {
      cy.log('✅ Success: Entry inserted in troubleticketdetail table of PostgreSQL.');
    } else {
      cy.log('❌ Failure: No entry in troubleticketdetail table of PostgreSQL.');
    }
    expect(rows.length).to.be.greaterThan(0);
  });
}


// Helper function to verify Installation table entry in PostgreSQL
export function validatePDBInstallation(userId, operator) {
  return cy.task('runPostgresQuery', `
    select i.modified_by from customer c
join installation i on i.accountid = c.accountid 
where c.userid = '${userId}' and i.record_status = 'active' and i.row_status = 'active'  
and c.record_status = 'active' and c.row_status = 'active' and i.installation_type = 'SHIFTING PREMISES'
and i.last_updated_on >= NOW() - INTERVAL '5 minutes'
and i.team_assigned_on >= NOW() - INTERVAL '5 minutes'
and i.modified_by = '${operator}'
  `).then((rows) => {
    if (rows.length > 0) {
      cy.log('✅ Success: Entry inserted in installation table of PostgreSQL.');
    } else {
      cy.log('❌ Failure: No entry in installation table of PostgreSQL.');
    }
    expect(rows.length).to.be.greaterThan(0);
  });
}


// Helper function to verify Installationdetail table entry in PostgreSQL
export function validatePDBInstallationDetail(userId, operator) {
  return cy.task('runPostgresQuery', `
    select i.operator from installationdetail i
where i.userid = '${userId}' and i.record_status = 'active' and i.row_status = 'active'  
and i."comments" like '%ShiftingCase%'
and i.datetime >= NOW() - INTERVAL '5 minutes'
and i."operator" = '${operator}' and reopencasetype is null
and i.operationtype = 'SHIFTING PREMISES' and operationvalue = 'shifting'
  `).then((rows) => {
    if (rows.length > 0) {
      cy.log('✅ Success: Entry inserted in installationdetail table of PostgreSQL.');
    } else {
      cy.log('❌ Failure: No entry in installationdetail table of PostgreSQL.');
    }
    expect(rows.length).to.be.greaterThan(0);
  });
}


// Helper function to verify troubleticketdetail table entry in OracleDB
export function validateODBTroubleTicketDetail(userId, operator) {
  return cy.task('runOracleQuery', `
      SELECT ca.OPERATOR
FROM CUSTOMERADDRESS ca
JOIN MBLUSER b ON b.accountid = ca.accountid
WHERE b.userid = '${userId}' AND ca.operator = '${operator}'
AND ca.ADDRESSTYPE IN ('BILLING_ADDRESS','INSTALLATION_ADDRESS')
  AND ca.datetime >= SYSDATE - (5 / 1440)
    `).then((rows) => {
    if (rows.length > 0) {
      cy.log('✅ Success: Entry inserted in troubleticketdetail table of OracleDB.');
    } else {
      cy.log('❌ Failure: No entry in troubleticketdetail table of OracleDB.');
    }
    expect(rows.length).to.be.greaterThan(0);
  });
}