// -- Other Library Imports --
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';



export type ThemeName = 'theme-neutral' | 'theme-legends';

interface AppSettingsState {
   theme: ThemeName;
   isCompactDrawer: boolean;
   isSideBySideView: boolean;
   lastVisitedVersion: string;
   actions: {
      setTheme: (theme: ThemeName) => void;
      toggleCompactDrawer: () => void;
      setSideBySideView: (isSideBySide: boolean) => void;
      setLastVisitedVersion: (version: string) => void;
   };
}



export const useAppSettingsStore = create<AppSettingsState>()(
   persist(
      (set) => ({
         theme: 'theme-neutral',
         isCompactDrawer: false,
         isSideBySideView: false,
         lastVisitedVersion: "0.0.0",
         actions: {
            setTheme: (theme) => set({ theme }),
            toggleCompactDrawer: () => set((state) => ({ isCompactDrawer: !state.isCompactDrawer })),
            setSideBySideView: (isSideBySide) => set({ isSideBySideView: isSideBySide }),
            setLastVisitedVersion: (version) => set({ lastVisitedVersion: version }),
         },
      }),
      {
         name: 'characters-of-the-mist_app-settings',
         storage: createJSONStorage(() => localStorage),
         partialize: (state) => ({ theme: state.theme, isCompactDrawer: state.isCompactDrawer, isSideBySideView: state.isSideBySideView, lastVisitedVersion: state.lastVisitedVersion }),
      }
   )
);

export const useAppSettingsActions = () => useAppSettingsStore((state) => state.actions);