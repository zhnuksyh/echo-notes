# Echo

Echo is a lightweight, aesthetically pleasing, and functional note-taking application built with React, Vite, and Tailwind CSS. It is designed to be simple, fast, and persistent, featuring a "Pure Black" dark mode and Notion-style block editing.

## Features

- **WYSIWYG Editor**: Rich text editing with support for:
  - Headers (H1, H2, H3)
  - Bold, Italic, Strikethrough, Inline Code
  - Lists (Bulleted, Numbered, Toggle, Checkbox)
  - Blockquotes, Code Blocks, Callouts
  - Image embedding and Links
  - Text Colors
- **Instant Persistence**: All notes are automatically saved to `localStorage`, so you never lose your work.
- **Sidebar Navigation**: Manage multiple notes with a collapsible sidebar and search functionality.
- **Responsive Design**: Fully optimized for desktop and mobile devices.
- **Privacy-Focused**: Data stays in your browser's local storage.

## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (via GitHub Actions)

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/zhnuksyh/echo-notes.git
    ```
2.  Install dependencies:
    ```bash
    cd echo-notes
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
