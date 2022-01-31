
import { writable } from "svelte/store";

const storedGamesPlayed = parseInt(localStorage.getItem("gamesPlayed"));
export const gamesPlayed = writable(storedGamesPlayed);
gamesPlayed.subscribe(value => {
    localStorage.setItem("gamesPlayed", parseInt(value) > 0 ? value : 0);
});

const storedWinPercentage = parseInt(localStorage.getItem("winPercentage"));
export const winPercentage = writable(storedWinPercentage);
winPercentage.subscribe(value => {
    localStorage.setItem("winPercentage", parseInt(value) > 0 ? value : 0);
});

const storedGamesWon = parseInt(localStorage.getItem("gamesWon"));
export const gamesWon = writable(storedGamesWon);
gamesWon.subscribe(value => {
    localStorage.setItem("gamesWon", parseInt(value) > 0 ? value : 0);
});

const storedGamesLost = parseInt(localStorage.getItem("gamesLost"));
export const gamesLost = writable(storedGamesLost);
gamesLost.subscribe(value => {
    localStorage.setItem("gamesLost", parseInt(value) > 0 ? value : 0);
});

const storedCurrentStreak = parseInt(localStorage.getItem("currentStreak"));
export const currentStreak = writable(storedCurrentStreak);
currentStreak.subscribe(value => {
    localStorage.setItem("currentStreak", parseInt(value) > 0 ? value : 0);
});

const storedMaxStreak = parseInt(localStorage.getItem("maxStreak"));
export const maxStreak = writable(storedMaxStreak);
maxStreak.subscribe(value => {
    localStorage.setItem("maxStreak", parseInt(value) > 0 ? value : 0);
});
