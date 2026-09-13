import type { PlayerColor, Theme } from '../models/theme.class';
import { Card } from '../models/card.class';
import { ScoreManager } from '../components/score_board';

/**
 * Manages the state and flow of a memory game.
 * The Memory class handles card selection and comparison, player turns,
 * score updates, and game completion for a rendered game board.
 */
class Memory {
  private readonly cards = new WeakMap<HTMLButtonElement, Card>();
  private readonly scoreManager = new ScoreManager();
  private selectedCards: Card[] = [];
  private isComparing = false;
  private blueScore = 0;
  private orangeScore = 0;
  private currentPlayer: PlayerColor;

  /**
   * Creates a game controller for a rendered board and selected theme.
   * @param field - The element containing all selectable card buttons.
   * @param theme - The selected theme that supplies display assets.
   */
  constructor(
    private readonly field: HTMLElement,
    private readonly theme: Theme,
  ) {
    this.currentPlayer = getStartingPlayer();
  }

  /**
   * Starts a new memory game.
   * Resets the scores, displays the starting player, and registers
   * the card click handler on the game board.
   */
  started(): void {
    this.resetScores();
    this.updateCurrentPlayer();
    this.field.addEventListener('click', this.handlesCardClick);
  }

  /**
   * Handles delegated click events from the game board.
   * Ignores clicks on unavailable cards and selects valid cards
   * for the current turn.
   * @param event - The click event originating from the game board.
   */
  private readonly handlesCardClick = (event: MouseEvent): void => {
    const element = (event.target as HTMLElement).closest<HTMLButtonElement>('.card');
    if (!element) return;
    const card = this.getCard(element);
    if (card.isMatched || card.isFlipped || this.isComparing) return;
    this.selectCard(card);
  };

  /**
   * Reveals a selected card and compares it after a pair has been selected.
   * @param card - The card selected by the active player.
   */
  private selectCard(card: Card): void {
    card.flipped();
    this.selectedCards.push(card);
    if (this.selectedCards.length < 2) return;
    this.isComparing = true;
    this.compareSelectedCards();
  }

  /**
   * Compares the two currently selected cards after a short delay.
   * Matching pairs are handled sooner than non-matching pairs.
   */
  private compareSelectedCards(): void {
    const [firstCard, secondCard] = this.selectedCards;
    const isMatch = firstCard.image == secondCard.image;
    window.setTimeout(isMatch ? this.handlesMatch : this.handlesMissed, isMatch ? 400 : 800);
  }

  /**
  * Handles a matching pair.
  * Marks both cards as matched, awards a point to the active player,
  * and redirects to the game-over page when all pairs have been found.
  */
  private readonly handlesMatch = (): void => {
    this.selectedCards.forEach((card) => card.matched());
    this.addPoint();
    this.finishingCurrentSelection();
    if (this.isComplete()) window.location.href = './game-over.html';
  };

  /**
   * Handles a non-matching pair.
   * Resets both cards and switches the turn to the other player.
   */
  private readonly handlesMissed = (): void => {
    this.selectedCards.forEach((card) => card.resetted());
    this.currentPlayer = this.currentPlayer == 'blue' ? 'orange' : 'blue';
    this.finishingCurrentSelection();
  };

  /** Clears the current card selection and updates the active player display. */
  private finishingCurrentSelection(): void {
    this.selectedCards = [];
    this.isComparing = false;
    this.updateCurrentPlayer();
  }

  /**
   * Returns the cached card state or creates it from a card element.
   * @param element - The card button for which state is required.
   * @returns The state object associated with the card button.
   */
  private getCard(element: HTMLButtonElement): Card {
    const existingCard = this.cards.get(element);
    if (existingCard) return existingCard;
    const image = element.querySelector('.card__face--back')?.getAttribute('data-card-image') ?? null;
    const card = new Card(element, image);
    this.cards.set(element, card);
    return card;
  }

  /** Awards one point to the active player and persists the updated scores. */
  private addPoint(): void {
    if (this.currentPlayer == 'blue') this.blueScore += 1;
    else this.orangeScore += 1;
    this.updateScores();
  }

  /** Resets the in-memory and persisted scores before a new game starts. */
  private resetScores(): void {
    this.blueScore = 0;
    this.orangeScore = 0;
    this.scoreManager.resetted();
  }

  /** Renders and persists the current in-memory scores. */
  private updateScores(): void {
    this.scoreManager.update({
      blueScore: this.blueScore,
      orangeScore: this.orangeScore,
    });
  }

  /** Updates the active-player image using the selected theme. */
  private updateCurrentPlayer(): void {
    const playerImage = document.getElementById('currentPlayer');
    const playerWrapper = document.getElementById('currentPlayerWrapper');
    playerImage?.setAttribute('src', this.theme.currentPlayerImages[this.currentPlayer]);
    if (playerWrapper) {
      playerWrapper.style.backgroundColor =
        this.theme.currentPlayerBackgroundColors[this.currentPlayer];
    }
  }

  /**
   * Determines whether every rendered card belongs to a matched pair.
   * @returns `true` when no unmatched card buttons remain on the board.
   */
  private isComplete(): boolean {
    return this.field.querySelectorAll('.card').length == this.field.querySelectorAll('.card.is-matched').length;
  }
}

/**
 * Gets the starting player selected on the settings page.
 * Legacy labels such as `Player orange` are accepted, and blue is used when no
 * valid orange selection is stored.
 * @returns The player color that begins the game.
 */
function getStartingPlayer(): PlayerColor {
  const selectedPlayer = localStorage.getItem('selectedPlayer') ?? 'Blue player';
  return selectedPlayer.toLowerCase().includes('orange') ? 'orange' : 'blue';
}

/**
 * Starts a new game on the rendered board with the selected theme.
 * The game is only created when the game board exists on the current page.
 * @param theme - The selected theme that supplies game assets and settings.
 */
export function startGame(theme: Theme): void {
  const field = document.getElementById('field');
  if (field) new Memory(field, theme).started();
}