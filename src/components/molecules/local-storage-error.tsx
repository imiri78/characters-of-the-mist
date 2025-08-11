'use client';

// -- Next Imports --
import { useTranslations } from 'next-intl';

// -- Icon Imports --
import { ShieldAlert } from 'lucide-react';



export const LocalStorageError = () => {
   const t = useTranslations('Errors');


   
   return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center">
         <ShieldAlert className="mb-4 h-16 w-16 text-destructive" />
         <h1 className="text-2xl font-bold text-destructive">
            {t('localStorageDisabled_title')}
         </h1>
         <p className="mt-2 max-w-md text-muted-foreground">
            {t('localStorageDisabled_description')}
         </p>
      </div>
   );
};