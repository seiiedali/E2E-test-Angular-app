# Documentation for E2E testing on Narin web application

## about the product

it's an webapplication for managing and creating secure network

## about E2E testing

the application uses angular, and to perform end-to-end tests we're using protractor as tool whick can be found by npm package management.

full documention from base and the whole performed procedure to run the test are provided on this [documentation](https://docs.google.com/document/d/1HZfV6-9JdzKCQLOcx0-Pi1x1VYxOTxErEMxl1Y2GypM/edit?usp=sharing). this will help you to install, run and have some optional features on protractor.

## scenarios

test cases are besed on the scenarios wich are avalible on this [google doc](https://docs.google.com/document/d/1M8aOlbnnmYOD1yZoN0cHsL6YXJRb-RZ-SzfSXyzdtv8/edit?usp=sharing). Details on about this scerios format is provied in `./scenarios/scenarios.md` file.

## test project structure

* **`protractor.conf.js`**

    >have the basic configuration to run the  test.
* **`specs`**

    >directory that have all the specs and needed moudules

    * **`basic-modules`**

        >derectory that have all the basic module which are needed in different test cases

    * **`page-object`**

        >directory that have pageObject peer to any page on the website, each pageObject comes with elements and critical function in that page.

* **`scenarios`**

    >directory that contain which scenarios are handled, what are the stats and which format do the scenarios follow.

* **`out`**

    >directory that holds the documention of the E2E test project, documentation is accessible from the `index.html` file

* **`resault`**

    >every test run ended in result which will be kept in a directory by its run time, all of these test resault are in this direcotry.

## how these test are written

* each test suite start with `testname.spec.js` saved under the `specs` directory. `testname` should indicate which page get tested by for exmple `objects->address` is to test the address page on the webApp.

* due the page that is being tested, it need the matching page object that have all the page main elements and functions. page object should be imprt to the test files from the `page-object` directory. if the matching page object doesn't exist, it should be created in the mentioned directory using `pageName.pageObject.js` fomat.

* common elements and some global fuctions are avalible in `basic-modules` modules. feel free to use them by importing to yout test suite. some configuration for your test are in `enviromentVariables` module that you can modify.

* set the desired protractor configuration in `protractor.conf.js` and then you're good to go.

## issue report

* protractor is suppose to test angular web pages, but due to (maybe zone.js) problem protractor can't find angular on the narin webApllication so we turn the `waitForAngularEnabled` off by change its value `false` which basicly turn the protractor main feature off, so we're doing these test in a nonAngular manner and so many difiiculty in angular rendering are expected.

* to see more detail on this problem visit this [stack overflow issue report](https://stackoverflow.com/questions/28873680/error-timed-out-waiting-for-protractor-to-synchronize-with-the-page-after-11-sec) or [this link](https://stackoverflow.com/questions/50344720/protractor-cant-detect-angular-5-on-deployed-application).