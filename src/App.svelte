<script lang="ts">
	import {
		modeData,
		seededRandomInt,
		createDefaultStats,
		createNewGame,
		createDefaultSettings,
		createLetterStates,
		words,
	} from "./utils";
	import Game from "./components/Game.svelte";
	import { letterStates, settings, mode } from "./stores";
	import { GameMode } from "./enums";
	import { Toaster } from "./components/widgets";
	import { setContext } from "svelte";

	export let version: string;
	setContext("version", version);
	localStorage.setItem("version", version);

	let stats: Stats;
	let word: string;
	let state: GameState;

	settings.set(createDefaultSettings());

	const modeVal: GameMode = modeData.default;
	mode.set(modeVal);
	mode.subscribe((m) => {
		stats = createDefaultStats(m);

		// TODO: Remove this once all the game logic has been removed from this project
		word = words.words[seededRandomInt(0, words.words.length, modeData.modes[m].seed)];

		state = createNewGame(m);
		letterStates.set(createLetterStates());
	});

	let toaster: Toaster;

	document.title = "Wordle | An infinite word guessing game";
</script>

<Toaster bind:this={toaster} />
{#if toaster}
	<Game {stats} {word} {toaster} bind:game={state} />
{/if}
