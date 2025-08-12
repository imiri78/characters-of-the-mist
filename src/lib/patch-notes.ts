export interface PatchNote {
  version: string;
  content: string;
}

export const patchNotes: PatchNote[] = [
   {
      version: '1.0.1',
      content: `
### Nothing too exciting here
This is mainly a patch adding a small requested feature I found particularly interesting, and fixing a few UI bugs I dug up.

### ✨ Features
* **Card-specific view-mode**: You can now change a card's view mode from Side-by-Side, Flip, or having it follow your global preferences.

### 🐛 Bugfixes
* Incorrect colors on the tracking button for a card's main tag.
* The tracking button on tags was hard to notice when enabled, fixed with a new icon, and with tag underlining for good measure.
* Some texts weren't properly aligned in the French locale, because of erroneously set alignment properties.
`
   },
   {
      version: '1.0.0',
      content: `
### 🎉 Version 1.0.0 - The Proper Release!
This is the official launch of the new **Characters of the Mist** application! This version is a complete rewrite of the legacy alpha, built from the ground up with a modern, scalable, and privacy-first architecture. All your data is saved directly in your browser, ensuring complete privacy and offline capability.

### ✨ Key Features & Additions
* **The Drawer**: A complete file system for your characters and components. It features full CRUD functionality, nested folders, and robust drag-and-drop for organization.
* **Full Drag & Drop**: A highly requested feature is here! Reorder cards and trackers on your sheet, move items in the Drawer, or load a character by dragging their sheet from the Drawer onto the main play area.
* **Command Palette**: For the power users, press \`Ctrl+K\` to summon a powerful command palette that lets you do almost anything without touching your mouse.
* **Localization**: The application is now available in English and French from day one, with a system in place for community contributions. The entire tutorial is also fully localized.
* **Data Migration Tool**: A built-in tool helps you seamlessly migrate character sheets from the old alpha version of the app to the new format.
* **Interactive Guided Tutorial**: A new guided tour explains all the major features of the application to new users.

### 🔧 Architectural & Quality of Life Improvements
* **Modern Tech Stack**: The app is built with Next.js (App Router), TypeScript, Tailwind CSS, and Shadcn/UI for a fast, reliable, and maintainable codebase.
* **Robust State Management**: State is managed with Zustand, featuring automatic persistence to local storage and a powerful, context-aware Undo/Redo system (\`Ctrl+Z\`) for both the character sheet and the Drawer.
* **Polymorphic Card System**: The data structure is now more flexible, allowing for different types of cards (like Theme Cards and Character Cards) to coexist in a single, reorderable list.
* **Dynamic Layout**: The character sheet is no longer fixed. You can add as many cards and trackers as you need.
* **New UI & Theming**: The interface has been completely redesigned with multiple color themes and a light/dark mode toggle.
`
   }
];