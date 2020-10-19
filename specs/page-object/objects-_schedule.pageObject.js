/**
 * @file Schedule pageObject
 * @requires Operations to use its functions
 * @module SchedulePage
 */


var oper = require('../basic-modules/operations');

/**
 * Schedule class (pageObject) for accessing avalible elements and functions in the page
 * @property {object} elm contains page elements in it
 * @todo SOME ELEMENTS NEET TO BE CHANGE WITH ID LOCATORS
 *
 */

class SchedulePage {
    /**
     * @constructor
     * 
     */
    constructor (){
        this.elm = {
            addButton : element(by.cssContainingText('button', 'add')),
            refreshButton : element(by.cssContainingText('button', 'refresh')),
            name : element(by.css('input[placeholder="Name"]')),
            startDate : element(by.css('input[placeholder="Start Date"]')),
            endDate : element(by.css('input[placeholder="End Date"]')),
            startTime : element(by.css('input[placeholder="Start Time"]')),
            endTime : element(by.css('input[placeholder="End Time"]')),
            description : element(by.css('input[placeholder="Description"]')),
            saveButton : element(by.cssContainingText('button', 'SAVE')),
            updateButton : element(by.cssContainingText('button', 'UPDATE')),
            clone_button : element(by.cssContainingText('button', 'CLONE')),
            editButton : element(by.id('edit_new-schedule')),
            cloneButton : element(by.id('clone_schedule-edit')),
            EC : protractor.ExpectedConditions,

            // ** --> THESE ELEMENTS NEET TO BE CHANGE WITH ID LOCATORS <--
            weekDaysEdit : element.all(by.xpath('//label[./span[contains(text(),"SU")]] | //label[./span[contains(text(),"FR")]] | //label[./span[contains(text(),"MO")]]')),
            weekDaysAll : element(by.xpath('//label[./span[contains(text(),"ALL")]]')),
            viewCountOptionButton : element(by.xpath('//div[@class="mat-paginator-this-size ng-star-inserted"]/descendant::mat-select')),
            optionSelect100 :  element.all(by.xpath('//span[@class="mat-option-text"]')).last(),
            editFormLoad : element(by.xpath('//mat-toolbar-row/descendant::mat-icon[contains(text(),"edit")]')),
            cloneFormLoad : element(by.xpath('//mat-toolbar-row/descendant::mat-icon[contains(text(),"content_copy")]')),
        }
    }
    /**
     * delete an schedule using its name
     * @param {string} entryName - name wich specify which element should be delete
     */
    deleteSchedule (entryName){
        let deleteMessage = element.all(by.cssContainingText('div', 'Deleted successfully.')).last();

        browser.wait(this.elm.EC.presenceOf(element(by.id('delete_'+ entryName))), 8*1000);
        oper.clickWhenClickable(element(by.id('delete_'+ entryName)),"delete button");
        browser.wait(this.elm.EC.presenceOf(oper.acceptDeletionButton()), 20*1000);
        oper.clickWhenClickable(oper.acceptDeletionButton(), "accept deletion button");
        browser.wait(this.elm.EC.presenceOf(deleteMessage),10 * 1000);
        oper.clickWhenClickable(deleteMessage , "could not click on delete button").then(null, () => {console.log("couldn't click on the delete message")});
        browser.wait(this.elm.EC.not(this.elm.EC.presenceOf(deleteMessage)),10*1000);
    };
    /**
     * add schedule using the following arguments,
     * the format for start/end date would be <b>"DD/MM/YYYY"</b>.
     * the format fot strat/end time would be <b>"HHMM[1or2]"</b>, H stand for hour,M stands for minute,1 is am and 2 is pm
     * this function by default select all days of the week
     * @param {string} name 
     * @param {string} startDate - which day schedule starts
     * @param {string} endDate -  which day schedule ends
     * @param {string} startTime - what time schedule starts
     * @param {string} endTime -what time schedule ends
     * @param {string=} description - description about the schedule
     */
    addSchedule (name ,startDate , endDate , startTime , endTime , description = 'created under the E2E test'){
        this.elm.addButton.click();
        this.elm.name.sendKeys(name);
        this.elm.startDate.sendKeys(startDate);
        this.elm.endDate.sendKeys(endDate);
        // IT WILL SELECT ALL DAYS OF THE WEEK
        this.elm.weekDaysAll.click();
        this.elm.startTime.sendKeys(startTime);
        this.elm.endTime.sendKeys(endTime);
        this.elm.description.sendKeys(description);
        this.elm.saveButton.click();
        oper.waitForMessage('add');
    };
    /**
     * edit schedule using the follwoing argument,
     * if you don't want to edit one or more of the data from the schedule just send <b>''</b>
     * to the matching argument
     * 
     * @param {string} oldName - name to find which schedule should be edit
     * @param {string=} newName - this argument have defulat value from former data inputs
     * @param {string=} startDate - this argument have defulat value from former data inputs
     * @param {string=} endDate - this argument have defulat value from former data inputs
     * @param {string=} startTime - this argument have defulat value from former data inputs
     * @param {string=} endTime - this argument have defulat value from former data inputs
     * @param {string=} description - description for the edited schedule
     */
    editSchedule (oldName , newName ,startDate, endDate , startTime , endTime , description = 'created under the E2E test'){
        let editButton = element(by.id('edit_' + oldName));
        browser.wait(this.elm.EC.presenceOf(editButton), 8*1000);
        oper.clickWhenClickable(editButton);
        browser.wait(this.elm.EC.presenceOf(this.elm.editFormLoad), 8*1000);
        if (newName != '')
            this.elm.name.clear().sendKeys(newName);
        if (startDate != '')
            this.elm.startDate.clear().sendKeys(startDate);
        if (endDate != '')
            this.elm.endDate.clear().sendKeys(endDate);
        if (startTime != '')
            this.startTime.sendKeys(startTime);
        if (endTime != '')
            this.endTime.sendKeys(endTime);
    
        this.elm.description.clear().sendKeys(description);
        this.elm.updateButton.click();
        oper.waitForMessage('update');
    };

    /**
     * clone schedule using the following argument,
     * if you don't want to edit one or more of the data from the schedule just send <b>''</b>
     * to the matching argument
     * @param {string} oldName - name to find which schedule should be clone
     * @param {string=} newName - this argument have defulat value from former data inputs
     * @param {string=} startDate - this argument have defulat value from former data inputs
     * @param {string=} endDate - this argument have defulat value from former data inputs
     * @param {string=} startTime - this argument have defulat value from former data inputs
     * @param {string=} endTime - this argument have defulat value from former data inputs
     * @param {string=} description - description for the clone schedule
     */
    cloneSchedule (oldName ,newName , startDate, endDate , startTime , endTime , description = 'created under the E2E test'){
        let cloneButton = element(by.id('clone_' + oldName));
        browser.wait(this.elm.EC.presenceOf(cloneButton), 8*1000);
        oper.clickWhenClickable(cloneButton , "clone icon button");
        browser.wait(this.elm.EC.presenceOf(this.elm.cloneFormLoad),8*1000);
        if (newName != '')
            this.elm.name.clear().sendKeys(newName);
        if (startDate != '')
            this.elm.startDate.clear().sendKeys(startDate);
        if (endDate != '')
            this.elm.endDate.clear().sendKeys(endDate);
        if (startTime != '')
            this.startTime.sendKeys(startTime);
        if (endTime != '')
            this.endTime.sendKeys(endTime);

        this.elm.description.clear().sendKeys(description);
        this.elm.clone_button.click();
        oper.waitForMessage('clone');
    }
    
}

module.exports = new SchedulePage();