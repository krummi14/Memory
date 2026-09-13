/** Returns the header for the memory game. */
export function getMemoryGameHeaderTemplate(): string {
  return `
      <header class="memory_game_header">
        <section class="score_board">
          <div class="blue_player">
            <img id="bluePlayerImg" src="" alt="">
            <span id="blueCodingLabel"></span>
            <span class="blue_player_score_counter">0</span>
          </div>
        
          <div class="orange_player">
            <img id="orangePlayerImg" src="" alt="orange player label">
            <span id="orangeCodingLabel"></span>
            <span class="orange_player_score_counter">0</span>
          </div>
        </section>

        <section class="current_player"> Current player:
          <span id="currentPlayerWrapper">
            <img id="currentPlayer" src="../assets/icons/chess_pawn_white.svg" alt="current player label">
          </span>
        </section>

        <button class="exit_button" type="button">
          <img id="exitGameIcon" class="exit_icon exit_icon--orange" src="" alt="exit icon">
          <img class="exit_icon exit_icon--white" src="../assets/icons/move_item.svg" alt=""> Exit game
        </button>
      </header>
`;
}

/** Returns the markup for one face-down memory card. */
export function getCardTemplate(): string {
  return `
      <button class="card" type="button">
        <section class="card__inner">
          <div class="card__face"></div>
          <div class="card__face card__face--back"></div>
        </section>
      </button>
`;
}

/** Returns the confirmation dialog shown before leaving a game. */
export function getQuitMemoryGameDialogTemplate(): string {
  return `
      <dialog id="quitGameModal">
        <h4>Are you sure you want to quit <br> the game?</h4>
        <div class="modal_buttons">
          <button id="quitGameModal_backToGame_button">Back to game</button>
          <button id="quitGameModal_exitGame_button">Exit game</button>
        </div>
      </dialog>
`;
}

/** Returns the container markup for the rendered game board. */
export function getMemoryGameFieldTemplate(): string {
  return `
      <section class="memory_game_board">
        <div id="field">
        </div>
      </section>
`;
}