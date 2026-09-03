import './styles/style.scss';

/** Initializes the page-specific UI and game behavior for the current route. */
if (document.body.classList.contains('settings')) void initSettingsPage();

/** Loads and initializes the settings-page modules. */
async function initSettingsPage(): Promise<void> {
    const { renderCustomUnderline, initSettingsButtons, initSettingsSection } = await import('./ts/pages/settings');
    renderCustomUnderline();
    initSettingsSection();
    initSettingsButtons();
}

/*
init();

function init() {
    const fieldRef = document.getElementById('field');
    if (fieldRef) {
        fieldRef.addEventListener('click', e => {
            const card = (e.target as HTMLElement).closest('.card') as HTMLButtonElement;
            if (card) {
                card.classList.toggle('is_flipped');
            }
        })
    }
}*/