

// VARIABLES
// ============================================

// DOM select the button with ID 'generate'
var generateBtn = document.querySelector("#generate");

// Create an object that contains all of the arrays we'd like to utilize for password characters

var charValues = {
	
	lowercase: ['a', 'b', 'c', 'd', 'e' , 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],

	uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

	numeric: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],

	specialChar: [` `, `!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `{`, `|`, `}`, `~`]
}

// FUNCTIONS
// ================================================


// Function to confirm Password Parameters to add into array
function getPossChar(lower, upper, num, spec) {
	var possChar = []
	if (lower) {
		possChar = possChar.concat(charValues.lowercase);
	}	
	if (upper) {
		possChar = possChar.concat(charValues.uppercase);
	}	
	if (num) {
		possChar = possChar.concat(charValues.numeric);
	}	
	if (spec) {
		possChar = possChar.concat(charValues.specialChar);
	}	
	console.log(`Array of possible characters: `, possChar);
	return possChar;
}

// Function to prompt user and store results in a returned object
var getInputs = function () {
	var passLength, lowCase, upCase, nums, specials;

	// * Use a while loop with a true/false flag to make sure the user selects a number within the correct range
	var inRange = false;
	while (!inRange) {
		passLength = prompt(`How many characters would you like your password to have? (Must pick a number between 8 and 128.  Our default length is 10)`);
		if ((parseInt(passLength) >= 8) && (parseInt(passLength) <= 128)) {
			inRange = true;
			console.log(`Password length set to: ${passLength}`)
		} else if (passLength === null) {
			passLength = 10;
			inRange = true;
		} else {
			alert(`Sorry, that number is not within the range of 8 - 128.  Try again.`);

		}
	}

	// * Use a while loop with a true/false flag to make sure the user selects at least one character parameter
	var atLeastOne = false;
	while (!atLeastOne) {
		lowCase = confirm(`Would you like to use lowercase characters in your password?`);
		upCase = confirm(`Would you like to use uppercase characters in your password?`);
		nums = confirm(`Would you like to use numbers in your password?`);
		specials = confirm(`Would you like to use special characters in your password?`);

		if (lowCase || upCase || nums || specials) {
			atLeastOne = true;
		} else {
			alert(`Sorry, you have to pick at least one character type to use!  Let's take it from the top again...`)
		}
	}

	// Create an object to store all of our prompts and then return the answer
	var inputs = {
		passLength: parseInt(passLength),
		lowCase: lowCase,
		upCase: upCase,
		nums: nums,
		specials: specials
	}


	return {
		passLength: inputs.passLength,
		lowCase: inputs.lowCase,
		upCase:  inputs.upCase,
		nums: inputs.nums,
		specials: inputs.specials
	}
}


// Generate password function
function generatePassword() {
	var pass = [];
	var inputs, possCharArray, ranNum;
	
	// 1. Prompt/confirm the user for password parameters and get inputs
	inputs = getInputs();
	console.log(`Successfully brought inputs into local scope: `, inputs);

	// 2. If confirms are true, then add their respective arrays into possChar array as individual elements
	possCharArray = getPossChar(inputs.lowCase, inputs.upCase, inputs.nums, inputs.specials);


	// 3. Run a for loop to iterate over the length of the password
	for (var i = 1; i <= inputs.passLength; i++) {

		//4. Generate a random number as the index to grab the element from the array
		ranNum = Math.floor(Math.random() * possCharArray.length);
		console.log(ranNum);

		pass.push(possCharArray[ranNum]);
		console.log(pass);

		//5.  Push that element into the pass array

	}

	
	//6. Returned the joined array as a string

}


// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}



// MAIN CODE
// ==================================

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
