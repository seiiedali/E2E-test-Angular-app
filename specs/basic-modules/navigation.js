/** 
* @file navigation pageObject
* @module Navigation
* @requires EnviromentVariables
*/

var env = require('./enviromentVariables');
/**
 * this page object contains all navigations function to navigate to any page easily,
 * navigation function are mostly work without any parameter needed
 * @class
 */
class Navigation {
    constructor () {

    }
    /**
     * this function let you to get any page of the site using "subDirectory" and on any server using "subDomain"
     * @param {string} subDomain - in https://192.168.15.<b>201</b> , <i>"201"</i> is sub domain
     * @param {string} subDirectory - specify the page directory like <i>"objects/address"<i>
     */
    goToPage(subDomain , subDirectory){
        browser.get(env.BASEDOMAIN + subDomain + '/' + subDirectory );
    }
    /**
     * 
     */
    goToLogInPage () {
        browser.get (env.BASEURL + 'auth/login');
    }
    /**
     * 
     */
    goToHome () {
        browser.get ( env.BASEURL );
    }
    /**
     * 
     */
    goToAddress () {
        browser.get (env.BASEURL + 'objects/address');
    }
    /**
     * 
     */
    goToVpn () {
        browser.get (env.BASEURL + 'vpn/site-to-sites');
    }
    /**
     * 
     */
    goToPoliciy () {
        browser.get (env.BASEURL + 'policies/firewall');
    }
    /**
     * 
     */
    goToSchedule () {
        browser.get (env.BASEURL + 'objects/schedule');
    }
    /**
     * 
     */
    goToDNS () {
        browser.get (env.BASEURL + 'config/dns-records');
    }
    /**
     * 
     */
    goToInterface () {
        browser.get (env.BASEURL + 'config/interface');
    }
    /**
     * 
     */
    goToIpTables () {
        browser.get (env.BASEURL + 'api/test/iptables' );
    }
    /**
     * 
     */
    goToServices (){
        browser.get (env.BASEURL + 'objects/service');
    }
    /**
     * 
     */
    goToBackups (){
        browser.get (env.BASEURL + 'config/backup');
    }
    /**
     * 
     */
    goToStaticRoutes (){
        browser.get (env.BASEURL + 'config/static-route');
    }
    /**
     * 
     */
    goToLogServer (){
        browser.get (env.BASEURL + 'config/log-server');
    }
    /**
     * 
     */
    goToGenaralSetting (){
        browser.get (env.BASEURL + 'config/general-setting');
    }
    /**
     * 
     */
    goToSystemSetting (){
        browser.get (env.BASEURL + 'config/system-setting');
    }/**
     * 
     */
    goToSystemService (){
        browser.get (env.BASEURL + 'config/system-service');
    }
    /**
     * 
     */
    goToGeneralLog (){
        browser.get (env.BASEURL + 'logs/general-log');
    }
    /**
     * 
     */
    goToFirewallLog (){
        browser.get (env.BASEURL + 'logs/firewall-log');
    }
    /**
     * 
     */
    goToVpnLog (){
        browser.get (env.BASEURL + 'logs/vpn-log');
    }
}

module.exports = new Navigation();