

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
function confirmPassParameters(lower, upper, num, spec) {
	var possChar = []

	if (lower) {
		possChar = possChar.concat(charValues.lowercase);
		console.log(`Using lowercase characters in password`)
	}
	
	if (upper) {
		possChar = possChar.concat(charValues.uppercase);
		console.log(`Using uppercase characters in password`)
	}
	
	if (num) {
		possChar = possChar.concat(charValues.numeric);
		console.log(`Using numeric characters in password`)
	}
	
	if (spec) {
		possChar = possChar.concat(charValues.specialChar);
		console.log(`Using special characters in password`)
	}
	
	console.log(`Array of possible characters: `, possChar);
	return possChar;
}

// Function to prompt user and store results in a returned object
var promptUser = function () {
	var passLength, lowCase, upCase, nums, specials;

	// * Use a while loop with a true/false flag to make sure the user selects a number within the correct range
	var inRange = false;
	while (!inRange) {
		passLength = prompt(`How many characters would you like your password to have? (Must pick a number between 8 and 128)`);
		if ((parseInt(passLength) >= 8) && (parseInt(passLength) <= 128)) {
			inRange = true;
			console.log(`Password length set to: ${passLength}`)
		} else {
			alert(`Sorry, that number is not within the range of 8 - 128.  Try again.`)
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

	return {
		lowCase: lowCase,
		upCase:  upCase,
		nums: nums,
		specials: specials
	}
}


// Generate password function
function generatePassword() {
	var pass = [];
	
	
	// 1. Prompt/confirm the user for password parameters

	// * Use a while loop with a true/false flag to make sure the user selects a number within the correct range
	var inRange = false;
	while (!inRange) {
		passLength = prompt(`How many characters would you like your password to have? (Must pick a number between 8 and 128)`);
		if ((parseInt(passLength) >= 8) && (parseInt(passLength) <= 128)) {
			inRange = true;
			console.log(`Password length set to: ${passLength}`)
		} else {
			alert(`Sorry, that number is not within the range of 8 - 128.  Try again.`)
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

	// 2. If confirms are true, then add their respective arrays into possChar array as individual elements
	confirmPassParameters(lowCase, upCase, nums, specials);


	// 3. Run a for loop to iterate over the length of the password
	for (var i = 1; i <= passLength; i++) {

		//4. Generate a random number as the index to grab the element from the array


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
