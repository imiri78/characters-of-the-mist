import { Character, LegendsHeroDetails } from '@/lib/types/character';
import cuid from 'cuid';



export function createNewCharacter(name: string): Character {
   const heroCardId = cuid();
   
   const newCharacter: Character = {
      id: cuid(),
      name: name,
      game: 'LEGENDS',
      cards: [
         {
            id: heroCardId,
            cardType: 'CHARACTER_CARD', 
            title: 'Hero Card',
            order: 0,
            isFlipped: false,
            details: {
               game: 'LEGENDS',
               characterName: name, 
               fellowshipRelationships: [],
               promise: 0,
               quintessences: [],
               backpack: [],
            } as LegendsHeroDetails,
         }
      ],
      trackers: {
         statuses: [],
         storyTags: []
      }
   };

   return newCharacter;
}