import { ROWS, COLS, createLetterStates } from "./utils";

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
		guessedWords: ["DINOS", "HALLS", "HALLS", 
					"COOfD", "HALLS", "HALLS"],
		boardColors: ["BBGGY",  "BBGGY", "BBGGY",
					"BBGGY", "BBGGY", "BBGGY"],
		letterColors: "BBBBBBBBBBBBBBBBBBBBBBGYDB",
		showInvalidGuessAnimation:false,
	}
}

export function emptyResponse(): ServerResponse {
	return {
		guessedWords: Array(6).fill(""),
		boardColors: Array(6).fill("BBBBB"),
		letterColors: "BBBBBBBBBBBBBBBBBBBBBBBBBB",
		showInvalidGuessAnimation:false,
	}
}

export function boardStateFromServerResponse(
	server_response: ServerResponse): LetterState[][] {
	let boardColors = server_response["boardColors"];
	let letterStates = [];

	for (let i = 0; i < ROWS; i++) {
		letterStates.push([]);
		for (let j = 0; j < COLS; j++) {
			switch(boardColors[i][j]) {
				case "G":
					letterStates[i].push("🟩");
					break;
				case "Y":
					letterStates[i].push("🟨");
					break;
				case "D":
					letterStates[i].push("⬛");
					break;
				case "B":
				default:
					letterStates[i].push("🔳");
				break;
			}
		}
	}
	console.log("bsfsr", boardColors);
	console.log("bsfsr 2", letterStates);

	return letterStates;
}

export function letterStateFromServerResponse(server_response: 
	ServerResponse): { [key: string]: LetterState; } {

	let letterColors = server_response["letterColors"];
	let letterStates = createLetterStates();

	let letters = "abcdefghijklmonpqrstuvwxy";

	for (let i = 0; i < letters.length; i++) {
		let val;
		switch(letterColors[i]) {
			case "G":
				val = "🟩";
				break;
			case "Y":
				val = "🟨";
				break;
			case "D":
				val = "⬛";
				break;
			case "B":
			default:
				val = "🔳";
			break;
		}
		letterStates[letters[i]] = val;
	}
	console.log("lsfsr", letterColors);
	console.log("lsfsr 2", letterStates);

	return letterStates;
}