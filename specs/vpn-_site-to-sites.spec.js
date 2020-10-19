// ---------------------------- REQUIREMENT --------------------------//
var LogPage = require('./page-object/login.pageObject');
var page = require('./page-object/vpn->site-to-sites.pageObject');
var nav = require('./basic-modules/navigation');
var oper = require('./basic-modules/operations');

// ---------------------------- TEST CASE ------------------------------------//
describe('objects > policies Tests >', function () {

    // Login Before Doing Anything
    beforeAll(() => {
        nav.goToLogInPage();
        LogPage.logIn();
        browser.waitForAngular();
        nav.goToVpn();
        browser.waitForAngularEnabled(false); 
    });

    // Logout After the Whole test
    afterAll(()=> {
        LogPage.logIn();
    });

    //-------------------------- Add Esf Vpn ---------------------------------//
    it('Add Esf vpn', function(){
        
 
        // The Test
        page.elm.addButton.click();
        page.elm.name.sendKeys("ESF");
        
            page.addAnAddress("Add Local Network","vpn4Esf-localNET","192.168.1.2");
            page.addAnAddress("Add Local Endpoint","vpn4Esf-localEND","172.10.10.1");
            page.addAnAddress("Add Remote Network", "vpn4Esf-remoteNET","192.168.2.2");
            page.addAnAddress("Add Remote Endpoint", "vpn4Esf-remoteEND","172.10.10.2");
            
        page.elm.presharedKey.sendKeys("123456");
        page.elm.description.sendKeys("ESF vpn created under the E2E test");
        oper.clickWhenClickable(page.elm.saveButton , "save button for teh vpn");
        
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'ESF'))),4*1000);
        expect(element(by.cssContainingText('span', 'ESF')).isDisplayed()).toBe(true);

    });

    // -------------------------- Edit Esf Vpn -------------------------------//
    
    it('Edit Esf vpn' , function(){

        // The Test
        browser.wait(page.elm.EC.presenceOf(page.elm.editButton), 8*000);
        oper.clickWhenClickable(page.elm.editButton, "add button for ESF");
        browser.wait(page.elm.EC.presenceOf(page.elm.editFormLoad) , 8*1000);
        page.elm.name.clear().sendKeys("ESF-edit");

        page.optionSelector("Phase1 Encryption Algorithm", "AES-128");
        page.optionSelector("Phase1 Authentication Algorithm", "MD5-128");
        page.optionSelector("Phase2 Encryption Algorithm", "AES-128");
        page.optionSelector("Phase2 Authentication Algorithm", "MD5-128 ");

        page.elm.description.clear().sendKeys("ESF vpn edited under the E2E test")
        oper.clickWhenClickable(page.elm.updateButton , "update button for esf vpn");

        //to review the Test
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'ESF-edit'))),4*1000);
        expect(element(by.cssContainingText('span', 'ESF-edit')).isDisplayed()).toBe(true);
    });

    // -------------------------- Add Teh Vpn -------------------------------//
    it('Add teh vpn' , function(){

        // The Test
        page.elm.refreshButton.click();
        oper.clickWhenClickable(page.elm.addButton , "add button for TEH");
        page.elm.name.sendKeys("TEH");
        page.elm.DeadPearDetection.click();

            page.addAnAddress("Add Local Network","vpn4Teh-localNET","192.168.10.2");
            page.addAnAddress("Add Local Endpoint","vpn4Teh-localEND", "172.100.10.1");
            page.addAnAddress("Add Remote Network","vpn4Teh-remoteNET","192.168.20.2");
            page.addAnAddress("Add Remote Endpoint","vpn4Teh-remoteEND", "172.100.10.2");

            page.optionSelector("Phase1 Encryption Algorithm", "AES-128");
            page.optionSelector("Phase1 Authentication Algorithm", "MD5-128");
            page.optionSelector("Phase2 Encryption Algorithm", "AES-128");
            page.optionSelector("Phase2 Authentication Algorithm", "MD5-128 ");
        
        page.elm.GRE_button.click();

            page.addVirtualAddress("Virtual Local Endpoint","TEH-ViLoEND", "192.168.200.2");
            page.addVirtualAddress("Virtual Remote Endpoint", "TEH-ViReEND" ,"192.168.200.1");
            page.addVirtualAddress("Real Local Endpoint", "TEH-ReLoEND", "172.120.10.1");
            page.addVirtualAddress("Real Remote Endpoint", "TEH-ReReEND","172.120.10.2");

        page.elm.presharedKey.sendKeys("123456");
        page.elm.description.sendKeys("TEH vpn created under the E2E test");
        oper.clickWhenClickable(page.elm.saveButton , "save button for teh vpn");

        //to review the Test
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'TEH'))),4*1000);
        expect(element(by.cssContainingText('span', 'TEH')).isDisplayed()).toBe(true);
    })

    //-------------------------- delete the Vpn Records --------------------//
    it('delete Vpn Records', function(){
        // The Test
        page.deleteVpn("ESF-edit");
        page.deleteVpn("TEH");

        expect(element(by.cssContainingText('span', 'ESF-edit')).isPresent()).toBe(false);
        expect(element(by.cssContainingText('span', 'TEH')).isPresent()).toBe(false);

    })
})