// -- Type Imports --
import { GameSystem, GeneralItemType } from "./drawer";



// *######################*
// |###   BASE TYPES   ###|
// *######################*

export interface Tag {
   id: string;
   name: string;
   isActive: boolean;
   isScratched: boolean;
}

export interface BlandTag {
   id: string;
   name: string;
}

export interface StatusTracker {
   id: string;
   name: string;
   game: GameSystem;
   trackerType: 'STATUS';
   tiers: boolean[];
}

export interface StoryTagTracker {
   id: string;
   name: string;
   game: GameSystem;
   trackerType: 'STORY_TAG';
   isScratched: boolean;
}

export type Tracker = StatusTracker | StoryTagTracker;



// *###############################*
// |###   GAME-SPECIFIC TYPES   ###|
// *###############################*


// --- LEGENDS IN THE MIST ---

export type LegendsThemeType = 'Origin' | 'Adventure' | 'Greatness';

export interface LegendsThemeDetails {
   game: 'LEGENDS';
   themebook: string;
   themeType: LegendsThemeType;
   abandon: number;
   improve: number;
   milestone: number;
   mainTag: Tag;
   powerTags: Tag[];
   weaknessTags: Tag[];
   quest: string | null;
   improvements: BlandTag[];
}

export interface LegendsFellowshipDetails {
   game: 'LEGENDS';
   abandon: number;
   improve: number;
   milestone: number;
   mainTag: Tag;
   powerTags: Tag[];
   weaknessTags: Tag[];
   quest: string | null;
   improvements: BlandTag[];
}

export interface FellowshipRelationship {
   id: string;
   companionName: string;
   relationshipTag: string;
}

export interface LegendsHeroDetails {
   game: 'LEGENDS';
   characterName: string;
   fellowshipRelationships: FellowshipRelationship[];
   promise: number;
   quintessences: BlandTag[];
   backpack: BlandTag[];
}



// All possible card structures
export type CardDetails = 
   | LegendsThemeDetails 
   | LegendsFellowshipDetails 
   | LegendsHeroDetails;

// *##############################*
// |###   GENERIC INTERFACES   ###|
// *##############################*

export interface Card {
   id: string;
   title: string;
   order: number;
   isFlipped: boolean;
   cardType: GeneralItemType; 
   details: CardDetails;
}

export interface Character {
   id: string;
   name: string;
   game: GameSystem;
   cards: Card[];
   trackers: {
      statuses: StatusTracker[];
      storyTags: StoryTagTracker[];
   };
}
