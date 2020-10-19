// ------------------------ REQUIRMENTS --------------------------//
var LogPage = require('./page-object/login.pageObject');
var page = require('./page-object/objects->address.pageObject');
var vpnPage = require('./page-object/vpn->site-to-sites.pageObject');
var nav = require('./basic-modules/navigation');
var oper = require('./basic-modules/operations');

// ----------------------- DESCRIBE THE TEST CASE -------------------- //
describe('objects > Address Tests', function () {

    // Login Before Doing Anything
    beforeAll(() => {
        nav.goToLogInPage();
        LogPage.logIn();
        browser.waitForAngular();
        browser.waitForAngularEnabled(false);
    });

    // Logout After the Whole test
    afterAll(()=> {
        LogPage.logOut()
    });

// ------------------------ the first procedure ----------------------//
/*    
xit('this ganna delete all the addresses' , () => {
        nav.goToAddress();
        browser.waitForAngularEnabled(false);

        browser.driver.sleep(3000);
        page.deleteAllAddresses(false);
    })

// ----------------------- to use the search function in vpn --------------------//
    xit('serch function in vpn' , () =>{
        nav.goToVpn();
        browser.waitForAngularEnabled(false);

        browser.driver.sleep(3000);

        oper.clickWhenClickable(vpnPage.elm.addButton , "add button for TEH");
        browser.wait(vpnPage.elm.EC.presenceOf(vpnPage.elm.name),5000);
        vpnPage.elm.name.sendKeys("aaa")
        vpnPage.elm.DeadPearDetection.click();

            vpnPage.addAnAddress("Add Local Network","aaa1","192.165.10.2");
            vpnPage.addAnAddress("Add Local Endpoint","aaa2" , "172.190.10.1");
            vpnPage.searchAnAddress("Add Remote Network" , "vpn4Esf-localNET");
            vpnPage.searchAnAddress("Add Remote Endpoint" , "vpn4Esf-localEND")

            vpnPage.optionSelector("Phase1 Encryption Algorithm", "AES-128");
            vpnPage.optionSelector("Phase1 Authentication Algorithm", "MD5-128");
            vpnPage.optionSelector("Phase2 Encryption Algorithm", "AES-128");
            vpnPage.optionSelector("Phase2 Authentication Algorithm", "MD5-128 ");
        
        vpnPage.elm.GRE_button.click();

            vpnPage.searchVirtualAddress("Virtual Local Endpoint","TEH-ViLoEND");
            vpnPage.searchVirtualAddress("Virtual Remote Endpoint", "TEH-ViReEND");
            vpnPage.addVirtualAddress("Real Local Endpoint", "aaa3", "172.122.10.1");
            vpnPage.addVirtualAddress("Real Remote Endpoint", "aaa4","172.122.10.2");

        vpnPage.elm.presharedKey.sendKeys("123456");
        vpnPage.elm.description.sendKeys("TEH vpn created under the E2E test");
        oper.clickWhenClickable(vpnPage.elm.saveButton , "save button for teh vpn");

    }); 
    xit('to test navigations' , () => {
        nav.goToBackups();
        nav.goToFirewallLog();
        nav.goToGenaralSetting();
        nav.goToGeneralLog();
        nav.goToLogServer();
        nav.goToServices();
        nav.goToStaticRoutes();
        nav.goToSystemService();
        nav.goToSystemSetting();
        nav.goToVpnLog();
    });
    */
    it('test extra fuctions' , () =>{
        nav.goToAddress();
        oper.doTheSearch('any');
        nav.goToSystemSetting();
        // browser.driver.sleep('3000');
        oper.clickOnSetting("Admin Session-timeout");
    })
})