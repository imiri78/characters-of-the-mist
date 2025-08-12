'use client';

// -- React Imports --
import React from 'react';

// -- Next Imports --
import { useTranslations } from 'next-intl';

// -- Icon Imports --
import { Leaf, Swords, Crown } from 'lucide-react';

// -- Basic UI Imports --
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// -- Utils Imports --
import { cn } from '@/lib/utils';



interface CardHeaderMoleculeProps {
   title: string;
   type?: string;
   className?: string;
}



const ThemeTypeIcon = ({ type }: { type: string }) => {
   const t = useTranslations('ThemeTypes');
   const translationKey = type as string

   let IconComponent;
   switch (type) {
      case 'Origin':
         IconComponent = <Leaf className="h-5 w-5" strokeWidth={2.5}/>;
         break;
      case 'Adventure':
         IconComponent = <Swords className="h-5 w-5" strokeWidth={2.5}/>;
         break;
      case 'Greatness':
         IconComponent = <Crown className="h-5 w-5" strokeWidth={2.5}/>;
         break;
      default:
         return <p>{type}</p>;
   }

   return (
      <TooltipProvider delayDuration={300}>
         <Tooltip>
            <TooltipTrigger asChild>
               <div>{IconComponent}</div>
            </TooltipTrigger>
            <TooltipContent>
               <p>{t(translationKey as string)}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};



export function CardHeaderMolecule({ title, type, className }: CardHeaderMoleculeProps) {
   return (
      <div
         className={cn(
            'flex items-center font-semibold border-b h-10',
            'bg-card-header-bg text-card-header-fg border-card-accent/30',
            type ? 'justify-between px-2 py-2 text-sm' 
                  : 'justify-center px-2 py-2 text-md font-bold',
            className
         )}
      >
         <p>{title}</p>
         {type && <ThemeTypeIcon type={type} />}
      </div>
   );
}
