
import { writable } from "svelte/store";

let storedGamesPlayed = localStorage.getItem("gamesPlayed") === null ? 0 : localStorage.getItem("gamesPlayed");
export const gamesPlayed = writable(storedGamesPlayed);

let storedWinPercentage = localStorage.getItem("winPercentage") === null ? 0 : localStorage.getItem("winPercentage");
export const winPercentage = writable(storedWinPercentage);

let storedGamesWon = localStorage.getItem("gamesWon") === null ? 0 : localStorage.getItem("gamesWon");
export const gamesWon = writable(storedGamesWon);

let storedGamesLost = localStorage.getItem("gamesLost") === null ? 0 : localStorage.getItem("gamesLost");
export const gamesLost = writable(storedGamesLost);

let storedCurrentStreak = localStorage.getItem("currentStreak") === null ? 0 : localStorage.getItem("currentStreak");
export const currentStreak = writable(storedCurrentStreak);

let storedMaxStreak = localStorage.getItem("maxStreak") === null ? 0 : localStorage.getItem("maxStreak");
export const maxStreak = writable(storedMaxStreak);
