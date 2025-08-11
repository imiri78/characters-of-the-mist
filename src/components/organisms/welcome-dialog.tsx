'use client';

// -- React Imports --
import React from 'react';

// -- Next Imports --
import { useTranslations } from 'next-intl';

// -- Basic UI Imports --
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

// -- Icon Imports --
import { Newspaper, BookOpenText } from 'lucide-react';



interface WelcomeDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onStartTutorial: () => void;
  onShowPatchNotes: () => void;
}



export function WelcomeDialog({ isOpen, onOpenChange, onStartTutorial, onShowPatchNotes }: WelcomeDialogProps) {
   const t = useTranslations('WelcomeDialog');

   const handleStartTutorial = () => {
      onStartTutorial();
      onOpenChange(false);
   };

   const handleShowPatchNotes = () => {
      onShowPatchNotes();
      onOpenChange(false);
   };



   return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
         <DialogContent className="max-w-xl">
            <DialogHeader>
               <div className="flex items-center gap-3 mb-2 pr-4">
                  <DialogTitle className="text-2xl">{t('title')}</DialogTitle>
               </div>
               <DialogDescription>{t('description')}</DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-3">
               <h3 className="font-semibold">{t('featuresTitle')}</h3>
               <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>{t('feature1')}</li>
                  <li>{t('feature2')}</li>
                  <li>{t('feature3')}</li>
                  <li>{t('feature4')}</li>
               </ul>
            </div>

            <DialogDescription>{t('callToAction')}</DialogDescription>
            <DialogDescription>{t('needHelp')}</DialogDescription>

            <DialogFooter className="mt-4 gap-2 sm:justify-end">
               <Button onClick={handleStartTutorial} className="w-full sm:w-auto cursor-pointer">
                  <BookOpenText className="mr-2 h-4 w-4" />
                  {t('startTutorialButton')}
               </Button>
               <Button onClick={handleShowPatchNotes} variant="outline" className="w-full sm:w-auto cursor-pointer">
                  <Newspaper className="mr-2 h-4 w-4" />
                  {t('patchNotesButton')}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}