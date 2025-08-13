// -- Type Imports --
import { LegendsThemeType } from "./character";



export type LegendsThemeTypes = 'Origin' | 'Adventure' | 'Greatness'; 

export interface CreateCardOptions {
   cardType: 'CHARACTER_THEME' | 'GROUP_THEME';
   themebook?: string;
   themeType?: LegendsThemeType;
   mainTagName?: string;
   powerTagsCount: number;
   weaknessTagsCount: number;
}