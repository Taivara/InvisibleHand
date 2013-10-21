"use strict";
var UserLoginScreen = {
	usernameTextField: function() {
		log("Get the user name textfield is present on the screen");
		return this.window().textFields()[0];
	},
	passwordSecureField: function() {
		log("Get the password field is present on the screen");
		return this.window().secureTextFields()[0];
	}, 
	loginButton: function() {
		log("Get the 'Login' button on the screen");
		return this.window().buttons()["Login"];
	}
};

UserLoginScreen.__proto__ = Screen;
