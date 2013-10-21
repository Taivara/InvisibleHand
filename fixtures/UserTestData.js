"use strict";

var UserTestData = {
	validUserForLogIn: function() {
		log("Return valid user that can log into the app");
		return {
			userName: "cool@guy.com",
			password: "coolcool"
		};
	},
	searchCriteria: function() {
		log("Return data used to search a nightclub");
		return {
			amount: "50",
			primary: "Night Club",
			sub: "Gogo"
		};
	}
};
