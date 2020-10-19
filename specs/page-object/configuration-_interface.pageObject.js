var oper = require('../basic-modules/operations');


class InterfacePage {

    constructor(){

        this.elm = {
            
            alias : $('input[placeholder="Alias"'),
            DHCP_enable : element(by.class('mat-slide-toggle mat-accent _mat-animation-noopable ng-valid ng-dirty ng-touched')),
            DHCP_disable : element(by.class('mat-slide-toggle mat-accent _mat-animation-noopable ng-valid ng-dirty ng-touched mat-checked')),
            EC : protractor.ExpectedConditions,
            popupAddButton : element(by.cssContainingText('button', 'add_circle')),
            updateButton : element(by.cssContainingText('button', 'UPDATE')),
            ip : element.all(by.css('input[placeholder="IP"]')).last(),
            subnetMask : element.all(by.css('input[placeholder="Mask / Subnet"]')),
            description : element(by.css('input[placeholder="Description"]')),
            getway : $('input[placeholder="Gateway"]'),
            interfaceEnable : element(by.cssContainingText('mat-slide-toggle', 'Enable')),
            
        }
    };
    addAnAddress(ip,subnetMask){
        this.elm.popupAddButton.click();
        this.elm.ip.sendkeys(ip);
        this.elm.subnetMask.sendkeys(subnetMask);
    };
};

module.exports = new InterfacePage();