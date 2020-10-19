/**
 * @file DNS_records pageObject
 * @requires Operations to use its functions
 * @requires EnvirometVariables
 * @module LogPage
 */

var oper = require('../basic-modules/operations');
var env = require('../basic-modules/enviromentVariables');

/**
 * Log page object make it easy to log to the page, it contains login and logout element and functions,
 * this page object works with "EnviromentVariables" for the <i>user name</i> and <i>password</i>
 * however its functions can get this variables directly as arguments.
 */
class LogPage {
	/**
	 * @constructor
	 * @property {object} logIn - holds element and function for login
	 */
	constructor(){
		this.elm = {
			userName : element(by.id('username')),
			password : element(by.id('password')),
			logInButton : element(by.tagName('button')),
			accountButton : element(by.tagName('vr-toolbar-user-button')),
			logOutButton : element(by.cssContainingText('span', 'Logout')),
		}
	};
	/**
	 * 
	 * @param {string=} username 
	 * @param {string=} pass 
	 */
	logIn (username = env.USERNAME , pass = env.PASSWD) {

			this.elm.userName.sendKeys(username);
			this.elm.password.sendKeys(pass);
			this.elm.logInButton.click();
	};
	/**
	 * 
	 */
	logOut (){
			oper.clickWhenClickable(this.elm.accountButton, "account");
			oper.clickWhenClickable(this.elm.logOutButton , "log out button");
		}
}
	
module.exports = new LogPage();