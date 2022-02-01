<script>
	import {gamesPlayed, winPercentage, currentStreak, maxStreak, gamesWon, gamesLost} from './store.js';
    import WinModal from './WinModal.svelte';
	import HelpModal from './HelpModal.svelte';
	import StatsModal from './StatsModal.svelte';
	import LoseModal from './LoseModal.svelte';
	import Dictionary, { getTodaysWord, isValidWord } from './Dictionary.svelte';

	let activeRowNumber = 0;
	let activeColumnNumber = 0;
	let currentWord = "";
	let todaysWord = getTodaysWord().toUpperCase();

	console.log("Todays Word: " + todaysWord);

	let winModalOpen = false;
	function openWinModal() {
        winModalOpen = true;
    }
    function closeWinModal() {
        winModalOpen = false;
		resetGame(true);
    }

	let helpModalOpen = false;
	function openHelpModal() {
        helpModalOpen = true;
    }
    function closeHelpModal() {
        helpModalOpen = false;
    }

	let statsModalOpen = false;
	function openStatsModal() {
        statsModalOpen = true;
    }
    function closeStatsModal() {
        statsModalOpen = false;
    }

	let loseModalOpen = false;
	function openLoseModal() {
        loseModalOpen = true;
    }
    function closeLoseModal() {
        loseModalOpen = false;
		resetGame(false);
    }

	let gameboard = [
		[{ id: 0, style: "normal", currentLetter: "", animation: "" },
		{ id: 1, style: "normal", currentLetter: "", animation: "" },
		{ id: 2, style: "normal", currentLetter: "", animation: "" },
		{ id: 3, style: "normal", currentLetter: "", animation: "" },
		{ id: 4, style: "normal", currentLetter: "", animation: "" }],
		[{ id: 0, style: "normal", currentLetter: "", animation: "" },
		{ id: 1, style: "normal", currentLetter: "", animation: "" },
		{ id: 2, style: "normal", currentLetter: "", animation: "" },
		{ id: 3, style: "normal", currentLetter: "", animation: "" },
		{ id: 4, style: "normal", currentLetter: "", animation: "" }],
		[{ id: 0, style: "normal", currentLetter: "", animation: "" },
		{ id: 1, style: "normal", currentLetter: "", animation: "" },
		{ id: 2, style: "normal", currentLetter: "", animation: "" },
		{ id: 3, style: "normal", currentLetter: "", animation: "" },
		{ id: 4, style: "normal", currentLetter: "", animation: "" }],
		[{ id: 0, style: "normal", currentLetter: "", animation: "" },
		{ id: 1, style: "normal", currentLetter: "", animation: "" },
		{ id: 2, style: "normal", currentLetter: "", animation: "" },
		{ id: 3, style: "normal", currentLetter: "", animation: "" },
		{ id: 4, style: "normal", currentLetter: "", animation: "" }],
		[{ id: 0, style: "normal", currentLetter: "", animation: "" },
		{ id: 1, style: "normal", currentLetter: "", animation: "" },
		{ id: 2, style: "normal", currentLetter: "", animation: "" },
		{ id: 3, style: "normal", currentLetter: "", animation: "" },
		{ id: 4, style: "normal", currentLetter: "", animation: "" }],
		[{ id: 0, style: "normal", currentLetter: "", animation: "" },
		{ id: 1, style: "normal", currentLetter: "", animation: "" },
		{ id: 2, style: "normal", currentLetter: "", animation: "" },
		{ id: 3, style: "normal", currentLetter: "", animation: "" },
		{ id: 4, style: "normal", currentLetter: "", animation: "" }]
	];

	let keyboard = [
		[{ id: 0, style: "normal", letter: "Q" },
		{ id: 1, style: "normal", letter: "W" },
		{ id: 2, style: "normal", letter: "E" },
		{ id: 3, style: "normal", letter: "R" },
		{ id: 4, style: "normal", letter: "T" },
		{ id: 5, style: "normal", letter: "Y" },
		{ id: 6, style: "normal", letter: "U" },
		{ id: 7, style: "normal", letter: "I" },
		{ id: 8, style: "normal", letter: "O" },
		{ id: 9, style: "normal", letter: "P" }],
		[{ id: 10, style: "normal", letter: "A" },
		{ id: 11, style: "normal", letter: "S" },
		{ id: 12, style: "normal", letter: "D" },
		{ id: 13, style: "normal", letter: "F" },
		{ id: 14, style: "normal", letter: "G" },
		{ id: 15, style: "normal", letter: "H" },
		{ id: 16, style: "normal", letter: "J" },
		{ id: 17, style: "normal", letter: "K" },
		{ id: 18, style: "normal", letter: "L" }],
		[{ id: 20, style: "normal", letter: "Z" },
		{ id: 21, style: "normal", letter: "X" },
		{ id: 22, style: "normal", letter: "C" },
		{ id: 23, style: "normal", letter: "V" },
		{ id: 24, style: "normal", letter: "B" },
		{ id: 25, style: "normal", letter: "N" },
		{ id: 26, style: "normal", letter: "M" }]
	];


	function handleTextEnteredEvent(event) {
		if(event == "ENTER") {
			handleGuessSubmittedEvent(event);
		}
		else if(event == "BACKSPACE") {
			handleBackspaceEvent(event);
		}
		else if(activeColumnNumber >= 5) {
			shakeRow(activeRowNumber);
		} else {			
			currentWord = currentWord + event;
			gameboard[activeRowNumber][activeColumnNumber].currentLetter = event;
			gameboard[activeRowNumber][activeColumnNumber].animation = "grow";
			activeColumnNumber ++;
		}
	}

	function updateButtonState(character, style) {
		for(let i=0; i<keyboard.length; i++) {
			for(let j=0; j<keyboard[i].length; j++) {
				if(keyboard[i][j].letter == character) {
					if(keyboard[i][j].style == "correct") {
						return;
					} else if(keyboard[i][j].style == "present" && style == "correct"){
						keyboard[i][j].style=style;
					} else if(keyboard[i][j].style == "absent" && (style == "present" || style == "correct")){
						keyboard[i][j].style=style;
					} else {
						keyboard[i][j].style=style;
					}
				}
			}
		}
	}

	function shakeRow(rowNum) {
		for(let i=0; i<gameboard[rowNum].length; i++) {
			gameboard[rowNum][i].animation="shake";
		}
	}

	function resetGame(didWin) {
		activeRowNumber=0;
		currentWord = "";
		activeColumnNumber=0;

		if(didWin) {
			var gw = parseInt($gamesWon);
			gw = gw + 1;
			gamesWon.set(gw);
			var cs = parseInt($currentStreak);
			cs = cs + 1;
			currentStreak.set(cs);

			var ms = parseInt($maxStreak);
			if(cs>ms) {
				maxStreak.set(cs);
			}
		} else {
			var gl = parseInt($gamesLost);
			gl = gl + 1;
			gamesLost.set(gl);
			currentStreak.set(0);
		}

		console.log("got to hereasdfasdf");
		var gp = parseInt($gamesPlayed);
		gp = gp + 1;
		gamesPlayed.set(gp);
		winPercentage.set(Math.round((parseInt($gamesWon)/gp)*100));

		for(let i=0; i<keyboard.length; i++) {
			for(let j=0; j<keyboard[i].length; j++) {
				keyboard[i][j].style = "normal";
			}
		}

		for(let i=0; i<gameboard.length; i++) {
			for(let j=0; j<gameboard[i].length; j++) {
				gameboard[i][j].style = "normal";
				gameboard[i][j].currentLetter = "";
			}
		}

		todaysWord = getTodaysWord().toUpperCase();
		console.log(todaysWord);
	}

	function handleGuessSubmittedEvent(event) {
		if(activeColumnNumber != 5) {
			shakeRow(activeRowNumber)
		} else {
			if(isValidWord(currentWord)) {
				var matchedIndexes = [];
				var isWinner = true;
				//find all matching letters
				for (let i = 0; i < currentWord.length; i++) {
					var character = currentWord.charAt(i);
					if(todaysWord.charAt(i) == character) {
						//correct letter
						gameboard[activeRowNumber][i].style = "correct";
						matchedIndexes.push(i);
						updateButtonState(character, "correct");
					} else {
						isWinner = false;
					}
				}
				
				//find all present letters
				var unmatchedLetters = "";
				for (let i = 0; i < currentWord.length; i++) {
					if(!matchedIndexes.includes(i)) {
						unmatchedLetters = unmatchedLetters + todaysWord.charAt(i);
					}
				}
				for (let i = 0; i < currentWord.length; i++) {
					if(!matchedIndexes.includes(i)) {
						var character = currentWord.charAt(i);
						if(unmatchedLetters.includes(character)) {
							gameboard[activeRowNumber][i].style = "present";
							updateButtonState(character, "present");
						} else {
							gameboard[activeRowNumber][i].style = "absent";
							updateButtonState(character, "absent");
						} 
					}
				}

				//reset and check for game lost/won
				activeRowNumber++;
				currentWord = "";
				activeColumnNumber = 0;

				if(activeRowNumber > 5) {
					openLoseModal();
					return;
				}

				if(isWinner) {
					openWinModal();
					return;
				}

			} else {
				shakeRow(activeRowNumber);
				//play message saying word not valid
			}
		}
	}

	function handleBackspaceEvent(event) {
		if(activeColumnNumber <= 0) {
			//play can't backspace more error
		} else {
			activeColumnNumber --;
			currentWord = currentWord.slice(0, -1);
			gameboard[activeRowNumber][activeColumnNumber].currentLetter = "";
		}
	}
</script>

<svelte:head>
	<title>Wordle</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<div id="game">
	<div id="header">
		<div class="toolbar-button" on:click={()=>openHelpModal()}>
			<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
				<path fill="#878a8c" d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path>
			</svg>
		</div>
		<div class="title">Wordle</div>
		<div class="toolbar-button" on:click={()=>openStatsModal()}>
			<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
				<path fill="#878a8c" d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"></path>
			  </svg>
		</div>
	</div>
	<div id="gameboardContainer">
		<div id="gameboard">
			{#each gameboard as gameRow}
				<div class="gameRow">
					{#each gameRow as gameTile, id (gameTile.id)}
						<div class="gameTile" data-state="{gameTile.style}" animation-state="{gameTile.animation}">{gameTile.currentLetter}</div>
					{/each}	
				</div>
			{/each}	
		</div>
	</div>
	<div id="keyboard">
		<div class="buttonRow">
			{#each keyboard[0] as key}
				<button class="keyboardButton" data-state="{key.style}" on:click={()=>handleTextEnteredEvent(key.letter)}>{key.letter}</button>
			{/each}
		</div>
		<div class="buttonRow">
			<div class="spacer half"></div>
			{#each keyboard[1] as key}
				<button class="keyboardButton" data-state="{key.style}" on:click={()=>handleTextEnteredEvent(key.letter)}>{key.letter}</button>
			{/each}
			<div class="spacer half"></div>
		</div>
		<div class="buttonRow">
			<button class="keyboardButton one-and-a-half" on:click={()=>handleTextEnteredEvent("ENTER")}>enter</button>
			{#each keyboard[2] as key}
				<button class="keyboardButton" data-state="{key.style}" on:click={()=>handleTextEnteredEvent(key.letter)}>{key.letter}</button>
			{/each}
			<button class="keyboardButton one-and-a-half" on:click={()=>handleTextEnteredEvent("BACKSPACE")}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
				<path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
			  </svg></button>
		</div>
	</div>
	<WinModal isOpenModal={winModalOpen} on:closeModal={closeWinModal} />
	<LoseModal isOpenModal={loseModalOpen} on:closeModal={closeLoseModal} />
	<HelpModal isOpenModal={helpModalOpen} on:closeModal={closeHelpModal} />
	<StatsModal isOpenModal={statsModalOpen} on:closeModal={closeStatsModal} />
</div>

<style>
	.buttonRow {
		display: flex;
		width: 100%;
		margin: 0 auto 8px;
		touch-action: manipulation;
	}
	.keyboardButton {
		font-family: inherit;
		font-weight: bold;
		border: 0;
		padding: 0;
		margin: 0 6px 0 0;
		height: 58px;
		border-radius: 4px;
		cursor: pointer;
		user-select: none;
		background-color: #d3d6da;
		color: #1a1a1b;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		text-transform: uppercase;
		-webkit-tap-highlight-color: rgba(0,0,0,0.3);
	}
	.keyboardButton[data-state='absent'] {
		background-color:#787c7e;
		color:white;
	}
	.keyboardButton[data-state='correct'] {
		background-color:#6aaa64;
		color:white;
	}
	.keyboardButton[data-state='present'] {
		background-color:#c9b458;
		color:white;
	}
	.half {
		flex: 0.5;
	}
	.one-and-a-half {
		flex: 1.5;
    	font-size: 12px;
	}
	#header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		color: #1a1a1b;
		border-bottom: 1px solid #d3d6da;

	}
	.toolbar-button {
		background: none;
		user-select: none;
		border: none;
		cursor: pointer;
		padding: 0 4px;
	}
	#game {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
		height: 100%;
		display: flex;
		flex-direction: column;
		font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
		font-size: 16px;
	}
	#keyboard {
		height: 200px;
		font-size: 13.3333px;
	}
	#gameboardContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		overflow: hidden;
	}
	#gameboard {
		width: 350px;
		height: 420px;
		display: grid;
		grid-template-rows: repeat(6, 1fr);
		grid-gap: 5px;
		padding: 10px;
		box-sizing: border-box;
	}
	.gameRow {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 5px;
	}
	.gameTile {
		width: 100%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		line-height: 2rem;
		font-weight: bold;
		vertical-align: middle;
		box-sizing: border-box;
		text-transform: uppercase;
		user-select: none;
		background-color: #ffffff;
		border: 2px solid #d3d6da;
		color: #1a1a1b;
	}
	.gameTile[data-state='absent'] {
		background-color:#787c7e;
		border: 2px solid #787c7e;
		color: white;
	}
	.gameTile[data-state='correct'] {
		background-color:#6aaa64;
		border: 2px solid #6aaa64;
		color: white;
	}
	.gameTile[data-state='present'] {
		background-color:#c9b458;
		border: 2px solid #c9b458;
		color: white;
	}
	.gameTile[animation-state='shake'] {
		animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
	}
	@keyframes shake {
		10%, 90% {
			transform: translate3d(-1px, 0, 0);
		}
		
		20%, 80% {
			transform: translate3d(2px, 0, 0);
		}

		30%, 50%, 70% {
			transform: translate3d(-4px, 0, 0);
		}

		40%, 60% {
			transform: translate3d(4px, 0, 0);
		}
	}
	.gameTile[animation-state='grow'] {
		animation: grow 0.1s;
	}
	@keyframes grow {
		0%, 100% {
			margin: 0px;
		}
		
		50% {
			margin: -5px;
		}
	}

	.title {
		font-weight: 700;
		font-size: 36px;
		letter-spacing: 0.2rem;
		text-transform: uppercase;
		text-align: center;
		position: absolute;
		left: 0;
		right: 0;
		pointer-events: none;
	}
</style>



