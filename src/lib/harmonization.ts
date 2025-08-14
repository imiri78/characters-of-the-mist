'use client';

import { APP_VERSION } from "./config";
import { compare } from 'semver';
import { GeneralItemType, Drawer, DrawerItem, Folder } from './types/drawer';
import { Character } from './types/character';



type MigrationFunction = (data: any) => any;

const MIGRATIONS: Record<string, Partial<Record<GeneralItemType, MigrationFunction>>> = {
   '1.0.2': {
      FULL_CHARACTER_SHEET: (data: Character) => {
         if (data && data.trackers && !data.trackers.storyThemes) {
         data.trackers.storyThemes = [];
         }
         return data;
      },
   },
};

const MIGRATION_VERSIONS = Object.keys(MIGRATIONS).sort(compare);



export function harmonizeData<T extends object>(data: T, dataType: GeneralItemType): T {
   if (!data || typeof data !== 'object') {
      return data;
   }

   // --- STEP 1: Harmonize the current object based on its specific type ---
   // Check if the object itself is a type that can be versioned (top-level containers and sheets)
   if ('version' in data || dataType === 'FULL_CHARACTER_SHEET' || dataType === 'FULL_DRAWER') {
      let currentVersion = (data as any).version || '1.0.0';

      for (const targetVersion of MIGRATION_VERSIONS) {
         if (compare(targetVersion, currentVersion) > 0) {
            const versionMigrations = MIGRATIONS[targetVersion];
            const migrate = versionMigrations[dataType];

            if (migrate) {
               data = migrate(data);
            }

            (data as any).version = targetVersion;
            currentVersion = targetVersion;
         }
      }

      if (!(data as any).version || compare(APP_VERSION, (data as any).version) > 0) {
         (data as any).version = APP_VERSION;
      }
   }

   // --- STEP 2: Check for container properties and RECURSE ---
   // Drawer. Recurse on its contents.
   if (dataType === 'FULL_DRAWER') {
      const drawer = data as any as Drawer;
      drawer.rootItems = drawer.rootItems.map(item => harmonizeData(item, 'FOLDER'));
      drawer.folders = drawer.folders.map(folder => harmonizeData(folder, 'FOLDER'));
   }

   // Folder. Recurse on its contents.
   if (dataType === 'FOLDER') {
      const folder = data as any as Folder;
      folder.items = folder.items.map(item => harmonizeData(item, 'FOLDER'));
      folder.folders = folder.folders.map(subFolder => harmonizeData(subFolder, 'FOLDER'));
   }

   // DrawerItem. Grab its content and harmonize that.
   if ('content' in data && 'type' in data) {
      const item = data as any as DrawerItem;
      item.content = harmonizeData(item.content, item.type);
   }

   return data;
}