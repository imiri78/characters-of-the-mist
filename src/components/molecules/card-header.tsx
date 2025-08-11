'use client';

// -- React Imports --
import React from 'react';

// -- Utils Imports --
import { cn } from '@/lib/utils';



interface CardHeaderMoleculeProps {
   title: string;
   type?: string;
   className?: string;
}



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
         {type && <p>{type}</p>}
      </div>
   );
}
