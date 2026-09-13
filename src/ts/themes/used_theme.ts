import type { Theme } from '../models/theme.class';

/**
 * Applies the selected theme's assets, labels, and CSS state to the page.
 * @param theme - The selected theme containing the assets, labels, and theme settings.
 */
export function applyTheme(theme: Theme): void {
  setPlayerLabels(theme);
  setCardFaces(theme.cardFaceImage);
  setText('quitGameModal_backToGame_button', theme.quitDialogBackButtonLabel ?? 'Back to game');
  setText('quitGameModal_exitGame_button', theme.quitDialogExitButtonLabel ?? 'Exit game');
  setText('backToStart', theme.winnerDialogBackButtonLabel ?? 'Back to Start');
  setExitButtonIcon(theme);
  applyThemeClass(theme);
}

/**
 * Applies the CSS class for the selected theme and determines whether
 * the active theme is the food theme.
 * @param theme - The selected theme used to determine the active theme.
 * @returns `true` when the selected theme is the food theme; otherwise `false`.
 */
function applyThemeClass(theme: Theme): boolean {
  const isFoodsTheme = theme.usedTheme == 'FoodsTheme';
  document.body.classList.toggle('is_food_theme', isFoodsTheme);
  document.body.classList.toggle('is_coding_theme', !isFoodsTheme);
  return isFoodsTheme;
}

/**
 * Sets the exit button icon according to the selected theme.
 * @param theme - The selected theme providing the exit button icon.
 */
function setExitButtonIcon(theme: Theme): void {
  const exitIcon = document.getElementById('exitGameIcon');
  if (exitIcon) {
    exitIcon.setAttribute('src', theme.exitButtonIcon);
  }
}

/**
 * Renders the player label images and text for the selected theme.
 * @param theme - The selected theme providing the player images.
 */
function setPlayerLabels(theme: Theme): void {
  setImageSource('bluePlayerImg', theme.getsPlayerImage('blue'));
  setImageSource('orangePlayerImg', theme.getsPlayerImage('orange'));
  setText('blueCodingLabel', 'Blue');
  setText('orangeCodingLabel', 'Orange');
}

/**
 * Sets the front-face background image for every rendered card.
 * @param image - The image URL used as the card front background.
 */
function setCardFaces(image: string): void {
  document.querySelectorAll<HTMLElement>('.card__face:not(.card__face--back)').forEach((face) => {
    face.style.backgroundImage = `url('${image}')`;
  });
}

/**
 * Sets the source attribute of an image element when it exists.
 * @param id - The ID of the image element.
 * @param source - The image URL to assign to the element.
 */
function setImageSource(id: string, source: string): void {
  document.getElementById(id)?.setAttribute('src', source);
}

/**
 * Sets the text content of an element when it exists.
 * @param id - The ID of the target element.
 * @param value - The text content to assign.
 */
function setText(id: string, value: string): void {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}