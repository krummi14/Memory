import { getSelectionUnderlineTemplate, getSelectedThemeTemplate, getBoardSizeTemplate, getChoosePlayerTemplate, getThemeTemplate, getStartGameTemplate } from '../templates/settings_template';

/** Maps theme button ids to the feedback icon shown once selected. */
const THEME_ICONS: Record<string, string> = {
    code_vibes_theme: '../assets/img/it_theme.svg',
    foods_theme: '../assets/img/foods_theme.svg',
};

/** Tracks which settings groups have a selection so far. */
const selectionState = {
    theme: false,
    player: false,
    boardSize: false,
};

/** Const-variables */
//const feedback = document.getElementById('settingsFeedback');

/**
 * Renders the settings sections if their placeholders exist on the page.
 */
export function initSettingSections(): void {
    renderSection('[choose-theme]', getThemeTemplate);
    renderSection('[choose-player]', getChoosePlayerTemplate);
    renderSection('[choose-board-size]', getBoardSizeTemplate);
    renderSection('[selected-theme]', getSelectedThemeTemplate);
    renderSection('[start-game]', getStartGameTemplate);
}

/**
 * Registers click handlers for the theme, player, and board size toggle
 * buttons on the settings page.
 */
export function initSettingButtons(): void {
    initButtonGroup('.theme_button', showThemeFeedback);
    initThemePreview();
    initThemeHoverIcon();
    initButtonGroup('.choose_player_button', showSelectedPlayer);
    initButtonGroup('.board_size_button', showSelectedBoardSize);
    initHoverUnderline('.theme_button');
    initHoverUnderline('.choose_player_button');
    initHoverUnderline('.board_size_button');
    restoreSavedSettings();
    initStartGameButton();
}

/** Shows the shared underline while an unselected button is hovered or focused. */
function initHoverUnderline(selector: string): void {
    document.querySelectorAll<HTMLButtonElement>(selector).forEach((button) => {
        button.addEventListener('mouseenter', () => showButtonUnderline(button));
        button.addEventListener('focus', () => showButtonUnderline(button));
        button.addEventListener('mouseleave', () => removeHoverUnderline(button));
        button.addEventListener('blur', () => removeHoverUnderline(button));
    });
}

/**
 * Changes the theme button icon to the active icon while hovering
 * and restores the inactive icon when the pointer leaves.
 * The icon of an already selected theme remains unchanged.
 */
function initThemeHoverIcon(): void {
    document.querySelectorAll<HTMLButtonElement>('.theme_button').forEach((button) => {
        button.addEventListener('mouseenter', () => {
            const icon = button.querySelector<HTMLImageElement>('img');
            if (icon && !button.classList.contains('is-selected')) {
                icon.src = '../assets/icons/mode_standby.svg';
            }
        });
        button.addEventListener('mouseleave', () => {
            const icon = button.querySelector<HTMLImageElement>('img');
            if (icon && !button.classList.contains('is-selected')) {
                icon.src = '../assets/icons/fiber_manual_record.svg';
            }
        });
    });
}

/** Previews theme artwork while a theme button is hovered or focused. */
function initThemePreview(): void {
    const feedback = document.getElementById('settingsFeedback');
    const initialContent = feedback?.innerHTML;
    document.querySelectorAll<HTMLButtonElement>('.theme_button').forEach((button) => {
        button.addEventListener('mouseenter', () => showThemePreview(button));
        button.addEventListener('focus', () => showThemePreview(button));
        button.addEventListener('mouseleave', () => hideThemePreview(button, initialContent));
        button.addEventListener('blur', () => hideThemePreview(button, initialContent));
    });
}

/**
 * Selects the Code Vibes theme as the default theme when the settings page
 * is initialized.
 */
function initDefaultTheme(): void {
    const selectedButton = document.getElementById('code_vibes_theme');
    if (!(selectedButton instanceof HTMLButtonElement)) return;
    const themeButtons = document.querySelectorAll<HTMLButtonElement>('.theme_button');
    handleButtonClick(selectedButton, themeButtons);
    showThemeFeedback(selectedButton);
}

/**
 * Replaces the underline placeholder with its rendered markup,
 * if the placeholder exists on the page.
 */
export function renderSelectionUnderline(): void {
    const refUnderline = document.querySelector<HTMLElement>('[selection-underline]');
    if (refUnderline) {
        refUnderline.outerHTML = getSelectionUnderlineTemplate();
    }
}

/**
 * Replaces a section placeholder with its rendered template markup, if the
 * placeholder exists on the page.
 * @param selector The CSS selector matching the placeholder element.
 * @param template A function returning the markup to render in its place.
 */
function renderSection(selector: string, template: () => string): void {
    const section = document.querySelector<HTMLElement>(selector);
    if (section) section.outerHTML = template();
}

/** Removes a preview underline unless the button remains selected. */
function removeHoverUnderline(button: HTMLButtonElement): void {
    if (!button.classList.contains('is-selected')) button.querySelector('.underline')?.remove();
}

/**
 * Restores previously saved game settings from local storage.
 * If no theme has been saved, the default Code Vibes theme is selected.
 * Previously saved player and board size settings are restored when available.
 */
function restoreSavedSettings(): void {
    const savedTheme = localStorage.getItem('selectedTheme');
    const savedPlayer = localStorage.getItem('selectedPlayer');
    const savedBoardSize = localStorage.getItem('selectedBoardSize');
    if (savedTheme) {
        restoreSavedTheme();
    } else {
        initDefaultTheme();
    }
    if (savedPlayer) {
        restoreSavedPlayer();
    }
    if (savedBoardSize) {
        restoreSavedBoardSize();
    }
}

/**
 * Restores the previously selected game theme from local storage.
 * Finds the corresponding theme button and applies its selected state
 * and theme feedback.
 */
function restoreSavedTheme(): void {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (!savedTheme) return;
    const themeButtons = document.querySelectorAll<HTMLButtonElement>('.theme_button');
    const selectedButton = Array.from(themeButtons).find((button) => getButtonLabel(button) == savedTheme);
    if (!selectedButton) return;
    handleButtonClick(selectedButton, themeButtons);
    showThemeFeedback(selectedButton);
}

/**
 * Restores the previously selected player from local storage.
 * Finds the corresponding player button and applies its selected state
 * and player feedback.
 */
function restoreSavedPlayer(): void {
    const savedPlayer = localStorage.getItem('selectedPlayer');
    if (!savedPlayer) return;
    const playerButtons = document.querySelectorAll<HTMLButtonElement>('.choose_player_button');
    const selectedButton = Array.from(playerButtons).find((button) => `Player ${getButtonLabel(button)}` == savedPlayer);
    if (!selectedButton) return;
    handleButtonClick(selectedButton, playerButtons);
    showSelectedPlayer(selectedButton);
}

/**
 * Restores the previously selected board size from local storage.
 * Finds the corresponding board size button and applies its selected state
 * and board size feedback.
 */
function restoreSavedBoardSize(): void {
    const savedBoardSize = localStorage.getItem('selectedBoardSize');
    if (!savedBoardSize) return;
    const boardButtons = document.querySelectorAll<HTMLButtonElement>('.board_size_button');
    const selectedButton = Array.from(boardButtons).find((button) => getButtonLabel(button) == savedBoardSize);
    if (!selectedButton) return;
    handleButtonClick(selectedButton, boardButtons);
    showSelectedBoardSize(selectedButton);
}

/**
 * Displays a preview of the hovered theme in the settings feedback section.
 * @param button The theme button currently being hovered.
 */
function showThemePreview(button: HTMLButtonElement): void {
    renderThemePreview(button);
}

/**
 * Restores the currently selected theme preview after leaving a theme button.
 * @param initialContent The original feedback content shown before the preview.
 */
function hideThemePreview(
    button: HTMLButtonElement,
    initialContent: string | undefined
): void {
    restoreThemePreview(initialContent);
}

/** Renders a theme's artwork in the settings feedback area. */
function renderThemePreview(button: HTMLButtonElement): void {
    const feedback = document.getElementById('settingsFeedback');
    const icon = THEME_ICONS[button.id];
    if (feedback && icon) {
        feedback.innerHTML = `
            <img class="settings_feedback_image" src="${icon}" alt="${getButtonLabel(button)}">`;
    }
}

/** Restores the selected theme artwork or the initial settings prompt. */
function restoreThemePreview(initialContent: string | undefined): void {
    const feedback = document.getElementById('settingsFeedback');
    const selectedTheme = document.querySelector<HTMLButtonElement>('.theme_button.is-selected');
    if (selectedTheme) return renderThemePreview(selectedTheme);
    if (feedback && initialContent) feedback.innerHTML = initialContent;
}

/**
 * Registers a click handler on the start game button so that it navigates
 * to the memory game page.
 */
function initStartGameButton(): void {
    const startGameButton = document.getElementById('startGameButton');
    startGameButton?.addEventListener('click', () => {
        window.location.href = '/pages/memory.html';
    });
}

/**
 * Registers click handlers for one group of toggle buttons so that selecting
 * a button updates the icons within that same group only.
 * @param selector The CSS selector matching the button group.
 * @param onSelect Optional callback invoked with the selected button.
 */
function initButtonGroup(selector: string, onSelect?: (button: HTMLButtonElement) => void): void {
    const buttons = document.querySelectorAll<HTMLButtonElement>(selector);
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            handleButtonClick(button, buttons);
            onSelect?.(button);
        });
    });
}

/**
 * Displays the selected theme artwork in the settings feedback section
 * and updates the selected theme label.
 * @param button The selected theme button.
 */
function showThemeFeedback(button: HTMLButtonElement): void {
    const selectedTheme = document.getElementById('selectedGameTheme');
    const label = getButtonLabel(button);
    renderThemePreview(button);
    setSelectedSetting(selectedTheme, label);
    highlightDivider('themePlayerDivider');
    selectionState.theme = true;
    updateStartButtonVisibility();
    localStorage.setItem('selectedTheme', label);
}

/**
 * Displays the selected player label inside the start section.
 * @param button The selected player button.
 */
function showSelectedPlayer(button: HTMLButtonElement): void {
    const selectedPlayer = document.getElementById('selectedPlayer');
    const playerLabel = 'Player ' + getButtonLabel(button);
    setSelectedSetting(selectedPlayer, playerLabel);
    highlightDivider('playerBoardDivider');
    selectionState.player = true;
    updateStartButtonVisibility();
    localStorage.setItem('selectedPlayer', playerLabel);
}

/**
 * Displays the selected board size label inside the start section.
 * @param button The selected board size button.
 */
function showSelectedBoardSize(button: HTMLButtonElement): void {
    const selectedBoardSize = document.getElementById('selectedBoardSize');
    const boardSizeLabel = getButtonLabel(button);
    setSelectedSetting(selectedBoardSize, boardSizeLabel);
    selectionState.boardSize = true;
    updateStartButtonVisibility();
    localStorage.setItem('selectedBoardSize', boardSizeLabel);
}

/**
 * Shows the active start button only once all settings have been selected.
 */
function updateStartButtonVisibility(): void {
    const startDefaultItem = document.getElementById('startDefaultItem');
    const startGameButton = document.getElementById('startGameButton');
    const allSelected = selectionState.theme && selectionState.player && selectionState.boardSize;
    if (startDefaultItem) {
        startDefaultItem.hidden = allSelected;
    }
    if (startGameButton instanceof HTMLButtonElement) {
        startGameButton.hidden = !allSelected;
        startGameButton.disabled = !allSelected;
    }
}

/**
 * Returns the button label from its data-label attribute.
 * @param button The button whose label should be read.
 * @returns The button label or an empty string.
 */
function getButtonLabel(button: HTMLButtonElement): string {
    return button.getAttribute('data-label') || '';
}

/** Updates one selected-setting label and emphasizes it visually. */
function setSelectedSetting(element: HTMLElement | null, label: string): void {
    if (element) {
        element.textContent = label;
        element.style.fontWeight = '400';
    }
}

/**
 * Highlights a start section divider after a selection has been made.
 * @param dividerId The id of the divider to highlight.
 */
function highlightDivider(dividerId: string): void {
    const divider = document.getElementById(dividerId);
    if (divider) {
        divider.classList.add('is_active');
    }
}

/**
 * Shows the selection underline in a button if it is not already present.
 * @param button The selected button.
 */
function showButtonUnderline(button: HTMLButtonElement): void {
    if (!button.querySelector('.underline')) {
        button.insertAdjacentHTML('beforeend', getSelectionUnderlineTemplate());
    }
}

/**
 * Applies the active icon to the selected button and the inactive icon to
 * every other button in the same button group.
 * @param selected The button that was clicked.
 * @param buttons All buttons within the same group.
 */
function handleButtonClick(selected: HTMLButtonElement, buttons: NodeListOf<HTMLButtonElement>): void {
    buttons.forEach((button) => {
        const isSelected = button == selected;
        const icon = button.querySelector('img');
        if (icon) icon.src = isSelected ? '../assets/icons/mode_standby.svg' : '../assets/icons/fiber_manual_record.svg';
        button.classList.toggle('is-selected', isSelected);
        if (isSelected) {
            showButtonUnderline(button);
        } else {
            button.querySelector('.underline')?.remove();
        }
    });
}