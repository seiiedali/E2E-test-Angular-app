// ------------------------ REQUIRMENTS --------------------------//



var LogPage = require('./page-object/login.pageObject');
var page = require('./page-object/objects->address.pageObject');
var oper = require('./basic-modules/operations');
var nav = require('./basic-modules/navigation');

/**
 * require the "LogPage" for doing the login to the web app
 * require the "AddressPage" for using the elements and functins on this page
 * require "Operation" for getting the basic functions and do the manual test
 * require "Navigation" to navigate to desired pages
 */
// ----------------------- DESCRIBE THE TEST CASE -------------------- //
describe('objects > Address Tests', function () {

    // Login Before Doing Anything
    beforeAll(() => {
        nav.goToLogInPage();
        LogPage.logIn();
        // LogPage.logIn.doTheLogIn("admin","admin");
        browser.waitForAngular();
        // Go to Desired Page
        nav.goToAddress();
        // Turn the Dummy Angular Off
        browser.waitForAngularEnabled(false);
    });

    // Logout After the Whole test
    afterAll(()=> {
        LogPage.logOut();
        // LogPage.logOut.doTheLogOut();
    });
//--------------------------- add Address -----------------------------//
    
    it('Add a Address', function () {


        // The Test

        /**
         * this is manual procedure for creating an address,
         * this will use elements in elm objects in address page object
         */

        // page.elm.addButton.click();
        // page.elm.name.sendKeys('new-address');
        // page.elm.ip.sendKeys('192.168.18.0/24');
        // page.elm.description.sendKeys('created under the E2E test');
        // page.elm.saveButton.click();
        
        /**
         * this is an automatic address creation ,
         * this will use a function in address page object
         */

        page.addAnAddress("new-address", "192.168.18.0/24" , "created under the E2E test" );
        
        oper.viewMoreRecords();

        // Evaluate The Test
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'new-address'))), 8 *1000)
        expect(element(by.cssContainingText('span', 'new-address')).isDisplayed()).toBe(true);
    });

// ----------------------------- edit Address ---------------------------//

    it( 'Edit Address', function () {

        // The Test

        // /**
        //  * this is the manual procedure to edit an existing address,
        //  * it waits for the record's edit to be shown then click on it and 
        //  * wait until the popup edit window be fully loaded
        //  * 
        //  * this will use elements in "elm" objects in "address.pageObject"
        //  */

        // browser.wait(page.elm.EC.presenceOf(page.elm.editButton), 8*1000);
        // clickWhenClickable(page.elm.editButton , "edit button");
        // browser.wait(page.elm.EC.presenceOf(page.elm.editFormLoad), 8*1000);
        // page.elm.name.clear();
        // page.elm.name.sendKeys('new-address-Edit');
        // page.elm.ip.clear().sendKeys('192.168.1.0/32');
        // page.elm.description.clear().sendKeys('edited under the E2E test');
        // page.elm.updateButton.click();
        

        /**
         * this is an automatic address edit,
         * this will use a function from "adress.pageObject"
         */

         page.editAnAddress("new-address" , "new-address-Edit", "192.168.1.0/32" , "this is an address editation uner the E2E test");


        // Evaluate The Test
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'new-address-Edit'))), 8 *1000)
        expect(element(by.cssContainingText('span', 'new-address-Edit')).isDisplayed()).toBe(true);
    });

//------------------------------ clone Address ----------------------------//

    it('clone Address',function(){
        
        // The Test

        /**
         * this is the manual procedure to create a clone address,
         * 
         * this will use elements in "elm" object in "address.pageObject"
         */

        // browser.wait(page.elm.EC.presenceOf(page.elm.cloneButton), 8*1000);
        // clickWhenClickable(page.elm.cloneButton , "clone button");
        // browser.wait(page.elm.EC.presenceOf(page.elm.cloneFormLoad),8*1000);
        // page.elm.name.clear();
        // page.elm.name.sendKeys('new-address-clone');
        // page.elm.ip.clear().sendKeys('192.168.1.25');
        // page.elm.description.clear().sendKeys('clone address created under the E2E test');
        // page.elm.clone_button.click();

        /**
         * this is an automatic address clone,
         * this will use a function from "address.pageObject"
         */
        page.cloneAnAddress("new-address-Edit" , "new-address-clone" , "192.168.1.25", "clone address created under the E2E test");
        
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'new-address-clone'))), 8 *1000)
        expect(element(by.cssContainingText('span', 'new-address-clone')).isDisplayed()).toBe(true);
    });

// ----------------------------- delete Address ---------------------------//
    it('delete entries', function(){

        // The Test

        /**
         * address records can be deleted using "deleteAnAddress" function from
         * "address.pageObject" which delete the address by recieving its name
         * 
         * at the end of the test we check if records are deleted
         */

        page.deleteAnAddress("new-address-clone");
        page.deleteAnAddress("new-address-Edit");

        expect(element(by.cssContainingText('span', 'new-address-Edit')).isPresent()).toBe(false);
        expect(element(by.cssContainingText('span', 'new-address-clone')).isPresent()).toBe(false);

    })

});
