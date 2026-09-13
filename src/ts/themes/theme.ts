import { CodingTheme } from '../models/coding_vibes.class';
import { FoodsTheme } from '../models/foods.class';
import type { Theme } from '../models/theme.class';

const themes: Record<string, Theme> = {
    'Code vibes theme': new CodingTheme(),
    'Foods theme': new FoodsTheme(),
};

/** Returns the persisted theme, falling back to the coding theme. */
export function getSelectedTheme(): Theme {
    return themes[localStorage.getItem('selectedTheme') ?? ''] ?? themes['Code vibes theme'];
}