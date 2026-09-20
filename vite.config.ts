import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                settings: 'pages/settings.html',
                memoryGame: 'pages/memory.html',
                gameOver: 'pages/game-over.html',
            },
        },
    },
});