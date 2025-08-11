'use client';

// -- React Imports --
import React from 'react';

// -- Next Imports --
import { useTranslations } from 'next-intl';

// -- Basic UI Imports --
import { Button } from '@/components/ui/button';

// -- Icon Imports --
import { Undo, Redo } from 'lucide-react';

// -- Store and Hook Imports --
import useDrawerTemporalStore from '@/hooks/useDrawerTemporalStore';



export function DrawerUndoRedoControls() {
   const t = useTranslations('Actions');
   const { undo, redo, pastStates, futureStates } = useDrawerTemporalStore(
      (state) => state,
   );

   const canUndo = pastStates?.length > 1;
   const canRedo = futureStates?.length > 0;



   return (
      <div data-tour="drawer-undo-redo-buttons" className="flex items-center gap-2 justify-evenly">
         <Button
            variant="outline"
            size="sm"
            onClick={() => undo()}
            disabled={!canUndo}
            aria-label={t('undo')}
            className={ canUndo ? "cursor-pointer" : "" }
         >
            <Undo className="h-4 w-4 mr-1" />
            {t('undo')}
         </Button>
         <Button
            variant="outline"
            size="sm"
            onClick={() => redo()}
            disabled={!canRedo}
            aria-label={t('redo')}
            className={ canRedo ? "cursor-pointer" : "" }
         >
            {t('redo')}
            <Redo className="h-4 w-4 ml-1" />
         </Button>
      </div>
   );
}