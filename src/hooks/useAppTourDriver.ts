'use client';

// -- Next Imports --
import { useTranslations } from 'next-intl';

// -- Other Library Imports --
import { driver } from 'driver.js';

// -- Utils Imports --
import { getTourSteps } from '@/lib/driver-tour';

// -- Store and Hook Imports --
import { useAppGeneralStateActions } from '@/lib/stores/appGeneralStateStore';



export const useAppTourDriver = () => {
   const t = useTranslations('Tutorial');
   const { setTourOpen, setIsEditing, setDrawerOpen } = useAppGeneralStateActions();

   const startTour = () => {
      const driverObj = driver({
         popoverClass: 'cotm-driver',
         showProgress: true,
         progressText: "{{current}} / {{total}}",
         disableActiveInteraction: true,
         onDestroyStarted: () => {
            setTourOpen(false);
            setIsEditing(false);
            setDrawerOpen(false);
            driverObj.destroy();
         },
         steps: getTourSteps(t, { setIsEditing, setDrawerOpen }),
      });

      driverObj.drive();
      setTourOpen(true);
   };

   return { startTour };
};