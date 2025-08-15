// -- Other Library Imports --
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { temporal } from 'zundo';
import cuid from 'cuid';

// -- Utils Imports --
import { addFolderRecursively, addItemRecursively, deepReId, deleteFolderRecursively, deleteItemRecursively, findAndRemoveFolder, findAndRemoveItem, mergeIntoFolderRecursively, renameFolderRecursively, renameItemRecursively, reorderFoldersRecursively, reorderItemsRecursively, reorderList } from '../utils/drawer';

// -- Store and Hook Imports --
import { useAppGeneralStateStore } from './appGeneralStateStore';

// -- Type Imports --
import { Drawer, Folder, DrawerItem, DrawerItemContent, GeneralItemType, GameSystem } from '@/lib/types/drawer';
import { harmonizeData } from '../harmonization';



export interface PendingDrawerItem {
    game: GameSystem;
    type: GeneralItemType;
    content: DrawerItemContent;
    parentFolderId?: string;
    defaultName: string;
}



export interface DrawerState {
   drawer: Drawer;
   pendingItem: PendingDrawerItem | null;
   actions: {
      // --- Drawer Actions ---
      importFullDrawer: (newDrawer: Drawer, parentFolderId?: string) => void;
      // --- Folder Actions ---
      addFolder: (name: string, parentFolderId?: string) => void;
      addImportedFolder: (folder: Folder, parentFolderId?: string) => void;
      renameFolder: (folderId: string, newName: string) => void;
      deleteFolder: (folderId: string) => void;
      moveFolder: (folderId: string, destinationFolderId?: string) => void;
      reorderFolders: (parentFolderId: string | null, oldIndex: number, newIndex: number) => void;
      // --- Item Actions ---
      addItem: (name: string, game: GameSystem, type: GeneralItemType, content: DrawerItemContent, parentFolderId?: string) => void;
      addImportedItem: (itemContent: DrawerItemContent, itemType: GeneralItemType, game: GameSystem, parentFolderId?: string) => void;
      renameItem: (itemId: string, newName: string) => void;
      deleteItem: (itemId: string) => void;
      moveItem: (itemId: string, destinationFolderId?: string) => void;
      reorderItems: (parentFolderId: string | null, oldIndex: number, newIndex: number) => void;
      // --- Drop Actions ---
      initiateItemDrop: (itemInfo: PendingDrawerItem) => void;
      clearPendingItemDrop: () => void;
   };
}

const initialState: Pick<DrawerState, 'drawer' | 'pendingItem'> = {
   drawer: {
      folders: [],
      rootItems: [],
   },
   pendingItem: null,
};



export const useDrawerStore = create<DrawerState>()(
   temporal(
      persist(
         (set) => ({
            ...initialState,
            actions: {
               // --- Drawer Actions ---
               importFullDrawer: (newDrawer, parentFolderId) => {
                  set(state => {
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');
                     const reIddDrawer = deepReId(newDrawer);

                     if (!parentFolderId) {
                        const mergedFolders = [...state.drawer.folders, ...reIddDrawer.folders];
                        const mergedRootItems = [...state.drawer.rootItems, ...reIddDrawer.rootItems];
                        return {
                           drawer: {
                              ...state.drawer,
                              folders: mergedFolders,
                              rootItems: mergedRootItems,
                           }
                        };
                     } else {
                        const updatedFolders = mergeIntoFolderRecursively(
                           state.drawer.folders,
                           parentFolderId,
                           reIddDrawer.folders,
                           reIddDrawer.rootItems
                        );
                        return { drawer: { ...state.drawer, folders: updatedFolders } };
                     }
                  });
               },
               // --- Folder Actions ---
               addFolder: (name, parentFolderId) => {
                  set(state => {
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');
                     const newFolder: Folder = { id: cuid(), name, items: [], folders: [] };
                     
                     if (!parentFolderId) {
                        return {
                           drawer: {
                              ...state.drawer,
                              folders: [...state.drawer.folders, newFolder],
                           }
                        };
                     } else {
                        const newFolders = addFolderRecursively(state.drawer.folders, newFolder, parentFolderId);
                        return {
                           drawer: {
                              ...state.drawer,
                              folders: newFolders,
                           }
                        };
                     }
                  });
               },
               addImportedFolder: (folder, parentFolderId) => {
                  set(state => {
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');
                     const newFolder = deepReId(folder);

                     if (!parentFolderId) {
                        return {
                           drawer: {
                              ...state.drawer,
                              folders: [...state.drawer.folders, newFolder],
                           }
                        };
                     } else {
                        const newFolders = addFolderRecursively(state.drawer.folders, newFolder, parentFolderId);
                        return {
                           drawer: {
                              ...state.drawer,
                              folders: newFolders,
                           }
                        };
                     }
                  });
               },
               renameFolder: (folderId, newName) => {
                  set(state => {
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');
                     return {
                        drawer: {
                           ...state.drawer,
                           folders: renameFolderRecursively(state.drawer.folders, folderId, newName),
                        }
                     }
                  });
               },
               deleteFolder: (folderId) => {
                  set(state => {
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');
                     return {
                        drawer: {
                           ...state.drawer,
                           folders: deleteFolderRecursively(state.drawer.folders, folderId),
                        }
                     }
                  });
               },
               moveFolder: (folderId, destinationFolderId) => {
                  set(state => {
                     if (folderId === destinationFolderId) return state;
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');

                     const { folder: folderToMove, updatedFolders } = findAndRemoveFolder(state.drawer.folders, folderId);

                     if (!folderToMove) return state;

                     let finalFolders: Folder[];
                     if (!destinationFolderId) {
                        finalFolders = [...updatedFolders, folderToMove];
                     } else {
                        finalFolders = addFolderRecursively(updatedFolders, folderToMove, destinationFolderId);
                     }

                     return { drawer: { ...state.drawer, folders: finalFolders } };
                  });
               },
               reorderFolders: (parentFolderId, oldIndex, newIndex) => {
                  set(state => {
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');
                     if (!parentFolderId) {
                        return { drawer: { ...state.drawer, folders: reorderList(state.drawer.folders, oldIndex, newIndex) } };
                     }
                     return { drawer: { ...state.drawer, folders: reorderFoldersRecursively(state.drawer.folders, parentFolderId, oldIndex, newIndex) } };
                  });
               },
               // --- Item Actions ---
               addItem: (name, game, type, content, parentFolderId) => {
                  set(state => {
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');
                     const newItemContent = deepReId(content);
                     const newItem: DrawerItem = { id: cuid(), name, game, type, content: newItemContent };

                     if (!parentFolderId) {
                        return { drawer: { ...state.drawer, rootItems: [...state.drawer.rootItems, newItem] } };
                     } else {
                        const newFolders = addItemRecursively(state.drawer.folders, newItem, parentFolderId);
                        return { drawer: { ...state.drawer, folders: newFolders } };
                     }
                  });
               },
               addImportedItem: (itemContent, itemType, game, parentFolderId) => {
                  set(state => {
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');
                     const newItemContent = deepReId(itemContent);
                     const name = 'title' in newItemContent ? newItemContent.title : newItemContent.name;

                     const newItem: DrawerItem = {
                        id: cuid(),
                        name,
                        game: game,
                        type: itemType,
                        content: newItemContent,
                     };

                     if (!parentFolderId) {
                        return { drawer: { ...state.drawer, rootItems: [...state.drawer.rootItems, newItem] } };
                     } else {
                        const newFolders = addItemRecursively(state.drawer.folders, newItem, parentFolderId);
                        return { drawer: { ...state.drawer, folders: newFolders } };
                     }
                  });
               },
               renameItem: (itemId, newName) => {
                  set(state => {
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');
                     return {
                        drawer: {
                           ...state.drawer,
                           rootItems: state.drawer.rootItems.map(item => 
                              item.id === itemId ? { ...item, name: newName } : item
                           ),
                           folders: renameItemRecursively(state.drawer.folders, itemId, newName),
                        }
                     }
                  });
               },
               deleteItem: (itemId) => {
                  set(state => {
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');
                     return {
                        drawer: {
                           ...state.drawer,
                           rootItems: state.drawer.rootItems.filter(item => item.id !== itemId),
                           folders: deleteItemRecursively(state.drawer.folders, itemId),
                        }
                     }
                  });
               },
               moveItem: (itemId, destinationFolderId) => {
                  set(state => {
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');
                     let itemToMove: DrawerItem | null = null;
                     const updatedDrawer = { ...state.drawer };

                     const rootItemIndex = updatedDrawer.rootItems.findIndex(item => item.id === itemId);
                     if (rootItemIndex > -1) {
                        itemToMove = updatedDrawer.rootItems[rootItemIndex];
                        updatedDrawer.rootItems = updatedDrawer.rootItems.filter(item => item.id !== itemId);
                     } else {
                        const result = findAndRemoveItem(updatedDrawer.folders, itemId);
                        itemToMove = result.item;
                        updatedDrawer.folders = result.updatedFolders;
                     }

                     if (!itemToMove) return state;

                     if (!destinationFolderId) {
                        updatedDrawer.rootItems = [...updatedDrawer.rootItems, itemToMove];
                     } else {
                        updatedDrawer.folders = addItemRecursively(updatedDrawer.folders, itemToMove, destinationFolderId);
                     }

                     return { drawer: updatedDrawer };
                  });
               },
               reorderItems: (parentFolderId, oldIndex, newIndex) => {
                  set(state => {
                     useAppGeneralStateStore.getState().actions.setLastModifiedStore('drawer');
                     if (!parentFolderId) {
                        return { drawer: { ...state.drawer, rootItems: reorderList(state.drawer.rootItems, oldIndex, newIndex) } };
                     }
                     return { drawer: { ...state.drawer, folders: reorderItemsRecursively(state.drawer.folders, parentFolderId, oldIndex, newIndex) } };
                  });
               },
               // --- Drop Actions ---
               initiateItemDrop: (itemInfo) => {
                  set({ pendingItem: itemInfo });
               },
               clearPendingItemDrop: () => {
                  set({ pendingItem: null });
               },
            },
         }),
         {
            name: 'characters-of-the-mist_drawer-storage',
            storage: createJSONStorage(() => localStorage, {
               reviver: (key, value) => {
                  // I don't like using "any", but it's a necessary evil here. We have no guarantee on the
                  // shape of the persisted state before we run the migrator if running it is necessary.
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  if (key === '' && value && (value as any).state?.drawer) {
                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                     const drawerState = (value as any).state;
                     console.log("Harmonizing drawer data via reviver...");
                     drawerState.drawer = harmonizeData(drawerState.drawer, 'FULL_DRAWER');
                     console.log("Drawer data harmonization complete.");
                  }
                  return value;
               },
            }),
            partialize: (state) => ({ drawer: state.drawer }),
         }
      )
   )
);

export const useDrawerActions = () => useDrawerStore((state) => state.actions);