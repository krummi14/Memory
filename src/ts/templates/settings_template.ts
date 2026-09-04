/** Returns the markup for the selection underline used by controls. */
export function getSelectionUnderlineTemplate(): string {
  return `
    <div class="underline">
      <div class="underline_square"></div>
      <div class="underline_line"></div>
    </div>
`;
}

/**
 * Returns the markup for the game theme selection section on the settings page.
 * @returns The HTML string for the game theme section.
 */
export function getThemeSectionTemplate(): string {
  return `
      <section class="game_mode">
        <header class="game_mode_header">
          <img src="../assets/icons/palette.svg" alt="Palette Icon" class="game_mode_header_icon">
          <h3>Game themes</h3>
        </header>

        <div class="button_selection">
          <button class="theme_button" id="code_vibes_theme" data-label="Code vibes theme">
            <img src="../assets/icons/fiber_manual_record.svg" alt="Off Icon">
            Code vibes theme
          </button>
          <button class="theme_button" id="gaming_theme" data-label="Gaming theme">
            <img src="../assets/icons/fiber_manual_record.svg" alt="Off Icon">
            Gaming theme
          </button>
        </div>

      </section>
`;
}

/**
 * Returns the markup for the player selection section on the settings page.
 * @returns The HTML string for the choose player section.
 */
export function getChoosePlayerSectionTemplate(): string {
  return `
      <section class="choose_player">
        <header class="choose_player_header">
          <img src="../assets/icons/chess_pawn.svg" alt="Chess Pawn Icon" class="game_mode_header_icon">
          <h3>Choose player</h3>
        </header>

        <div class="button_selection">
          <button class="choose_player_button" id="playerBlue" data-label="blue">
            <img src="../assets/icons/fiber_manual_record.svg" alt="Off Icon">
            Blue
          </button>
          <button class="choose_player_button" id="playerOrange" data-label="orange">
            <img src="../assets/icons/fiber_manual_record.svg" alt="Off Icon">
            Orange
          </button>
        </div>

      </section>
`;
}

/**
 * Returns the markup for the board size selection section on the settings page.
 * @returns The HTML string for the board size section.
 */
export function getBoardSizeSectionTemplate(): string {
  return `
      <section class="board_size">
        <header class="board_size_header">
          <img src="../assets/icons/style.svg" alt="Size Icon" class="board_size_header_icon">
          <h3>Board size</h3>
        </header>

        <div class="button_selection">
          <button class="board_size_button" id="board_4x4" data-label="4x4">
            <img src="../assets/icons/fiber_manual_record.svg" alt="Off Icon">
            16 cards
          </button>
          <button class="board_size_button" id="board_4x6" data-label="6x4">
            <img src="../assets/icons/fiber_manual_record.svg" alt="Off Icon">
            24 cards
          </button>
          <button class="board_size_button" id="board_6x6" data-label="6x6">
            <img src="../assets/icons/fiber_manual_record.svg" alt="Off Icon">
            36 cards
          </button>
        </div>
    
      </section>
`;
}

/**
 * Returns the feedback markup shown until all required settings are selected.
 * @returns The HTML string for the settings feedback section.
 */
export function getSelectedThemeSectionTemplate(): string {
  return `
      <section class="settings_feedback" id="settingsFeedback">
        <h3>Please <br>
            choose a theme,<br>
            player, and board size <br>
            to start the game.
        </h3>
      </section>
`;
}

/**
 * Returns the selected-settings summary and start control markup.
 * @returns The HTML string for the start-game section.
 */
export function getStartGameSectionTemplate(): string {
  return `
      <section class="start_game">

        <div class="start_game_feedback">
          <div id="selectedGameTheme">Game theme</div>
        </div>

        <div class="start_game_slash" id="themePlayerDivider"></div>

        <div class="start_game_feedback">
          <div id="selectedPlayer">Player</div>
        </div>

        <div class="start_game_slash" id="playerBoardDivider"></div>

        <div class="start_game_feedback">
          <div id="selectedBoardSize">Board size</div>
        </div>

        <img id="startDefaultIcon" src="../assets/icons/start_disabled.svg" alt="Start Disabled Img">

        <button id="startGameButton" class="startGameButton" hidden>
            <img src="../assets/icons/start_button.svg" alt="Start Game Img">
        </button>

      </section>
`;
}