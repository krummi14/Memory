import './styles/style.scss';

/** Initializes the page-specific UI and game behavior for the current route.*/
if (document.body.classList.contains('settings')) void initSettingPage();
if (document.body.classList.contains('memory_game_body')) void initMemoryGamePage();

/** Loads and initializes the settings-page modules.*/
async function initSettingPage(): Promise<void> {
    const { renderSelectionUnderline, initSettingButtons, initSettingSections } = await import('./ts/pages/settings');
    renderSelectionUnderline();
    initSettingSections();
    initSettingButtons();
}

/** Loads and initializes the interactive memory-game modules. */
async function initMemoryGamePage(): Promise<void> {
    const [game, themeSelection, themeRenderer, gameModel, dialogs] = await Promise.all([
        import('./ts/pages/memory'),
        import('./ts/themes/theme'),
        import('./ts/themes/used_theme'),
        import('./ts/models/memory.class'),
        import('./ts/components/dialog'),
    ]);

    game.renderMemoryHeader();
    game.renderMemoryField();
    game.renderMemoryBoard();
    game.renderQuitMemoryDialog();
    dialogs.initQuitGameModal();
    const theme = themeSelection.getSelectedTheme();
    themeRenderer.applyTheme(theme);
    gameModel.startGame(theme);
}