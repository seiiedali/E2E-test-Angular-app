
/**
 * @file BaseElement page object
 * @module BaseElement
 */
/**
 * @class
 * this page object contains all the common elemnent like <i>messages</i>, <i>buttons</i>, <i>inputs</i> and etc.
 * @todo SOME ELEMENTS NEET TO BE CHANGE WITH ID LOCATORS
 */
class BaseElement {
/**
 * @constructor
 */
    constructor (){

        this.EC = protractor.ExpectedConditions;
        this.viewCountOptionButton = $('mat-select[aria-label="Items per page:"]');
        this.optionSelectMax = element.all(by.tagName('mat-option')).last();
        this.editFormLoad = element(by.xpath('//mat-toolbar-row/descendant::mat-icon[contains(text(),"edit")]'));
        this.cloneFormLoad = element(by.xpath('//mat-toolbar-row/descendant::mat-icon[contains(text(),"content_copy")]'));
        
        // buttons
        this.addButton = element(by.cssContainingText('button', 'add'));
        this.cloneButton = element(by.cssContainingText('button', 'CLONE'));
        this.saveButton = element(by.cssContainingText('button', 'SAVE'));
        this.updateButton = element(by.cssContainingText('button', 'UPDATE'));
        this.refreshButton = element.all(by.cssContainingText('button', 'refresh')).first();
        this.settingButton = element(by.cssContainingText('button', 'settings'));
        this.checkButton = element(by.cssContainingText('button', 'check'));
        this.popupAddButton = element(by.css('button[mattooltip="Add New Network Address"]')),
        this.popupSaveButton = element.all(by.cssContainingText('button', 'SAVE')).last(),
        this.popupVirtualAddButton = element(by.css('button[mattooltip="Add New Service"]')),
        
        // inputs
        this.name = element(by.css('input[placeholder="Name"]'));
        this.ip = element(by.css('input[placeholder="ip"]'));
        this.description = element(by.css('input[placeholder="Description"]'));
        this.primary = element(by.css('input[placeholder="Primary"]'));
        this.secondary = element(by.css('input[placeholder="Secondary"]'));
        this.teritary = element(by.css('input[placeholder="Tertiary"]'));
        this.hostName = element(by.css('input[placeholder="Hostname List"]'));
        this.userName = element(by.id('username'));
        this.password = element(by.id('password'));
        this.popupName = element.all(by.css('input[placeholder="Name"]')).last();
        this.mapToIP = element(by.css('input[placeholder="MAP to IP"]'));
        this.mapToPort = element(by.css('input[placeholder="Map to Port"]'));
        this.searchOnly = element.all(by.css('input[placeholder="Search…"]')).last();
        this.searchOrAdd = element(by.css('input[placeholder="Search or Add…"]'));
        this.startDate = element(by.css('input[placeholder="Start Date"]')),
        this.endDate = element(by.css('input[placeholder="End Date"]')),
        this.startTime = element(by.css('input[placeholder="Start Time"]')),
        this.endTime = element(by.css('input[placeholder="End Time"]')),
        
        // messages
        this.message = element.all(by.xpath('div[class="snotifyToast__body ng-star-inserted"]')).last();
        this.successMessage = element.all(by.cssContainingText('div', 'Added successfully.')).last();
        this.deleteMessage = element.all(by.cssContainingText('div', 'Deleted successfully.')).last();
        this.cloneMessage = element.all(by.cssContainingText('div', 'Clone Successfully.')).last();
        this.updateMessage = element.all(by.cssContainingText('div', 'Updated Successfully.')).last();
        this.editMessage = element.all(by.cssContainingText('div', 'Edited Successfully.')).last();
        this.dnatMessage = element.all(by.cssContainingText('div', 'Activating DNAT will disable the GEO IP section(Destination).')).last();
        this.snatMessage = element.all(by.cssContainingText('div', 'Activating SNAT will disable the GEO IP section(Source).')).last();
        this.dropMessage = element.all(by.cssContainingText('div', 'Activating Drop will disable Nat Section.')).last();
        this.ipsecMessage = element.all(by.cssContainingText('div', 'Activating IPSEC will disable Nat Section And the GEO IP section.')).last();
        
    };
}

module.exports = new BaseElement();