/**
* @file Operations pageObject
* @requires EnviromentVariables
* @module Operations
*/

var elm = require('./baseElements');
/**
 * @class
 * this page object contains all the common functions like <i>waitForMessage</i>, <i>clickWhenCliable</i> and etc.
 */
class Operations {
    /**
     * it clicks on a clicking element until it one successfull click gets done, defualt time out for this function is 12 sec
     * @param {element} element - the element that should recive the click action
     * @param {string} theName - name for element(if function fails, it return failure using element name )
     */
    clickWhenClickable (element,theName) {
        let hasShown = false;
        return browser.wait(function() {
            return element.click().then(
                function() {
                    return true;
                },
                function() {
                    if(!hasShown){
                    console.log(theName + ' is not clickable');
                    hasShown = true;
                    }
                return false;
            });
        },12*1000);
    };
    /**
     * return the <b>"YES"</b> button on delete popup and prevent crashing on refrence error
     */
    acceptDeletionButton () {
        return element(by.xpath('//button[contains(text(), "Yes")]'))
    };  
    /**
     * since message may get conflict on test flow and cuase the test to crash,
     * using this function will ensure that the message is gone and test can be continued
     * @param {string} messageType -message type should match one of the predefined types which are:
     * "update" , "clone" , "add" , "delete" , "edit" , "dnat" , "snat" , "drop" , "ipsec"
     */
    waitForMessage (messageType) {
        let message;
        if(messageType == 'update')
            message = elm.updateMessage;
        else if(messageType == 'clone')
            message = elm.cloneMessage;
        else if(messageType == 'add')
            message = elm.successMessage;
        else if(messageType == 'delete')
            message = elm.deleteMessage;
        else if(messageType == 'edit')
            message = elm.editMessage;
        else if(messageType == 'dnat')
            message = elm.dnatMessage;
        else if(messageType == 'snat')
            message = elm.snatMessage;
        else if(messageType == 'drop')
            message = elm.dropMessage;
        else if(messageType == 'ipsec')
            message = elm.ipsecMessage;
        else message = elm.message;

        browser.wait(elm.EC.presenceOf(message),3*1000)
        .then(() => {
            this.clickWhenClickable(message , "message area");
            browser.wait(elm.EC.not(elm.EC.presenceOf(message)),5*1000).then(null , () => {return null});
        },() => console.log("no message has been detected"));
        
    };
    /**
     * returns record which is specified by row name, on the popup windows
     * @param {string} rowName - record's name
     */
    selectRow (rowName){
        return element.all(by.cssContainingText('mat-row', rowName)).last();
    };
    /**
     * it increse the records count on the page to its maximum value
     */
    viewMoreRecords (){

        this.clickWhenClickable(elm.viewCountOptionButton).then( () => {
            browser.wait(elm.EC.presenceOf(elm.optionSelectMax) , 5*1000);
            elm.optionSelectMax.click()
                .then(null, (err) => {console.log('failed in the middle of increasing page records view' + err)});
        } , () => {console.log('failure on raize the records view count')})
    };
    /**
     * do the search in the page records
     * for example: if you are are on the address page and send <b>"any"</b> as <b>"recordName"</b>
     * it will search the record in the page avalible records 
     * @param {string} recordName - name to search
     */
    doTheSearch (recordName){
        return elm.searchOnly.click().clear().sendKeys(recordName);
    };
    /**
     * it will click on the setting option on setting pages
     *  like<b>" Admin Session-timeout "</b> on the <b>"System Setting"</b> page
     * @param {string} settingName - setting name to be click on
     */
    clickOnSetting (settingName){
        browser.wait(elm.EC.presenceOf(element.all(by.cssContainingText('div',settingName)).last()) , 5000)
        return browser.actions().doubleClick(element.all(by.cssContainingText('div',settingName)).last()).perform();
    }
}


module.exports =  new Operations();