/**
 * Opens the existing quit-game dialog if it is not already open.
 * @param dialog - The `HTMLDialogElement` to open.
 */
function openQuitGameModal(dialog: HTMLDialogElement): void {
  if (!dialog.open) {
    dialog.showModal();
  }
}

/**
 * Closes the existing quit-game dialog if it is open.
 * @param dialog - The `HTMLDialogElement` to close.
 */
function closeQuitGameModal(dialog: HTMLDialogElement): void {
  if (dialog.open) {
    dialog.close();
  }
}

/**
 * Initializes the quit-game dialog behavior.
 * Finds the exit button, dialog, and both dialog action buttons. It registers
 * click handlers to open and close the dialog and navigate after confirmation.
 */
export function initQuitGameModal(): void {
  const triggerButton = document.querySelector<HTMLButtonElement>('.exit_button');
  const dialog = document.getElementById('quitGameModal') as HTMLDialogElement | null;
  const backButton = document.getElementById('quitGameModal_backToGame_button') as HTMLButtonElement | null;
  const exitButton = document.getElementById('quitGameModal_exitGame_button') as HTMLButtonElement | null;
  if (!triggerButton || !dialog || !backButton || !exitButton) return;
  executeAddEventListenerForButtons(triggerButton, backButton, exitButton, dialog);
  backdropCloseDialog(dialog);
}

/**
 * Adds click event listeners to the buttons of the quit game modal.
 * The trigger button opens the modal, the back button closes it,
 * and the exit button closes the modal and redirects the user
 * to the settings page.
 * @param triggerButton - Button that opens the quit game modal.
 * @param backButton - Button that closes the modal and returns to the game.
 * @param exitButton - Button that closes the modal and redirects to the settings page.
 * @param dialog - The quit game dialog element.
 */
function executeAddEventListenerForButtons(triggerButton: HTMLButtonElement, backButton: HTMLButtonElement, exitButton: HTMLButtonElement, dialog: HTMLDialogElement): void {
  triggerButton.addEventListener('click', () => openQuitGameModal(dialog));
  backButton.addEventListener('click', () => closeQuitGameModal(dialog));
  exitButton.addEventListener('click', () => {
    closeQuitGameModal(dialog);
    window.location.href = './settings-page.html';
  });
}

/**
 * Adds a click event listener to the dialog that closes it when
 * the backdrop, rather than the dialog content, is clicked.
 * @param dialog - The dialog element to monitor for backdrop clicks.
 */
function backdropCloseDialog(dialog: HTMLDialogElement): void {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      closeQuitGameModal(dialog);
    }
  });
}