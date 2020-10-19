/**
 * @file Address pageObject
 * @requires Operations to use its functions
 * @module AddressPage
 */


var oper = require('../basic-modules/operations');

/**
 * Address class (pageObject) for accessing avalible elements and functions in the page
 * @property {object} elm contains page elements in it
 * @todo SOME ELEMENTS NEET TO BE CHANGE WITH ID LOCATORS
 */
class AddressPage {
    /**
     * @constructor 
     */
    constructor() {

        this.elm = {
            addButton : element(by.cssContainingText('button', 'add')),
            clone_button : element(by.cssContainingText('button', 'CLONE')),
            saveButton : element(by.cssContainingText('button', 'SAVE')),
            updateButton : element(by.cssContainingText('button', 'UPDATE')),
            refreshButton : element.all(by.cssContainingText('button', 'refresh')).first(),
            name : element(by.css('input[placeholder="Name"]')),
            ip : element(by.css('input[placeholder="ip"]')),
            description : element(by.css('input[placeholder="Description"]')),
            editButton : element(by.id('edit_new-address')),
            cloneButton : element(by.id('clone_new-address-Edit')),
            EC : protractor.ExpectedConditions,
        
            // ** THESE ELEMENTS NEED TO BE EDIT (by changing with id)
            editFormLoad : element(by.xpath('//mat-toolbar-row/descendant::mat-icon[contains(text(),"edit")]')),
            cloneFormLoad : element(by.xpath('//mat-toolbar-row/descendant::mat-icon[contains(text(),"content_copy")]')),
            }
        };
    /**
     * add an address using arguments:
     * @param {string} name - name for creating new address
     * @param {string} ip - ip for creating new address
     * @param {string=} description - decreption about the new address
     */
    addAnAddress (name , ip , description = "created under the E2E test"){
        this.elm.addButton.click();
        this.elm.name.sendKeys(name);
        this.elm.ip.sendKeys(ip);
        this.elm.description.sendKeys(description);
        this.elm.saveButton.click();
        oper.waitForMessage('add');
    };
    /**
     * @param {entryName} entryName - address name for deleting the address
     */
    deleteAnAddress (entryName){
        /**
         * using clickWhenClickable from base function module,
         * this will click on the record delete button, which is specified by "entryName"
         * and then click on the "yes" button known here as "acceptDeletionButton",
         * at the end, it will wait for popup deletion message to make sure
         * there won't be any conflict between the message and the prpcedure
         */
        let deleteMessage = element.all(by.cssContainingText('div', 'Deleted successfully.')).last();
        oper.clickWhenClickable(element(by.id('delete_'+ entryName )), "delete button")
        .then(() => {
        oper.clickWhenClickable(oper.acceptDeletionButton() , "delete accept button")})

        //wait for the message
        browser.wait(this.elm.EC.presenceOf(deleteMessage),10 * 1000);
        oper.clickWhenClickable(deleteMessage , "could not click on delete button").then(null, () => {console.log("couldn't click on the delete message")});
        browser.wait(this.elm.EC.not(this.elm.EC.presenceOf(deleteMessage)),20*1000);
    };
    /**
     * edit an address using arguments:
     * @param {string} oldName - address name which is going to be edited 
     * @param {string=} newName - this argument have defulat value from former data inputs
     * @param {string=} ip - this argument have have value from former data inputs
     * @param {string=} description : description for the address which is about to edit
     */
    editAnAddress (oldName , newName , ip ,description = "created under the E2E test"){
        let editButton = element(by.id('edit_' + oldName));
        browser.wait(this.elm.EC.presenceOf(editButton), 8*1000);
        oper.clickWhenClickable(editButton , "edit button");
        browser.wait(this.elm.EC.presenceOf(this.elm.editFormLoad), 8*1000);
        if (newName != '')
            this.elm.name.clear().sendKeys(newName);
        if (ip != '')
            this.elm.ip.clear().sendKeys(ip);
        this.elm.description.clear().sendKeys(description);
        this.elm.updateButton.click();  
        oper.waitForMessage('update');

    };

    /**
     * clone an address using arguments:
     * @param {string} oldName - address name which is going to be clone 
     * @param {string=} newName - this argument have defulat value from former data inputs
     * @param {string=} ip - this argument have have value from former data inputs
     * @param {string=} description : description for the address which is about to clone
     */
    cloneAnAddress ( oldName ,newName , ip , description = "created under the E2E test"){
        let cloneButton = element(by.id('clone_' +  oldName));
        browser.wait(this.elm.EC.presenceOf(cloneButton), 8*1000);
        oper.clickWhenClickable(cloneButton , "clone button");
        browser.wait(this.elm.EC.presenceOf(this.elm.cloneFormLoad),8*1000);
        if (newName != '')
            this.elm.name.clear().sendKeys(newName);
        if (ip != '')
            this.elm.ip.clear().sendKeys(ip);
        this.elm.description.clear().sendKeys(description);
        this.elm.clone_button.click();
        oper.waitForMessage('clone');

    };
    /**
     * deleting all the recognized addrees records avalible in the address page,
     * this function need navigating to the address page before it get start,
     * 
     * this function can work with asuumption that all the addresses are deletable or they're undeletable becasue
     * they have been used somewhere, this functionality can be control by its only argumnets below:
     * 
     * WARNING: wrong value to the functions can casue delay or code crash due to situation
     * @param {boolean=} safeMode - if it set to fasle function run without chekhing for the undeletable-in-use address 
     */
    deleteAllAddresses (safeMode = true){
        browser.wait(this.elm.EC.presenceOf($$('button[cancelbuttontype="default"]').first()) , 5*1000).then(null ,()=>{console.log("no record has found")})
        let deleteMessage = element.all(by.cssContainingText('div', 'Deleted successfully.')).last();
        let recCount;
        $$('button[cancelbuttontype="default"]').count().then((value) => { 
            recCount = value;
            console.log('there are ' + value + ' records to delete')
            for(let i = 0 ; i < recCount ; i++){

                oper.clickWhenClickable( $$('button[cancelbuttontype="default"]').first(), "delete button")
                .then(() => {
                    oper.clickWhenClickable(oper.acceptDeletionButton() , "delete accept button")
                })
                if (safeMode){
                    browser.driver.sleep(2000);
                    element(by.cssContainingText('span', ' CLOSE ')).click()
                    .then(null , ()=>{
                        console.log("address is deletable")
                        //wait for the message
                        browser.wait(this.elm.EC.presenceOf(deleteMessage),10 * 1000);
                        oper.clickWhenClickable(deleteMessage , "delete button").then(null, () => {console.log("couldn't click on the delete message")});
                        browser.wait(this.elm.EC.not(this.elm.EC.presenceOf(deleteMessage)),20*1000); 
                    });
                }
                else{
                    //wait for the message
                    browser.wait(this.elm.EC.presenceOf(deleteMessage),10 * 1000);
                    oper.clickWhenClickable(deleteMessage , "delete button").then(null, () => {console.log("couldn't click on the delete message")});
                    browser.wait(this.elm.EC.not(this.elm.EC.presenceOf(deleteMessage)),20*1000); 
                }
            }
        })
    };
}

module.exports = new AddressPage();