'use client';

// -- React Imports --
import React from 'react';

// -- Other Library Imports --
import { motion } from 'framer-motion';

// -- Basic UI Imports --
import { IconButton, IconButtonProps } from '@/components/ui/icon-button';

// -- Utils Imports --
import { cn } from '@/lib/utils';



// Define the props for our new component
interface SidebarButtonProps extends Omit<IconButtonProps, 'children'> {
  isCollapsed: boolean;
  Icon: React.ElementType;
  children: React.ReactNode;
}

export function SidebarButton({ isCollapsed, Icon, children, ...props }: SidebarButtonProps) {
  return (
     <IconButton
         layout
         transition={{ duration: 0.2 }}
         className={cn(
            "flex cursor-pointer overflow-hidden transition-all duration-200 ease-in-out",
            isCollapsed ? "w-10 px-2 justify-center" : "w-56 px-4 justify-start"
         )}
         {...props}
      >

         <Icon
         className={cn(
            "flex-shrink-0 transition-all",
            isCollapsed ? "h-5 w-5" : "h-4 w-4"
         )}
         />

         <motion.span
               className="whitespace-nowrap"
               initial={false}
               animate={{
                  width: isCollapsed ? 0 : 'auto',
                  opacity: isCollapsed ? 0 : 1,
                  marginLeft: isCollapsed ? 0 : '0.5rem',
               }}
               transition={{
                  duration: 0.2,
                  ease: 'easeInOut',
               }}
            >
            {children}
         </motion.span>
      </IconButton>
  );
}