var LogPage = require('./page-object/login.pageObject');
var nav = require('./basic-modules/navigation');
var page = require('./page-object/configuration->interface.pageObject');


describe('objects > interface Tests', function () {

    // Login Before Doing Anything
    beforeAll(() => {
        nav.goToLogInPage();
        LogPage.logIn();
        browser.waitForAngular();
        // Go to Desired Page
        nav.goToInterface();
        browser.waitForAngularEnabled(false);
    });

    // Logout After the Whole test
    afterAll(()=> {
        LogPage.logOut();
    });



    //---------------------- Edit interface ---------------------------------//
    it('edit a interface (1)', function(){
        
        // The test
        page.elm.alias.sendkeys('Local');
        browser.wait(page.elm.EC.presenceOf(page.elm.DHCP_enable))
        .then(() =>{
            page.elm.DHCP_disable.click();
            },() =>{
            console.log('DHCP is already disabled');
        });
        page.elm.popupAddButton.click();
        page.elm.ip.sendkeys('192.168.1.20');
        page.elm.subnetMask.sendkeys('24');
        page.addAnAddress('172.10.10.10','23');
        page.addAnAddress('10.10.10.2', '16');
        page.addAnAddress('92.168.50.2', '22');
        page.addAnAddress('2.2.2.2', '28');
        page.elm.getway.clear().sendkeys('6.6.6.6');

    })
    // ------------------------ Edit interface -----------------------------//
    xit('edit an interface (2)' ,function(){

        // The test
        page.elm.DHCP_disable.click();
        page.elm.interfaceEnable.click();
    })

});