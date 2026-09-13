import { Theme } from './theme.class';

/**
 * Provides assets and presentation settings for the gaming theme.
 * In addition to its asset paths, this theme overrides optional base settings
 * used by the card layout, dialogs, winner feedback, and typography.
 */
export class FoodsTheme extends Theme {
	/**
	 * Creates the gaming theme with its visual assets and UI-specific settings.
	 * It configures the gaming card assets, player labels, compact card layout,
	 * dialog labels, winner image, and Orbitron font.
	 */
	constructor() {
		super();
		this.cardFaceImage = '../assets/img/food_card_face.svg';
		this.cardImages = getCardImages();
		this.playerImages = {
			blue: '../assets/icons/chess_pawn_blue.svg',
			orange: '../assets/icons/chess_pawn_orange.svg',
		};
		this.cardImageMaxSize = 100;
		this.cardBorderRadius = 12;
		this.quitDialogBackButtonLabel = 'NO, BACK TO GAME';
		this.quitDialogExitButtonLabel = 'EXIT GAME';
		this.usedTheme = 'FoodsTheme';
		this.exitButtonIcon = '../assets/icons/move_item_orange.svg';
		this.currentPlayerImages = {
			blue: '../assets/icons/chess_pawn_white.svg',
			orange: '../assets/icons/chess_pawn_white.svg',
		};
		this.currentPlayerBackgroundColors = {
			blue: 'rgba(9, 127, 197, 1)',
			orange: 'rgba(234, 105, 0, 1)',
		};
	}
}

/**
 * Creates the ordered list of gaming-theme card image paths.
 * @returns The 18 available gaming card image paths, numbered with leading zeros.
 */
function getCardImages(): string[] {
	return Array.from({ length: 18 }, (_, index) => {
		const number = String(index + 1).padStart(2, '0');
		return `../assets/img/theme/foods/${number}.svg`;
	});
}