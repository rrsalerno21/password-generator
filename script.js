// VARIABLES
// ============================================

// DOM select the button with ID 'generate'
var generateBtn = document.querySelector("#generate");

// A global object that contains all of the arrays we'd like to utilize for password characters

var charValues = {
	lowercase: ['a', 'b', 'c', 'd', 'e' , 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
	uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
	numeric: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
	specialChar: [` `, `!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `{`, `|`, `}`, `~`]
}

// Variable for state of process
var cancelled;


// FUNCTIONS
// ================================================


// Function to prompt user for password length and parameters, and then store results in a returned object to use in getPossChar function
var getInputs = function () {
	// Create variables
	var passLength, lowCase, upCase, nums, specials, inRange, atLeastOne;

	// * Use a while loop with a true/false flag to make sure the user selects a number within the correct range
	inRange = false;
	while (!inRange) {
		// Password Length Prompt
		passLength = prompt(`How many characters would you like your password to have? (Must pick a number between 8 and 128.  The default length is 10.  Hit cancel to terminate password generation.)`);
		
		// Input cases
		if (passLength === null) {
			cancelled = true;
			break;
		} else if (passLength === "") {
			passLength = 10;
			inRange = true;
			cancelled = false;
		}		
		else if ((parseInt(passLength) >= 8) && (parseInt(passLength) <= 128)) {
			inRange = true;
			cancelled = false;
		} else {
			alert(`Sorry, that number is not within the range of 8 - 128.  Try again.`);
		}
	}

	// * Use a while loop with a true/false flag to make sure the user selects at least one character parameter
	atLeastOne = false;
	while (!atLeastOne) {
		if (cancelled) {
			break
		} else {
			// Confirm parameter messages
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
	}

	// Create an object to store all of our prompts and then return the answer
	var inputs = {
		passLength: parseInt(passLength),
		lowCase: lowCase,
		upCase: upCase,
		nums: nums,
		specials: specials,
		cancelled: cancelled
	}

	return {
		passLength: inputs.passLength,
		lowCase: inputs.lowCase,
		upCase:  inputs.upCase,
		nums: inputs.nums,
		specials: inputs.specials,
		cancelled: inputs.cancelled
	}
}

// Function that confirms Password Parameters to add into an array and returns that array of possible password characters
function getPossChar(lower, upper, num, spec) {
	var possChar = [];
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


// Generate password function that gets inputs, creates an array of possible password characters, and then returns a randomized password string
function generatePassword() {
	var pass = [];
	var inputs, possCharArray, ranNum;
	
	// 1. Prompt/confirm the user for password parameters and get inputs
	inputs = getInputs();

	// Check if user cancelled
	if (inputs.cancelled) {
		console.log(`User cancelled generate password.`);
	} else {
		console.log(`Successfully brought inputs into local scope of generatePassword: `, inputs);
	
		// 2. If confirms are true, then add their respective arrays into possChar array as individual elements
		possCharArray = getPossChar(inputs.lowCase, inputs.upCase, inputs.nums, inputs.specials);
	
		// 3. Run a for loop to iterate over the length of the password
		for (var i = 1; i <= inputs.passLength; i++) {
	
			//4. Generate a random number as the index to grab the element from the array
			ranNum = Math.floor(Math.random() * possCharArray.length);
	
			//5.  Push that element into the pass array
			pass.push(possCharArray[ranNum]);
		}
	
		//6. Returned the joined array as a string
		return pass.join("");
	}
}


// Write password to the #password input
function writePassword() {
	var password = generatePassword();
    var passwordText = document.querySelector("#password");

	if (cancelled) {
		passwordText.value = '';
	} else {
		passwordText.value = password;
	}

}



// MAIN CODE
// ==================================

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
