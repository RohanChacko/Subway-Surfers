/*The keydown event occurs when a keyboard key is pressed down.*/
$(document).keydown(function(event){
	var charCode = event.keyCode;
	var charStr = String.fromCharCode(charCode);
	statusKeys[charCode] = true;
  console.log(charStr);
});

/* The keyup event occurs when a keyboard key is released. */
$(document).keyup(function(event){

	var charCode = event.keyCode;

	var charStr = String.fromCharCode(charCode);
	statusKeys[charCode] = false;
});

function handleKeys(){

	if(statusKeys[37] || statusKeys[65]){
		// A or Left Key
		console.log(String.fromCharCode(65));
	}
	if(statusKeys[39] || statusKeys[68]){
		// D or Right Key
		console.log(String.fromCharCode(68));
	}

};
