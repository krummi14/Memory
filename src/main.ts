import './styles/style.scss';

/** Initializes the page-specific UI and game behavior for the current route.*/
if (document.body.classList.contains('settings')) void initSettingPage();

/** Loads and initializes the settings-page modules.*/
async function initSettingPage(): Promise<void> {
    const { renderSelectionUnderline, initSettingButtons,  initSettingSections } = await import('./ts/pages/settings');
    renderSelectionUnderline();
    initSettingSections();
    initSettingButtons();
}