import type { Scores } from './score_board';
import { getSelectedTheme } from '../themes/theme';

type WinnerElements = {
    winnerName: HTMLElement;
    title: HTMLElement;
    image: HTMLImageElement;
    confetti: HTMLImageElement;
    dialog: HTMLDialogElement;
};

/**
 * Initializes the winner feedback by collecting the required elements,
 * rendering the feedback based on the final scores, opening the dialog
 * after a short delay, and initializing the back-to-start button.
 * @param scores - The final game scores used to determine the feedback state.
 */
export function initWinnerGame(scores: Scores): void {
    const elements = getWinnerElements();
    if (!elements) return;
    renderFeedback(scores, elements);
    showFeedbackAfterDelay(elements.dialog);
    initBackToStartButton();
}

/**
 * Collects all required DOM elements for the winner feedback dialog.
 * @returns The required winner feedback elements, or `null` if one or more elements are missing.
 */
function getWinnerElements(): WinnerElements | null {
    const winnerName = document.getElementById('winnerName');
    const title = document.getElementById('winnerFeedbackTitle');
    const image = document.getElementById('winnerImg') as HTMLImageElement | null;
    const confetti = document.getElementById('confetti') as HTMLImageElement | null;
    const dialog = document.getElementById('isWinner') as HTMLDialogElement | null;
    if (!winnerName || !title || !image || !confetti || !dialog) return null;
    return { winnerName, title, image, confetti, dialog };
}

/**
 * Determines whether the game ended in a draw or with a winner
 * and renders the corresponding feedback.
 * @param scores - The final game scores.
 * @param elements - The DOM elements used to display the feedback.
 */
function renderFeedback(scores: Scores, elements: WinnerElements): void {
    if (scores.blueScore == scores.orangeScore) return renderDraw(elements);
    renderWinner(scores.blueScore > scores.orangeScore, elements);
}

/**
 * Renders the winning player and applies the selected theme's
 * winner image and confetti configuration.
 * @param isBlueWinner - Indicates whether the blue player won.
 * @param elements - The DOM elements used to display the winner feedback.
 */
function renderWinner(isBlueWinner: boolean, elements: WinnerElements): void {
    const winner = isBlueWinner ? getBlueWinner() : getOrangeWinner();
    const theme = getSelectedTheme();
    elements.title.textContent = 'The winner is';
    elements.winnerName.textContent = winner.name;
    elements.winnerName.style.color = theme.winnerColor ?? winner.color;
    elements.image.src = isBlueWinner ? theme.winnerImage ?? winner.image : winner.image;
    elements.confetti.hidden = theme.showWinnerConfetti == false;
    elements.confetti.style.removeProperty('height');
    if (!elements.confetti.hidden) {
        elements.confetti.src = elements.confetti.dataset.src ?? '';
    }
}


/**
 * Returns the display data associated with the blue player.
 * @returns The blue player's display name, color, and default image path.
 */
function getBlueWinner(): { name: string; color: string; image: string } {
    return { name: 'Blue Player', color: 'rgba(43, 177, 255, 1)', image: '../assets/img/blue_player.svg' };
}

/**
 * Returns the display data associated with the orange player.
 * @returns The orange player's display name, color, and default image path.
 */
function getOrangeWinner(): { name: string; color: string; image: string } {
    return { name: 'Orange Player', color: 'rgba(245, 142, 57, 1)', image: '../assets/img/orange_player.svg' };
}

/**
 * Renders the feedback state shown when both players have the same score.
 * @param elements - The DOM elements used to display the draw feedback.
 */
function renderDraw(elements: WinnerElements): void {
    const theme = getSelectedTheme();
    elements.title.textContent = "It's a";
    elements.title.style.color = theme.drawColor ?? 'rgba(255, 255, 255, 1)';
    elements.winnerName.textContent = 'Draw';
    elements.winnerName.style.color = theme.drawColor ?? 'rgba(77, 213, 188, 1)';
    elements.image.src = theme.drawImage ?? '../assets/img/draw.svg';
    elements.confetti.hidden = true;
    elements.confetti.style.height = '120px';
}

/**
 * Removes the game-over view and opens the winner feedback dialog
 * after a three-second delay.
 * @param dialog - The dialog element that should be opened.
 */
function showFeedbackAfterDelay(dialog: HTMLDialogElement): void {
    const gameOver = document.querySelector<HTMLElement>('.game_over');
    if (!gameOver) return;
    window.setTimeout(() => {
        gameOver.remove();
        dialog.showModal();
        requestAnimationFrame(() => {
            dialog.classList.add('is_visible');
        });
    }, 3000);
}

/**
 * Initializes the click handler for the back-to-start button.
 * Navigates the player to the settings page when the button is clicked.
 */
function initBackToStartButton(): void {
    document.getElementById('backToStart')?.addEventListener('click', () => {
        window.location.href = '/pages/settings.html';
    });
}