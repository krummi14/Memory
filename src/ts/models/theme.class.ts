export type PlayerColor = 'blue' | 'orange';

/**
 * Defines the shared asset contract and optional presentation settings for a game theme.
 * Concrete theme classes populate the required card and player assets, then
 * optionally override visual behavior for game cards and dialogs.
 */
export class Theme {
  cardFaceImage!: string;
  cardImages!: string[];
  playerImages!: Record<PlayerColor, string>;
  cardImageMaxSize?: number;
  cardBorderRadius?: number;
  quitDialogBackButtonLabel?: string;
  quitDialogExitButtonLabel?: string;
  winnerDialogBackButtonLabel?: string;
  winnerImage?: string;
  showWinnerConfetti?: boolean;
  usedTheme?: string;
  exitButtonIcon!: string;
  currentPlayerImages!: Record<PlayerColor, string>;
  currentPlayerBackgroundColors!: Record<PlayerColor, string>;
  drawImage?: string;
  drawColor?: string;
  winnerColor?: string;

  /**
   * Returns the player-label image path for a specific player.
   * @param player - The player whose label image is requested.
   * @returns The configured player-label image path.
   */
  getsPlayerImage(player: PlayerColor): string {
    return this.playerImages[player];
  }

  /**
   * Returns a card image for a board position, cycling when needed.
   * @param index - Zero-based board position for which an image is needed.
   * @returns The matching configured card image path.
   */
  getCardImage(index: number): string {
    return this.cardImages[index % this.cardImages.length];
  }
}