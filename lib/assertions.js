function assert(value, failMsg) {
	if (value) return;
	if (!failMsg) failMsg = "Assert failed";
	throw new Error(failMsg);
}

function assertEqual(value1, value2, failMsg) {
	if (value1 === value2) return;
	if (!failMsg) failMsg = "Assert Equal failed";
	var fullMsg = failMsg + ": '" + value1 + "'" + " !== '" + value2 + "'";
	assert(false, fullMsg);
}

function assertNotEqual(value1, value2, failMsg) {
	if (value1 !== value2) return;
	if (!failMsg) failMsg = "Assert Not Equal failed";
	var fullMsg = failMsg + ": '" + value1 + "'" + " === '" + value2 + "'";
	assert(false, fullMsg);
}

function assertGreaterThan(value1, value2, failMsg) {
	if (value1 > value2) return;
	if (!failMsg) failMsg = "Assert Greater Than failed";
	var fullMsg = failMsg + ": '" + value1 + "'" + " > '" + value2 + "'";
	assert(false, fullMsg);
}
