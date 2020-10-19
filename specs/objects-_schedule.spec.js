
var LogPage = require('./page-object/login.pageObject');
var page = require('./page-object/objects->schedule.pageObject');
var nav = require('./basic-modules/navigation');
var oper = require('./basic-modules/operations');

describe('objects > schedule Tests', function () {

    // Login Before Doing Anything
    beforeAll(() => {
        nav.goToLogInPage();
        LogPage.logIn();
        browser.waitForAngular();
    });

    // Logout After the Whole test
    afterAll(()=> {
        LogPage.logOut();
    });

      
//--------------------------- add schedule -----------------------------//
    it('Add a Address', function () {
        
        nav.goToSchedule();
        browser.waitForAngularEnabled(false);

          /**
         * manual procedure add schedule using element defined in "schedulePage"
         * 
         * the following function do the same procedure, for arguments definition check matching pageObject
         */

        // page.elm.addButton.click();
        // page.elm.name.sendKeys('new-schedule');
        // page.elm.startDate.sendKeys('07/10/2018');
        // page.elm.endDate.sendKeys('20/10/2018');
        // page.elm.weekDaysAll.click();
        // page.elm.startTime.sendKeys('08002');
        // page.elm.endTime.sendKeys('11302');
        // page.elm.description.sendKeys('schedule created under the E2E test');
        // page.elm.saveButton.click();

        page.addSchedule("new-schedule" , "07/10/2018" , "20/10/2018" , "08002" , "11302" );
        
        // Evaluate The Test
        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'new-schedule'))),4*1000);
        expect(element(by.cssContainingText('span', 'new-schedule')).isDisplayed()).toBe(true);
    });

 // ----------------------------- edit schedule ---------------------------//

    it('Edit schedule', function () {

        // The Test

        /**
         * manual procedure edit schedule using element defined in "schedulePage"
         * 
         * the following function do the same procedure, for arguments definition check matching pageObject
         */

        browser.wait(page.elm.EC.presenceOf(page.elm.editButton), 8*1000);
        page.elm.editButton.click();
        browser.wait(page.elm.EC.presenceOf(page.elm.editFormLoad), 8*1000);
        page.elm.name.clear().sendKeys('schedule-edit');
        page.elm.endDate.clear().sendKeys('25/10/2018');
        page.elm.weekDaysAll.click();
        page.elm.weekDaysEdit.click();
        page.elm.description.clear().sendKeys('schedule edited under the E2E test');
        page.elm.updateButton.click();
    
        // page.editSchedule("new-schedule" , "schedule-edit" , '' , '25/10/2018' , '' , '');

        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'schedule-edit'))),4*1000);
        expect(element(by.cssContainingText('span', 'schedule-edit')).isDisplayed()).toBe(true);

    });

//------------------------------ clone schedule ----------------------------//

    it('clone schedule',function(){
       
        // The Test
        
        /**
         * manual procedure clone schedule using element defined in "schedulePage"
         * 
         * the following function do the same procedure, for arguments definition check matching pageObject
         */

        // browser.wait(page.elm.EC.presenceOf(page.elm.cloneButton), 8*1000);
        // page.elm.cloneButton.click();
        // browser.wait(page.elm.EC.presenceOf(page.elm.cloneFormLoad),8*1000);
        // page.elm.name.clear().sendKeys('schedule-copy');
        // page.elm.startDate.clear().sendKeys('22/10/2018');
        // page.elm.description.clear().sendKeys('clone schedule created under the E2E test');
        // page.elm.clone_button.click();

        page.cloneSchedule('schedule-edit' , 'schedule-copy' , '22/10/2018' , '' , '' , '' , 'clone schedule created under the E2E test');

        browser.wait(page.elm.EC.presenceOf(element(by.cssContainingText('span', 'schedule-copy'))),4*1000);
        expect(element(by.cssContainingText('span', 'schedule-copy')).isDisplayed()).toBe(true);
    });

// ----------------------------- delete schedule ---------------------------//
    it('delete entries', function(){
        
        // The Test
        
        /**
         * this test suite will delete created records using function from "schedulePage",
         * which get records hostname and delete them
         * 
         * at the end we check if the records are deleted successfully
         */

        page.deleteSchedule("schedule-edit");
        page.deleteSchedule("schedule-copy");
        
        expect(element(by.cssContainingText('span', 'schedule-edit')).isPresent()).toBe(false);
        expect(element(by.cssContainingText('span', 'schedule-copy')).isPresent()).toBe(false);
        
    })

});
