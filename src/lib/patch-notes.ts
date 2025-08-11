export interface PatchNote {
  version: string;
  content: string;
}

export const patchNotes: PatchNote[] = [
   {
      version: '1.1.0',
      content: `
#### ✨ New Features
* **Browsable Patch Notes**: You're looking at it! The app now keeps a history of all updates, and you can view them at any time from the sidebar.
* **Data Migration Hooks**: The version check system allows for future data harmonization if the structure of character data changes.

#### 🐛 Bug Fixes & QOL
* Fixed a bug where settings were not saved to storage on first launch.
* Improved styling in the Info Dialog to correctly render lists and headings.
* Resolved a bug with the drag-and-drop collision logic for drawer items.
`
   },
   {
      version: '1.0.0',
      content: `
#### 🎉 Initial Release!
* Welcome to the new and improved Characters of the Mist application.
* Built from the ground up with Next.js, TypeScript, and Tailwind CSS.
* Features a fully dynamic character sheet, a powerful drawer system, and a modern, responsive design.
`
   }
];