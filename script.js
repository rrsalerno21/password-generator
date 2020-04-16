// VARIABLES
// ============================================

// DOM select the button with ID 'generate'
var generateBtn = document.querySelector("#generate");
var passLengthEnter = document.getElementById('passLength');

// A global object that contains all of the arrays we'd like to utilize for password characters

var charValues = {
	lowercase: ['a', 'b', 'c', 'd', 'e' , 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
	uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
	numeric: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
	specialChar: [` `, `!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `{`, `|`, `}`, `~`]
}


// FUNCTIONS
// ================================================

// Function to get the users inputs from the form
function getFormInputs() {
	var passLength, lowerCase, upperCase, numbers, specials;

	// get password length input
	passLength = document.getElementById("passLength").value;

	// password length form validation
	if (passLength === "" || (passLength < 8)  || (passLength > 128)) {
		alert('Please select a password length between 8 - 128.')
		return false;
	}
	
	// get password parameter inputs
	lowerCase = document.getElementById("lowercase").checked;
	upperCase = document.getElementById("uppercase").checked;
	numbers = document.getElementById("numbers").checked;
	specials = document.getElementById("specials").checked;

	// password parameter validation
	if (lowerCase === false && upperCase === false && numbers === false && specials === false) {
		alert('Please select at least one password parameter')
		return false;
	}
	console.log('Captured Inputs: ', passLength, lowerCase, upperCase, numbers, specials);

	// return object to be used in different scope
	return {
		passLength: passLength,
		lowerCase: lowerCase,
		upperCase: upperCase,
		numbers: numbers,
		specials: specials
	}
}

// Function to create an array of possible characters given the user's inputs
function createPassArray(lowerCase, upperCase, numbers, specials) {
	var passArray = [];

	// Add characters from charValue global object to passArray for each case
	if (lowerCase) {
		passArray = passArray.concat(charValues.lowercase);
	}
	if (upperCase) {
		passArray = passArray.concat(charValues.uppercase);
	}
	if (numbers) {
		passArray = passArray.concat(charValues.numeric);
	}
	if (specials) {
		passArray = passArray.concat(charValues.specialChar);
	}

	return passArray
}

function generatePassword() {
	var inputs, passArray;
	var pass = [];

	// 1. Get password parameters from form
	inputs = getFormInputs();

	// 2. Create password array with those parameters
	passArray = createPassArray(inputs.lowerCase, inputs.upperCase, inputs.numbers, inputs.specials);

	// 3. Use a for loop to iterate over passLength to create a new random password
	while (pass.length < inputs.passLength) {
		var ranNum = Math.floor(Math.random() * passArray.length);
		pass.push(passArray[ranNum]);
	};

	// 4. Join the pass array and return
	return pass.join("");

}

// Write password to the #password input
function writePassword() {
	var password = generatePassword();
    var passwordText = document.querySelector("#password");

		passwordText.value = password;

}

// EXECUTE CODE
// ==================================

// Add event listeners for click and enter to generate button
// on click
generateBtn.addEventListener("click", writePassword);

// on enter of passlength input
passLengthEnter.addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		generateBtn.click();
	} 
});