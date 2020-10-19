// ---------------------- REQUIREMENT ----------------------------//



var LogPage = require('./page-object/login.pageObject');
var page = require('./page-object/configuration->DNS_records.pageObject');
var nav = require('./basic-modules/navigation');
var oper = require('./basic-modules/operations');
/**
 * require the "LogPage" for doing the login to the web app
 * require the "DNS_recordsPage" for using the elements and functins on this page
 * require "Operation" for getting the basic functions and do the manual test
 * require "Navigation" to navigate to desired pages
 */
describe('objects > DNS Record Test', function () {

    // Login Before Doing Anything
    beforeAll(() => {
        nav.goToLogInPage();
        LogPage.logIn();
        browser.waitForAngular();
        // get to the page
        nav.goToDNS();
        browser.waitForAngularEnabled(false);
    })

    // Logout After the Whole test
    afterAll(()=> {
        LogPage.logOut();
    });

    //---------------------------- Add DNS Server ---------------------------------//
    it('add DNS server', function(){
        
        // The Test

        /**
         * manual procedure to change the DNS server setting using element defined in "DNS_recordsPage"
         * 
         * the following function do the same procedure, for arguments definition check matching pageObject
         */
        
        // page.elm.settingButton.click();
        // browser.wait(page.elm.EC.presenceOf(page.elm.editFormLoad), 8*1000);
        // page.elm.primary.clear().sendKeys("4.2.2.4");
        // page.elm.secondary.clear().sendKeys("192.168.0.10");
        // page.elm.teritary.clear().sendKeys("192.168.0.4");
        // // !!--> IT WILL DELETE INTERFACE IF THE INTERFACE HAS BEEN ALREADY SELECTED  <--!!
        // page.addSourceInterface("ETH7");
        // page.elm.updateButton.click();
        // oper.waitForMessage();
        
        page.setDNS_server('4.2.2.4' , '192.168.0.10' , '192.168.0.4' , 'ETH7');
        
        // check if the DNS server has been created
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', '4.2.2.4'))),4*1000);
        expect(element(by.cssContainingText('span', '4.2.2.4')).isDisplayed()).toBe(true);
    })

    //------------------------------ Add Record ------------------------------//
    it('add a DNS record',function(){

        // The Test

          /**
         * manual procedure to create DNS records using element defined in "DNS_recordsPage"
         * 
         * the following function do the same procedure, for arguments definition check matching pageObject
         */

        // oper.clickWhenClickable(page.elm.addButton, "add button");
        // page.elm.ip.sendKeys("192.168.0.11");
        // page.elm.hostName.sendKeys("https://zeytoon.ir");
        // page.elm.saveButton.click();
        // oper.waitForMessage();

        page.addDNS("192.168.0.11", "https://zeytoon.ir");

        // check if the DNS Record has been created
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'https://zeytoon.ir'))),4*1000);
        expect(element(by.cssContainingText('span', 'https://zeytoon.ir')).isDisplayed()).toBe(true);
    })
    //----------------------------- Edit Record ----------------------------//
    it('edit a DNS record', function(){

        // The Test
        
        /**
         * manual procedure to edit DNS records using element defined in "DNS_recordsPage"
         * 
         * the following function do the same procedure, for arguments definition check matching pageObject
         */


        // **THIS PART SHOULD BE EDIT LATER (CHANGE BY ID)
        // browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span','https://zeytoon.ir'))), 8*1000);
        // browser.actions().doubleClick(element(by.cssContainingText('span','https://zeytoon.ir'))).perform();
        
        // // wait for the popup window to be loaded completely
        // browser.wait(page.elm.EC.presenceOf(page.elm.editFormLoad),8000);
        
        // // send entry 
        // page.elm.hostName.clear().sendKeys("https://zeytoon.com");
        
        // page.elm.updateButton.click();
        // // To make sure that the message does not conflict with the test
        // oper.waitForMessage();
        
        page.editDNS("https://zeytoon.ir", "https://zeytoon.com" ,'');

        // check if the DNS Record has been changed
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'https://zeytoon.com'))),4*1000);
        expect(element(by.cssContainingText('span', 'https://zeytoon.com')).isDisplayed()).toBe(true);
    })
    //----------------------------- Clone Record ----------------------------//
    it('clone a DNS record', function(){

        // The Test

        /**
         * manual procedure to create DNS records using element defined in "DNS_recordsPage"
         * 
         * the following function do the same procedure, for arguments definition check matching pageObject
         */
        
        // //wait for the Record's clone button to be in the page 
        // browser.wait(page.elm.EC.presenceOf(page.elm.cloneButton) , 8*1000;
        // oper.clickWhenClickable(page.elm.cloneButton , "clone button");

        // // wait for the popup window to be loaded completely
        // browser.wait(page.elm.EC.presenceOf(page.elm.cloneFormLoad),8*1000);

        // // send the entries
        // page.elm.ip.clear().sendKeys("9.9.9.9");
        // page.elm.hostName.clear().sendKeys("test.com");
        
        // page.elm.clone_button.click();
       
        // // To make sure that the message does not conflict with the test
        // oper.waitForMessage();

        page.cloneDNS( "https://zeytoon.com" ,"test.com" , "9.9.9.9" );

        // checking the DNS clone has been created
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'test.com'))),4*1000);
        expect(element(by.cssContainingText('span', 'test.com')).isDisplayed()).toBe(true);
    })
    //----------------------------- Delete Records ------------------------//
    it('delete DNS Records', function(){

        //Do the Test
        
        /**
         * this test will delete created records using function from "DNS_recPageObject",
         * which get records hostname and delete them
         * 
         * at the end we check if the records are deleted successfully
         */
        // delete the DNS edited Record
        page.deleteDNS("https://zeytoon.com");
        // delete the DNS clone Record
        page.deleteDNS("test.com");
        
        // checking the DNS's Records has been Deleted
        expect(element(by.cssContainingText('span', 'https://zeytoon.com')).isPresent()).toBe(false);
        expect(element(by.cssContainingText('span', 'test.com')).isPresent()).toBe(false);

    })
});