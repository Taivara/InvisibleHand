"user strict";

/* Various screens created by users typically extend this via
 * MyScreen.prototype = Screen
 */ 

var Screen = {
	target: function() {
		return UIATarget.localTarget();
	},
	app: function() {
		return this.target().frontMostApp();
	},
	window: function() {
		return this.app().mainWindow();
	},
	navigationBar: function() {
		return this.app().navigationBar();
	},
	toolbar: function() {
		return this.app().toolbar();
	}
}
