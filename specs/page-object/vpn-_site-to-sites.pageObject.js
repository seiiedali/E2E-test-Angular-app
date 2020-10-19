/**
 * @file Vpn pageObject
 * @requires Operations to use its functions
 * @module VpnPage
 */


var oper = require('../basic-modules/operations');

/**
 * Vpn class (pageObject) for accessing avalible elements and functions in the page
 * @property {object} elm contains page elements in it
 * @todo SOME ELEMENTS NEET TO BE CHANGE WITH ID LOCATORS
 *
 */

class VpnPage {
    /**
     * @constructor
     */
    constructor () {
        this.elm = {

            addButton : element(by.cssContainingText('button', 'add')),
            name : element(by.css('input[placeholder="Name"]')),
            presharedKey : element(by.css('input[placeholder="Preshared Key"]')),
            popupAddButton : element(by.css('button[mattooltip="Add New Network Address"]')),
            popupVirtualAddButton : element(by.css('button[mattooltip="Add New Service"]')),
            popupName : element.all(by.css('input[placeholder="Name"]')).last(),
            ip : element(by.css('input[placeholder="ip"]')),
            popupSaveButton : element.all(by.cssContainingText('button', 'SAVE')).last(),
            checkButton : element(by.cssContainingText('button', 'check')),
            editButton : element(by.id('edit_ESF')),
            updateButton : element(by.cssContainingText('button', 'UPDATE')),
            saveButton : element(by.cssContainingText('button', 'SAVE')),
            description : element(by.css('input[placeholder="Description"]')),
            deleteMessage : element(by.cssContainingText('div', 'Deleted successfully.')),
            refreshButton : element.all(by.cssContainingText('button', 'refresh')).first(),
            EC : protractor.ExpectedConditions,
            
            searchInput : element(by.xpath('//input[@placeholder="Search or Add…"]')),
            GRE_button : element(by.xpath('//div[contains(text() , "GRE")]')),
            DeadPearDetection : element(by.xpath('//mat-slide-toggle[./descendant::span[contains(text(),"Dead Peer Detection")]]')),
            editFormLoad : element(by.xpath('//mat-toolbar/descendant::mat-icon[contains(text(),"edit")]')),
        }
    };
    /**
     * this function select optoin in  KEY exchange and Encryption Algorithm
     * in the procedure of creating a vpn
     * @param {string} selectorName - should be Accurate, selector names are like <b>"Phase1 Encryption Algorithm"</b>
     * @param {string} optionName - should be Accurate, option names are like <b>"AES-128"</b>
     */
    optionSelector (selectorName , optionName){
        element(by.css('mat-select[placeholder="'+selectorName+'"]')).click();
        element(by.cssContainingText('mat-option', optionName)).click();
    };
    /**
     * search for an existing address and add it to vpn, in specified address type
     * @param {string} addressType -should be accurate,add type are like <b>"Add Local Network"</b>
     * @param {string} nameAddress - name of the address to be find
     */
    searchAnAddress (addressType , nameAddress){
        let typeSelector = element(by.cssContainingText('p', addressType));
        typeSelector.click();
        this.elm.searchInput.sendKeys(nameAddress);
        browser.wait(this.elm.EC.presenceOf(oper.selectRow(nameAddress)), 20*1000);
        oper.clickWhenClickable(oper.selectRow(nameAddress));
        this.elm.checkButton.click();
    };
    /**
     * create a new address and add it to vpn, in specified address type
     * @param {string} addressType -should be accurate,add type are like <b>"Add Local Network"</b>
     * @param {string} nameAddress - name for creating the new address
     * @param {string} ipAddress  - ip for creating the new address
     */
    addAnAddress (addressType, nameAddress , ipAddress){

        let typeSelector = element(by.cssContainingText('p', addressType));
        typeSelector.click();
        this.elm.popupAddButton.click();
        this.elm.popupName.click().sendKeys(nameAddress)
        this.elm.ip.click().sendKeys(ipAddress);
        this.elm.popupSaveButton.click();
        browser.wait(this.elm.EC.not(this.elm.EC.presenceOf(this.elm.ip)) , 20*1000);
        this.elm.searchInput.sendKeys(nameAddress);
        browser.wait(this.elm.EC.presenceOf(oper.selectRow(nameAddress)), 20*1000);
        oper.clickWhenClickable(oper.selectRow(nameAddress));
        this.elm.checkButton.click();
        // oper.waitForMessage();
    };
    /**
     * search for an existing virtual address and add it to vpn, in specified address type
     * @param {string} addressType -should be accurate,add type are like <b>"Virtual Local Endpoint"</b>
     * @param {string} nameAddress  -name of the address to be find
     */
    searchVirtualAddress (addressType , nameAddress){
        let typeSelector = element(by.cssContainingText('h3', addressType));
        browser.wait(this.elm.EC.presenceOf(typeSelector), 10*1000);
        typeSelector.click();
        this.elm.searchInput.sendKeys(nameAddress);
        browser.wait(this.elm.EC.presenceOf(oper.selectRow(nameAddress)), 20*1000);
        oper.clickWhenClickable(oper.selectRow(nameAddress));
        this.elm.checkButton.click();
    };
    /**
     * create a new virtual address and add it to vpn in specified address type
     * @param {string} addressType -should be accurate,add type are like <b>"Virtual Local Endpoint"</b>
     * @param {string} nameAddress - name for creating the new address
     * @param {string} ipAddress  - ip for creating the new address
     */
    addVirtualAddress  (addressType ,nameAddress , ipAddress){
        let typeSelector = element(by.cssContainingText('h3', addressType ));
        typeSelector.click();
        this.elm.popupVirtualAddButton.click();
        this.elm.popupName.click().sendKeys(nameAddress)
        this.elm.ip.click().sendKeys(ipAddress);
        this.elm.popupSaveButton.click();
        browser.wait(this.elm.EC.not(this.elm.EC.presenceOf(this.elm.ip)) , 20 * 1000);
        this.elm.searchInput.sendKeys(nameAddress);
        browser.wait(this.elm.EC.presenceOf(oper.selectRow(nameAddress)), 20*1000);
        oper.clickWhenClickable(oper.selectRow(nameAddress));
        this.elm.checkButton.click();
        // oper.waitForMessage();
    };
    /**
     * delete a vpn by its name
     * @param {string} entryName -name of the vpn to delete the record
     */
    deleteVpn (entryName){
        let deleteMessage = element.all(by.cssContainingText('div', 'Deleted successfully.')).last();
        oper.clickWhenClickable(element(by.id('delete_'+ entryName)),"delete button");
        browser.wait(this.elm.EC.presenceOf(oper.acceptDeletionButton()), 8*1000);
        oper.clickWhenClickable(oper.acceptDeletionButton(), "accept deletion button");
        //wait for the message
        browser.wait(this.elm.EC.presenceOf(deleteMessage),10 * 1000);
        oper.clickWhenClickable(deleteMessage , "could not click on delete button").then(null, () => {console.log("couldn't click on the delete message")});
        browser.wait(this.elm.EC.not(this.elm.EC.presenceOf(deleteMessage)),20*1000);

        this.elm.refreshButton.click();
    };
}


module.exports = new VpnPage();