"use strict";

function log() {
	var msg = Array.prototype.join.call(arguments, ', ');
	UIALogger.logMessage(msg);
}

function test(description, steps) {
	try{
		UIALogger.logStart(description);
		steps();
		UIALogger.logPass("Test passed");
	} catch(exception){
		UIALogger.logError(exception.message);
		UIATarget.localTarget().logElementTree();
		UIALogger.logFail("Test failed");
		throw exception;
	}
}

function delay(seconds) {
	UIATarget.localTarget().delay(seconds);
}

function predicateWithFormat(format) {
	var parts = format.split("%@");
	var result = [];
	
	result.push(parts[0]);
	for (var i = 1; i < parts.length; i++) {
		var value = arguments[i];
		if (typeof value == 'string') {
			var allQuotes = new RegExp('"', 'g');
			value = '"' + value.replace(allQuotes, '\\"') + '"';
		}	
		var part = parts[i];
		result.push(value, part);
	}
	return result.join('');
}

function searchWithPredicate(predicate, startElement) {
	if (!startElement) startElement = UIATarget.localTarget().frontMostApp().mainWindow();
	
	function recursiveSearch(predicate, startElement) {
		UIATarget.localTarget().pushTimeout(0);
		var elements = startElement.elements();
		var found = elements.firstWithPredicate(predicate);
		UIATarget.localTarget().popTimeout();
		
		if (found.isValid()) return found;
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			found = recursiveSearch(predicate, element);
			if (found) return found;
		}
		return null;
	}
	
	var timeoutInMillis = UIATarget.localTarget().timeout() * 1000;
	var start = new Date();
	do {
		var now = new Date();
		var found = recursiveSearch(predicate, startElement);
		UIATarget.localTarget().delay(0.1);
	} while(!found && now - start < timeoutInMillis);
	return found;
}

function executeExternalCommand() {
	var cmdString = Array.prototype.join.call(arguments, " ");
	UIALogger.logMessage("Executing: " + cmdString);

	var host = UIATarget.localTarget().host();
	var cmd = arguments[0];
	var args = Array.prototype.slice.call(arguments, 1);
	var result = host.performTaskWithPathArgumentsTimeout(cmd, args, 5);

	 if (result.exitCode > 0) {
	      UIALogger.logError(result.stdout);
	      UIALogger.logError(result.stderr);
	  }
	 return result;
}

function triggerMemoryWarning() {
    if (!UIATarget.localTarget().model().match("Simulator")) {
        log("Can't trigger memory warnings on device");
        return;
    }
    var cmd = 'tell application "System Events" ' +
              'to click menu item "Simulate Memory Warning" ' +
              'of menu "Hardware" of menu bar item "Hardware" ' +
              'of menu bar 1 of process "iPhone Simulator"';
    var result = executeExternalCommand("/usr/bin/osascript", "-e", cmd);
    if (result.exitCode > 0) {
        UIALogger.logError("Could not trigger memory warning");
    } else {
        UIALogger.logWarning("Triggered memory warning");
    }
}
