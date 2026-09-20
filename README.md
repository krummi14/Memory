<div align="center">

# 🧠 Memory Game

A themed two-player memory game built with **TypeScript, HTML and SCSS**.

<p>
  <a href="https://github.com/krummi14/Memory">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository">
  </a>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/SCSS-CF649A?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
</p>

</div>

---

## 📖 About

This project is a classic memory game designed for two players.

Players take turns revealing cards and trying to find matching pairs. Each successful match increases the player's score. Once all pairs have been found, the player with the highest score wins.

The game also includes different visual themes that change the appearance and behavior of the game.

---

## 🎮 How to Play

1. Start a new game.
2. Two players take turns revealing two cards.
3. If the cards match, the player scores a point.
4. If the cards do not match, the cards are turned back over.
5. The next player takes their turn.
6. The game ends when all pairs have been found.
7. The player with the highest score wins.

If both players have the same score, the game ends in a draw.

---

## ✨ Features

<ul>
  <li>🧠 Classic memory card matching gameplay</li>
  <li>👥 Two-player game</li>
  <li>🔵 Blue and 🟠 Orange player colors</li>
  <li>📊 Live score tracking</li>
  <li>🏆 Automatic winner detection</li>
  <li>🤝 Draw detection</li>
  <li>🎨 Multiple visual themes</li>
  <li>🃏 Theme-specific card designs</li>
  <li>🖼️ Theme-specific player and winner images</li>
  <li>🎉 Winner confetti effects</li>
  <li>✨ Animated winner dialog</li>
  <li>📱 Responsive interface</li>
</ul>

---

## 🎨 Themes

The game uses a theme-based architecture.

Each theme can define its own visual assets and presentation settings, including:

<ul>
  <li>Card images</li>
  <li>Player images</li>
  <li>Winner images</li>
  <li>Winner colors</li>
  <li>Draw colors</li>
  <li>Draw images</li>
  <li>Confetti behavior</li>
  <li>Player background colors</li>
  <li>Theme-specific UI elements</li>
</ul>

The theme system is designed so that new themes can be added without changing the core game logic.

---

## 🏆 Winner Screen

At the end of the game, the winner is automatically determined based on the final score.

The winner screen displays:

<ul>
  <li>The winner's name</li>
  <li>The winner's image</li>
  <li>The appropriate player or theme color</li>
  <li>Optional confetti animation</li>
</ul>

If both players have the same score, a dedicated draw screen is displayed instead.

---

## 🛠️ Technologies

<div align="center">

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure and markup |
| **SCSS** | Styling and responsive layout |
| **TypeScript** | Game logic and DOM interaction |
| **Git** | Version control |
| **GitHub** | Repository and project management |

</div>

---

## 📁 Project Structure

```text
Memory/
│
├── pages/
│   └── ...
│
├── public/
│   └── assets/
│       ├── icons/
│       ├── img/
│       └── ...
│
├── src/
│   ├── ...
│   └── ...
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md