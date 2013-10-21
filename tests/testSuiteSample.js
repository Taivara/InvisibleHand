"use strict";

/* Import invisible hand library, 
 * a fixture for some placeholder data
 * and finally a screen which models a single screen in our app
 */
#import "../invisibleHand.js"
#import "../fixtures/UserTestData.js"
#import "../screens/SampleScreen.js"

/* Test our screens by tapping, swiping, or entering data and make assertions
 * about the results.
 */

 test("make an assertion against a screen", function(){
	 var a = someScreen
	 var signInButton = a.signInButton();
	 assert(signInButton.isValid(), "There should be a 'Sign in button'");
	 signInButton.tap();
});
