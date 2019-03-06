
function radToDeg(r) {
	return r * 180 / Math.PI;
}

function degToRad(d) {
	return d * Math.PI / 180;
}

function updateCameraAngleHorizPlus() {
  cameraAngleDegHoriz++;
}

function updateCameraAngleHorizMinus() {
  cameraAngleDegHoriz--;
}

function updateCameraAngleVertPlus() {
  cameraAngleDegVert++;
}

function updateCameraAngleVertMinus() {
  cameraAngleDegVert--;
}
