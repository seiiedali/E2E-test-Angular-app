/**
 * @file DNS_records pageObject
 * @requires Operations to use its functions
 * @module DNS_recordsPage
 */

var oper = require('../basic-modules/operations');
/**
 * DNS records class page for accessing avalible elements and functions in the page
 * @property {object} elm contains page elements in it
 * @todo SOME ELEMENTS NEET TO BE CHANGE WITH ID LOCATORS
 */
class DNS_recordsPage {
    /**
     * @constructor
     */
    constructor (){

        this.elm = {
            addButton : element.all(by.cssContainingText('button', 'add')).first(),
            settingButton : element(by.cssContainingText('button', 'settings')),
            primary : element(by.css('input[placeholder="Primary"]')),
            secondary : element(by.css('input[placeholder="Secondary"]')),
            teritary : element(by.css('input[placeholder="Tertiary"]')),
            ip : element(by.css('input[placeholder="IP Address"]')),
            hostName : element(by.css('input[placeholder="Hostname List"]')),
            updateButton : element(by.cssContainingText('button', 'UPDATE')),
            saveButton : element(by.cssContainingText('button', 'SAVE')),
            clone_button : element(by.cssContainingText('button', 'CLONE')),
            EC : protractor.ExpectedConditions,

            cloneButton : element(by.xpath('//mat-row[./mat-cell/span[contains(text(),"https://zeytoon.com")]]/descendant::button[@mattooltip="Clone"]')),
            cloneFormLoad : element(by.xpath('//mat-toolbar-row/descendant::mat-icon[contains(text(),"content_copy")]')),
            editFormLoad : element(by.xpath('//mat-toolbar-row/descendant::mat-icon[contains(text(),"edit")]')),
            message : element(by.xpath('//div[@class="snotifyToast__body ng-star-inserted"]')),
        }
    };
    /**
    * find and select an existing interface using "interfaceName"     
    * @param {string} interfaceName - it should exactly match the pre defined interface names
    */
    addSourceInterface (interfaceName){
        // elements
        let sourceInterface =  $('#interface_add');
        let searchInterface = $$('input[placeholder="Search…"]').last();
        let checkButton = element(by.cssContainingText('button', 'check'));
        
        sourceInterface.click();
        searchInterface.sendKeys(interfaceName);
        browser.wait(this.elm.EC.presenceOf(oper.selectRow(interfaceName)),10*1000);
        oper.clickWhenClickable(oper.selectRow(interfaceName));
        checkButton.click();
    };
    /**
     * set DNS server setting
     * @param {string} primary - first ip input
     * @param {string} secondary -second ip input 
     * @param {string} teritary -third ip input
     * @param {string} sourceInterface - it should exactly match the pre defined interface names
     */
    setDNS_server (primary , secondary , teritary , sourceInterface) {
        this.elm.settingButton.click();
        browser.wait(this.elm.EC.presenceOf(this.elm.editFormLoad), 8*1000);
        this.elm.primary.clear().sendKeys(primary);
        this.elm.secondary.clear().sendKeys(secondary);
        this.elm.teritary.clear().sendKeys(teritary);
        // !!--> IT WILL DELETE INTERFACE IF THE INTERFACE HAS BEEN ALREADY SELECTED  <--!!
        this.addSourceInterface(sourceInterface);
        this.elm.updateButton.click();
        oper.waitForMessage('edit');
    };
    /**
     * add a DNS record using "ip" and "hostName"
     * @param {string} ip - input ip
     * @param {string} hostName -input hostName
     */
    addDNS (ip , hostName) {
        
        oper.clickWhenClickable(this.elm.addButton, "add button");
        this.elm.ip.sendKeys(ip);
        this.elm.hostName.sendKeys(hostName);
        this.elm.saveButton.click();
        oper.waitForMessage('add');
    };
    /**
     * edit a DNS record, note that if "newName" and "ip" are left empty like '', these data won't be changed
     * @param {string} oldName - record to be edit
     * @param {string=} newName -new name for the record
     * @param {string=} ip - new ip for the record
     */
    editDNS (oldName , newName , ip){
        
        browser.wait(this.elm.EC.presenceOf(element(by.cssContainingText('span',oldName))), 8*1000);
        browser.actions().doubleClick(element(by.cssContainingText('span',oldName))).perform();
        browser.wait(this.elm.EC.presenceOf(this.elm.editFormLoad),8000);
        if (newName != '')
            this.elm.hostName.clear().sendKeys(newName);
        if (ip != '')
            this.elm.ip.clear().sendKeys(ip)
        this.elm.updateButton.click();
        oper.waitForMessage('update');
    };
    /**
     * clone a DNS record, note that if "newName" and "ip" are left empty like '', these data won't be changed
     * @param {string} oldName - record to be clone
     * @param {string=} newName -new name for the record
     * @param {string=} ip - new ip for the record
     */
    cloneDNS (oldName, newName , ip){
        let cloneButton = element(by.xpath('//mat-row[./mat-cell/span[contains(text(),"'+ oldName +'")]]/descendant::button[@mattooltip="Clone"]'))
        browser.wait(this.elm.EC.presenceOf(cloneButton) , 8*1000);
        oper.clickWhenClickable(cloneButton , "clone button");
        browser.wait(this.elm.EC.presenceOf(this.elm.cloneFormLoad),8*1000);
        if (ip != '')
            this.elm.ip.clear().sendKeys(ip);
        if (newName != '')
            this.elm.hostName.clear().sendKeys(newName);
        this.elm.clone_button.click();
        oper.waitForMessage('clone');
    };
    /**
     * delete a DNS record using its name ("entryName")
     * @param {string} entryName - name to find the record
     */
    deleteDNS (entryName){
        // elemets
        let deleteMessage = element.all(by.cssContainingText('div', 'Deleted successfully.')).last();
        let refreshButton = element.all(by.cssContainingText('button', 'refresh')).first();
        let deleteRec = element(by.xpath('//mat-row[./mat-cell/span[contains(text(),"'+entryName+'")]]/descendant::button[@cancelbuttontype="default"]'));

        browser.wait(this.elm.EC.presenceOf(deleteRec) , 8*1000);
        oper.clickWhenClickable(deleteRec,"delete button");
        browser.wait(this.elm.EC.presenceOf(oper.acceptDeletionButton()), 20*1000);
        oper.clickWhenClickable(oper.acceptDeletionButton(), "accept deletion button");
        //wait for the message
        browser.wait(this.elm.EC.presenceOf(deleteMessage),10 * 1000)
        .then(() => {
        oper.clickWhenClickable(deleteMessage , "could not click on delete button").then(null, () => {console.log("couldn't click on the delete message")});
        browser.wait(this.elm.EC.not(this.elm.EC.presenceOf(deleteMessage)),20*1000);
        }, () => { console.log('no delete message to wait for')})
        //refresh for the next deletion
        refreshButton.click();
    }
}
module.exports = new DNS_recordsPage();