"user strict";

var App = {
	isOnIPad: function() {
		return this.target.model().match("iPad");
	},
	rotateLandscape: function() {
		var orientation = UIA_DEVICE_ORIENTATION_LANDSCAPELEFT;
		this.target().setDeviceOrientation(orientation);
	},
	rotatePortrait: function() {
		var orientation = UIA_DEVICE_ORIENTATION_PORTRAIT;
		this.target().setDeviceOrientation(orientation);
	},
	target: function() {
		return UIATarget.localTarget();
	}
}
