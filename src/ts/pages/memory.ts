import { getMemoryGameHeaderTemplate, getCardTemplate, getQuitMemoryGameDialogTemplate, getMemoryGameFieldTemplate } from '../templates/memory_template';
import { getSelectedTheme } from '../themes/theme';

/**
 * Randomly shuffles an array of card image paths.
 * @param cards - The card image paths to shuffle.
 * @returns A new array containing the same entries in random order.
 */
function shuffleCards(cards: string[]): string[] {
  const shuffledCards = [...cards];
  for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledCards[index], shuffledCards[randomIndex]] = [shuffledCards[randomIndex], shuffledCards[index]];
  }
  return shuffledCards;
}

/**
 * Renders randomly ordered image pairs on the card back faces.
 * @param cardCount - The number of cards on the current board.
 */
function renderBackFaceImages(cardCount: number): void {
  const backFaces = Array.from(document.querySelectorAll<HTMLElement>('.card__face--back'));
  if (backFaces.length == 0) return;
  const pairCount = Math.max(1, Math.floor(cardCount / 2));
  const theme = getSelectedTheme();
  const selectedImages = Array.from({ length: pairCount }, (_, index) => theme.getCardImage(index));
  const randomizedCardImages = shuffleCards([...selectedImages, ...selectedImages]).slice(0, cardCount);
  backFaces.forEach((face, index) => {
    const image = randomizedCardImages[index];
    face.setAttribute('data-card-image', image ?? '');
    face.style.backgroundImage = theme.cardImageMaxSize || !image ? 'none' : `url('${image}')`;
    renderCardImage(face, image, theme.cardImageMaxSize);
  });
}

/** Adds an optional card image while respecting the theme's size limit. */
function renderCardImage(face: HTMLElement, source: string | undefined, maxSize?: number): void {
  face.querySelector('.card__image')?.remove();
  if (!source || !maxSize) return;
  const image = document.createElement('img');
  image.className = 'card__image';
  image.src = source;
  image.alt = '';
  image.style.maxWidth = `${maxSize}%`;
  image.style.maxHeight = `${maxSize}%`;
  face.append(image);
}

/**
 * Renders the header for the memory game page.
 */
export function renderMemoryHeader(): void {
  const refHeaderSection = document.querySelector<HTMLElement>('[header-section]');
  if (refHeaderSection) refHeaderSection.outerHTML = getMemoryGameHeaderTemplate();

}

/**
 * Renders the board with the selected number of cards and assigned back-face images.
 */
export function renderMemoryBoard(): void {
  const refField = document.getElementById('field');
  if (!refField) return;
  const selectedBoardSize = (localStorage.getItem('selectedBoardSize') ?? '4x4').toLowerCase().replace(/\s+/g, '');
  const [cols, rows] = selectedBoardSize.split('x').map((value) => Number(value));
  const validSize = Number.isInteger(rows) && Number.isInteger(cols);
  const cardCount = validSize ? rows * cols : 16;
  const columns = validSize ? cols : 4;
  refField.style.gridTemplateColumns = `repeat(${columns}, 120px)`;
  refField.style.gap = cardCount == 36 ? '6px' : '';
  refField.innerHTML = Array.from({ length: cardCount }, getCardTemplate).join('');
  renderBackFaceImages(cardCount);
}

/**
 * Renders the game section into the page.
 * Replaces the placeholder with the `[game-section]` attribute using the game
 * section template.
 */
export function renderMemoryField(): void {
  const refGameSection = document.querySelector<HTMLElement>('[game-section]');
  if (refGameSection) refGameSection.outerHTML = getMemoryGameFieldTemplate();
}

/**
 * Renders the quit-game dialog into the page.
 * Replaces the placeholder with the `[quitGameModal-section]` attribute using
 * the quit-game dialog template.
 */
export function renderQuitMemoryDialog(): void {
  const refQuitGameModalSection = document.querySelector<HTMLElement>('[quitGameModal-section]');
  if (refQuitGameModalSection) refQuitGameModalSection.outerHTML = getQuitMemoryGameDialogTemplate();
}