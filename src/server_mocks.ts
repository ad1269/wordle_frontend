export type ServerResponse = {
	guessedWords: Array<string>,
	boardColors: Array<string>,
	letterColors: string,
	showInvalidGuessAnimation: boolean,
}

// TODO
// Stub functions for the Server API calls for local testing
export function wordleKeyPressed(key: string): ServerResponse {
	console.log("Wordle Key Pressed ", key);
	return testResponse()
}

export function checkGuess(): ServerResponse {
	console.log("Checking guess");
	return testResponse()
}

export function deleteKeyPressed(): ServerResponse {
	console.log("Delete Key Pressed");
	return testResponse()
}

function testResponse(): ServerResponse {
	return {
		guessedWords: ["DINOS"],
		boardColors: ["BBGGY"],
		letterColors: "BBBBBBBBBBBBBBBBBBBBBGYDB",
		showInvalidGuessAnimation:false,
	}
}