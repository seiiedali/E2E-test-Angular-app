# E2E testing in SOC web application

## About the product

It's an Enterprise-level web application in cybersecurity domain (SOC) for managing and creating secure network

## About E2E testing

The application uses angular, and to perform end-to-end tests, we're using protractor as the main tool which can be installed by npm package management.

Full documentation from scratch to configure the system and run the tests are provided on this [documentation](https://docs.google.com/document/d/1HZfV6-9JdzKCQLOcx0-Pi1x1VYxOTxErEMxl1Y2GypM/edit?usp=sharing). This will help you to install, run and have some optional features on protractor. 
## Scenarios

Test cases are based on the scenarios which are available on this [google doc](https://docs.google.com/document/d/1M8aOlbnnmYOD1yZoN0cHsL6YXJRb-RZ-SzfSXyzdtv8/edit?usp=sharing). Details about this scenarios format is provided in [`./scenarios/scenarios.md`](./scenarios/scenarios.md) file.
Raw scenarios are also available in DOCX files in `./scenarios/`.

## Project structure (PageObject Design Pattern)

- **`protractor.conf.js`**

    >Have the basic configuration to run the tests.
- **`specs`**

    >Directory that have all the specs and needed modules

    * **`basic-modules`**

        >Directory that have all the basic common module which are needed in different test cases

    * **`page-object`**

        >Directory that have `pageObject` peer to any page on the website, each `pageObject` comes with elements and critical function in that page.

* **`scenarios`**

    >Directory that contain description of scenarios that are handled, and additional information about the stats of each task and the format that the scenarios follow.

* **`out`**

    >Directory that holds the documentation of the E2E test project, documentation is accessible from the `index.html` file (by running as a webpage)

* **`resault`**

    >Every test produce a complete reporting log (in web form) which will be kept in this directory, each report can be identified by time and date of test lunch.

## How these test are written

* Each test suite start with `testname.spec.js` and is saved under the `specs` directory. `testname` should indicate which page is about to get tested. For example `objects->address` describe a test which will assess the functionality of different view objects in address page in the application.

* In each page that is going under the test, it require some page object to interact with them in the page and evaluate their functionality. In order to do this, matching `pageobject` should be import to the test files from the `page-object` directory. If the matching page object doesn't exist and your about to create a new one, it should be created in the mentioned directory using `pageName.pageObject.js` format.

* Shared elements and some global functions are available in `basic-modules`. So feel free to use them by importing to your test suite. Also some configuration for your test are in `enviromentVariables` module that you can modify.

* Set the desired protractor configuration in `protractor.conf.js` and then you're good to go.

## Code documentation
A full code documentation is also provided in [`./Documents/index.html`](./Documents/index.html) which is created with [**JSDOC 3.5.5**](https://jsdoc.app/).

## Issue report

* Protractor is suppose to test angular web pages, but due to (maybe) zone.js problem, protractor can't find angular on the webApllication. So we turn the `waitForAngularEnabled` off by change its value to `false`, which basically turn the protractor main feature off (to interact directly with angular), so we're doing these test in a nonAngular manner and so many difficulty in angular rendering are expected.

* To see more detail on this problem visit this [stack overflow issue report](https://stackoverflow.com/questions/28873680/error-timed-out-waiting-for-protractor-to-synchronize-with-the-page-after-11-sec) or [this link](https://stackoverflow.com/questions/50344720/protractor-cant-detect-angular-5-on-deployed-application).