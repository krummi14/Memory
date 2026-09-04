import './styles/style.scss';

/** Initializes the page-specific UI and game behavior for the current route.*/
if (document.body.classList.contains('settings')) void initSettingsPage();

/** Loads and initializes the settings-page modules.*/
async function initSettingsPage(): Promise<void> {
    const { renderSelectionUnderline, initSettingsButtons, initSettingsSection } = await import('./ts/pages/settings');
    renderSelectionUnderline();
    initSettingsSection();
    initSettingsButtons();
}