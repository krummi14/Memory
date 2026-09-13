export type Scores = {
	blueScore: number;
	orangeScore: number;
};

/**
 * Manages the current player scores during a game.
 * The ScoreManager is responsible for updating and rendering the scores
 * as well as persisting them in local storage.
 */
export class ScoreManager {
	update(scores: Scores): void {
		this.render(scores);
		this.save(scores);
	}

	/** Resets both player scores to zero. */
	resetted(): void {
		this.update({ blueScore: 0, orangeScore: 0 });
	}

	/** Returns the persisted scores, defaulting invalid values to zero. */
	getScores(): Scores {
		return {
			blueScore: getStoredScore('blueScore'),
			orangeScore: getStoredScore('orangeScore'),
		};
	}

	/** Renders scores in the score board without persisting them. */
	render({ blueScore, orangeScore }: Scores): void {
		setScore('.blue_player_score_counter', blueScore);
		setScore('.orange_player_score_counter', orangeScore);
	}

	/** Persists both player scores in local storage. */
	private save({ blueScore, orangeScore }: Scores): void {
		localStorage.setItem('blueScore', String(blueScore));
		localStorage.setItem('orangeScore', String(orangeScore));
	}
}

/**
 * Reads a persisted score from local storage and validates its value.
 * Returns `0` if the stored value is missing or not a finite number.
 * @param key - The local storage key of the score to retrieve.
 * @returns The stored score or `0` if the value is invalid.
 */
function getStoredScore(key: 'blueScore' | 'orangeScore'): number {
	const score = Number(localStorage.getItem(key) ?? '0');
	return Number.isFinite(score) ? score : 0;
}

/**
 * Updates the text content of a score element selected by CSS selector.
 * @param selector - The CSS selector used to find the score element.
 * @param score - The score value to display.
 */
function setScore(selector: string, score: number): void {
	const element = document.querySelector<HTMLElement>(selector);
	if (element) element.textContent = String(score);
}