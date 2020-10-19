/**
 * @file enviromentVariables page Object
 * @module EnviromentVariables
 */

/**
 * this page object contains all the important enviroment variables which can be used by functios like :
 * "LogPage.doTheLogIn()" and "Navigation.goToPolicy"
 */
var EnviromentVariables = {
    BASEURL : 'https://192.168.15.156/',
    BASEDOMAIN : 'https://192.168.15.',
    /**
     * to run from the local project
     */
    CONTEXT_ROOT : '',
    PORT : '',

    USERNAME : 'admin',
    PASSWD : 'admin',

    loadTimeOut : '10 * 1000',
    messageTimeOut : '10 * 1000',
    setupTimeOut : ' 12 * 1000',
    clickTimeOut : ' 8 *1000 '

};  

module.exports = EnviromentVariables ;