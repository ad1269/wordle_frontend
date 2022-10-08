import { ROWS, COLS, createLetterStates } from "./utils";

export type ServerResponse = {
	guessedWords: Array<string>,
	boardColors: Array<string>,
	letterColors: string,
	showInvalidGuessAnimation: boolean,
}

// TODO
// Stub functions for the Server API calls for local testing
export async function wordleKeyPressed(key: string)
	: Promise<ServerResponse> {

	console.log("Wordle Key Pressed ", key);

	const response = await fetch(
		'http://localhost:18080/wordle_key_pressed/' + key);
	const data = await response.json();

	let sr = {
		guessedWords: data['guessedWords'],
		boardColors: data['boardColors'],
		letterColors: data['letterColors'],
		showInvalidGuessAnimation:false,
	};

	console.log("wkp ", sr);
	return cleanResponse(sr);
}

export async function checkGuess(): Promise<ServerResponse> {
	
	console.log("Checking guess");

	const response = await fetch(
		'http://localhost:18080/enter_pressed');
	const data = await response.json();

	let sr = {
		guessedWords: data['guessedWords'],
		boardColors: data['boardColors'],
		letterColors: data['letterColors'],
		showInvalidGuessAnimation:false,
	};

	console.log("ekp ", sr);
	return cleanResponse(sr);
}

export async function deleteKeyPressed()
	: Promise<ServerResponse> {

	console.log("Delete Key Pressed");

	const response = await fetch(
		'http://localhost:18080/delete_pressed');
	const data = await response.json();

	let sr = {
		guessedWords: data['guessedWords'],
		boardColors: data['boardColors'],
		letterColors: data['letterColors'],
		showInvalidGuessAnimation:false,
	};

	console.log("dkp ", sr);
	return cleanResponse(sr);
}

function cleanResponse(server_response: ServerResponse)
	: ServerResponse {

	let cleanedGuesses = server_response.guessedWords.concat(
		Array(ROWS - server_response.guessedWords.length)
		.fill(""));

	let cleanedColors = server_response.boardColors.concat(
		Array(ROWS - server_response.boardColors.length)
		.fill("BBBBB"));

	let cleanedLetterColors = (server_response.letterColors 
		+ "BBBBBBBBBBBBBBBBBBBBBBBBBB").substring(0, 26);


	let cleaned_server_response = {
		guessedWords: cleanedGuesses,
		boardColors: cleanedColors,
		letterColors: cleanedLetterColors,
		showInvalidGuessAnimation: false,
	};

	console.log("cr", cleaned_server_response, 
		cleanedLetterColors.length);
	return cleaned_server_response;
}

// function testResponse(): ServerResponse {
// 	return {
// 		guessedWords: ["DINOS", "HALLS", "HALLS", 
// 					"COOfD", "HALLS", "HALLS"],
// 		boardColors: ["BBGGY",  "BBGGY", "BBGGY",
// 					"BBGGY", "BBGGY", "BBGGY"],
// 		letterColors: "BBBBBBBBBBBBBBBBBBBBBBGYDB",
// 		showInvalidGuessAnimation:false,
// 	}
// }

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

	for (let i = 0; i < boardColors.length; i++) {
		letterStates.push([]);
		for (let j = 0; j < boardColors[i].length; j++) {
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