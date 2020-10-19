// ---------------------------- REQUIREMENT --------------------------//
var LogPage = require('./page-object/login.pageObject');
var page = require('./page-object/policies->firewall.pageObject');
var nav = require('./basic-modules/navigation');
var oper = require('./basic-modules/operations');
var addressPage = require('./page-object/objects->address.pageObject');

describe('objects > policies Tests > ', function () {

    // Login Before Doing Anything
    beforeAll(() => {
        nav.goToLogInPage();
        LogPage.logIn();
        browser.waitForAngular();
        nav.goToPoliciy();
        browser.waitForAngularEnabled(false)
    });

    // Logout After the Whole test
    afterAll(()=> {
        LogPage.logOut()
    });

//----------------------------- add ANY Policy -----------------------------//
    
    it('Add policy', function () {
        
        // The Test
        page.elm.addButton.click();
        page.elm.name.sendKeys('new-policy-any');
        page.elm.IPSEC_button.click();
        oper.waitForMessage('ipsec');

        // add an exitsted address
        page.elm.sourceNetworkButton.click();
        page.elm.searchInput.sendKeys("any");
        browser.wait(page.elm.EC.presenceOf(oper.selectRow('any')), 12*1000);
        oper.clickWhenClickable(oper.selectRow('any') , "select row in add");
        page.elm.checkButton.click();

        page.elm.description.sendKeys('IPSEC - created under the E2E test');
        oper.clickWhenClickable(page.elm.saveButton);
        oper.waitForMessage('add');
        // page.waitForSuccussMessage();
        

        // Evaluate The Test
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'new-policy-any'))), 8 *1000)
        expect(element(by.cssContainingText('span', 'new-policy-any')).isDisplayed()).toBe(true);

        page.apiChecker("new-policy-any");
    });

 // ----------------------------- edit Policy ---------------------------//
    it('edit the created new policy', function () {
        
        // The Test
        browser.wait(page.elm.EC.presenceOf(page.elm.toEditPolicyRow),12*1000);
        oper.clickWhenClickable(page.elm.toEditPolicyRow , "edit button");
        browser.wait(page.elm.EC.presenceOf(page.elm.editFormLoad), 8*1000);
        page.elm.name.clear().sendKeys('edited-policy');
        
        page.elm.ACCEPT_button.click();
        page.elm.logEnable.click();
            
            //selecting eth1 as source interface
            page.addSourceInterface("ETH7");
           
            //adding a source network
            page.addSoAddress("sourceTemp","192.168.2.0/24");
                
            //adding a destination network
            page.addDesAddress("destinationTemp","192.168.5.0/24")
           
            // adding all-tcp service
            page.addService("All-TCP");

        page.elm.description.clear().sendKeys('Edited-policy created under the E2E test');
        page.elm.updateButton.click();
        oper.waitForMessage('edit');
    
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'edited-policy'))), 8 *1000)
        expect(element(by.cssContainingText('span', 'edited-policy')).isDisplayed()).toBe(true);
    });
    
//------------------------------ clone policiy ----------------------------//

    it('clone policy',function(){
    
        // Do the Test
        browser.wait(page.elm.EC.presenceOf(page.elm.cloneButton), 8*1000);
        oper.clickWhenClickable(page.elm.cloneButton , "clone button");
        // page.elm.cloneButton.click();
        browser.wait(page.elm.EC.presenceOf(page.elm.cloneFormLoad),8*1000);
        page.elm.DROP_button.click();
        oper.waitForMessage('drop');
        page.elm.name.clear().then(() => {page.elm.name.sendKeys("policy-clone")})

            //adding a source network
            page.addSoAddress("source4clone","192.168.25.0/24")
                        
            //adding a destination network
            page.addDesAddress("destination4clone","92.168.56.0/24")
            
            // adding all-tcp service
            page.addService("All-UDP");
            
        page.elm.description.clear().sendKeys('clone policy created under the E2E test');
        page.elm.clone_button.click();
        oper.waitForMessage('clone');

        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'policy-clone'))), 8 *1000)
        expect(element(by.cssContainingText('span', 'policy-clone')).isDisplayed()).toBe(true);
        page.apiChecker("policy-clone");
    });

//--------------------------------- Add DNAT policy ---------------------------//

    it('Add DNAT',function(){

        // The Test
        browser.wait(page.elm.EC.presenceOf(page.elm.addButton),12*1000);
        oper.clickWhenClickable(page.elm.addButton , "button for adding Dnat");
        // page.elm.addButton.click();
        page.elm.name.sendKeys('DNAT');
        page.elm.ACCEPT_button.click();

            //adding a source network
            page.addSoAddress("source4DNAT","192.168.1.0/24");

            //adding a destination network
            page.addDesAddress("destination4DNAT","192.168.2.1");

            //adding GEO IP source
            page.addGeoIpSource("Iran, Islamic Republic Of");

            // adding all-tcp service
            page.addService("All-TCP");

        page.elm.natEnable.click();
        page.elm.natType.click();
        page.elm.dnatOption.click();
        oper.waitForMessage('dnat');
        page.elm.mapToIP.sendKeys("192.168.1.10");
        page.elm.mapToPort.sendKeys("3389");

        page.elm.description.sendKeys("DNAT created under the E2E test");
        browser.wait(page.elm.EC.not(page.elm.EC.presenceOf(page.elm.DnatMessage)), 5000);
        page.elm.saveButton.click();
        oper.waitForMessage('add');
        // page.waitForSuccussMessage();

        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'DNAT'))), 8 *1000)
        expect(element(by.cssContainingText('span', 'DNAT')).isDisplayed()).toBe(true);
        
        page.apiChecker("DNAT");
        
    });

//------------------------------- Add  SNAT policy ----------------------------------//

    it('add SNAT policy', function(){


        //Do the test
        browser.wait(page.elm.EC.presenceOf(page.elm.addButton),12*1000);
        oper.clickWhenClickable(page.elm.addButton , "button for adding SNAT")
        // page.elm.addButton.click();
        page.elm.name.sendKeys("SNAT");
        page.elm.ACCEPT_button.click();
        page.elm.logEnable.click();

            // adding a source network
            page.addSoAddress("source4SNAT","192.168.61.0/24");

            // adding a destination network
            page.addDesAddress("destination4SNAT","192.168.5.0");

            // adding a destination GEO IP
            page.addGeoIpDestination("Iran, Islamic Republic Of");

            // adding HTTP and HHTPS serviece
            page.addService("HTTP");
            page.addService("HTTPS");        

        page.elm.natEnable.click();
        page.elm.natType.click();
        page.elm.snatOption.click();
        page.elm.snatType.click();
        oper.waitForMessage('snat');
        page.elm.snatStaticOption.click();
        page.elm.mapToIP.sendKeys("192.168.66.1");
        page.elm.description.sendKeys("SNAT created under the E2E test");
        browser.wait(page.elm.EC.not(page.elm.EC.presenceOf(page.elm.SnatMessage)), 5000);
        page.elm.saveButton.click();
        oper.waitForMessage('add');
        // page.waitForSuccussMessage();
        
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'SNAT'))), 8 *1000)
        expect(element(by.cssContainingText('span', 'SNAT')).isDisplayed()).toBe(true);

        page.apiChecker("SNAT");
    })

//--------------------------------- Add ICMP ---------------------------------//

    it('add a icmp',function(){


        //Do the test
        browser.wait(page.elm.EC.presenceOf(page.elm.addButton),12*1000);
        oper.clickWhenClickable(page.elm.addButton , "button for adding ICMP");

        page.elm.name.sendKeys("all-icmp");
        page.elm.ACCEPT_button.click();
        page.elm.logEnable.click();
                    
            // adding a source interface
            page.addSourceInterface("ETH7");

            // adding a source address
            page.addSoAddress("source4icmp","192.168.85.0/24");

            // adding a destination address
            page.addDesAddress("destination4icmp","192.168.95.0/24");

            // adding a All ICMP service
            page.addService("All-ICMP");
            
        page.elm.description.sendKeys("icmp policy created under the e2e test");

        page.elm.saveButton.click();
        oper.waitForMessage('add');
        // page.waitForSuccussMessage();

        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'all-icmp'))), 8 *1000)
        expect(element(by.cssContainingText('span', 'all-icmp')).isDisplayed()).toBe(true);

        page.apiChecker("all-icmp");
        
        
    })

//--------------------------------- add a TCP policy -------------------------//

    it('add tcp policy',function(){


        //Do the test
        browser.wait(page.elm.EC.presenceOf(page.elm.addButton),12*1000);
        oper.clickWhenClickable(page.elm.addButton , "add button in TCP");
        page.elm.name.sendKeys("all-tcp");
        page.elm.IPSEC_button.click();
        oper.waitForMessage('ipsec');
        page.elm.logEnable.click();
            
            // adding a source interface
            page.addSourceInterface("ETH7");

            // adding a source interface
            // page.addSourceInterface("eth4");

            // adding a source address
            page.addSoAddress("source4TCP","192.168.10.0/24");

            // adding a destination address
            page.addDesAddress("destination4TCP","192.168.20.0/24");

            // adding All-TCP service
            page.addService("All-TCP");
        
        page.elm.description.sendKeys("TCP policy created under the e2e test");
        //to review the test
        // browser.driver.sleep("5000");
        page.elm.saveButton.click();
        oper.waitForMessage('add');
        // page.waitForSuccussMessage();

        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'all-tcp'))), 8 *1000)
        expect(element(by.cssContainingText('span', 'all-tcp')).isDisplayed()).toBe(true);

        page.apiChecker("all-tcp");

    })

//--------------------------------- add a UDP policy -------------------------//

    it('add udp policy',function(){

        //Do the test
        browser.wait(page.elm.EC.presenceOf(page.elm.addButton),12*1000);
        oper.clickWhenClickable(page.elm.addButton, "add button in UDP");
        
        page.elm.name.sendKeys("all-udp");
        page.elm.IPSEC_button.click();
        oper.waitForMessage('ipsec');
        page.elm.logEnable.click();
            
            // adding a source interface
            // page.addSourceInterface("eth3");

            // adding a source interface
            page.addSourceInterface("ETH7");

            // adding a source address
            page.addSoAddress("source4UDP","192.168.82.0/24");

            // adding a destination address
            page.addDesAddress("destination4UDP","192.168.83.0/24");
        
            // adding All-UDP service
            page.addService("All-UDP");

        page.elm.description.sendKeys("UDP policy created under the e2e test");
        //to review the test
        // browser.driver.sleep("5000");
        page.elm.saveButton.click();
        oper.waitForMessage('add');
        // page.waitForSuccussMessage();


        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'all-udp'))), 8 *1000)
        expect(element(by.cssContainingText('span', 'all-udp')).isDisplayed()).toBe(true);


        page.apiChecker("all-udp");

    })

// ----------------------------- delete policies ---------------------------//
    
    it('delete entries', function(){
        

        // Do the Test

        // wait for the page to load
        browser.wait(page.elm.EC.presenceOf(element(by.id('delete_policy-clone'))),12*1000);
        
        page.deletePolicy("policy-clone");

        page.deletePolicy("edited-policy");
        
        page.deletePolicy("DNAT");
        
        page.deletePolicy("SNAT");
        
        page.deletePolicy("all-tcp");

        page.deletePolicy("all-udp");

        page.deletePolicy("all-icmp");
        
        // DELETE ADDRESSES
        nav.goToAddress();
        browser.waitForAngularEnabled(false);
        oper.viewMoreRecords();
        addressPage.deleteAllAddresses(false);
        /**
         * the other wat to delete addresses is delete from below
         */
        // addressPage.deleteAnAddress("sourceTemp");
        // addressPage.deleteAnAddress("destinationTemp");
        // addressPage.deleteAnAddress("source4clone");
        // addressPage.deleteAnAddress("destination4clone");
        // addressPage.deleteAnAddress("source4DNAT");
        // addressPage.deleteAnAddress("destination4DNAT");
        // addressPage.deleteAnAddress("source4SNAT");
        // addressPage.deleteAnAddress("destination4SNAT");
        // addressPage.deleteAnAddress("source4icmp");
        // addressPage.deleteAnAddress("destination4icmp");
        // addressPage.deleteAnAddress("source4TCP");
        // addressPage.deleteAnAddress("destination4TCP");
        // addressPage.deleteAnAddress("source4UDP");
        // addressPage.deleteAnAddress("destination4UDP");
    })
});
