'use client';

// -- React Imports --
import React from 'react';

// -- Other Library Imports --
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

// -- Basic UI Imports --
import { Button } from '@/components/ui/button';

// -- Icon Imports --
import { Trash2, GripVertical, RefreshCw, Edit2, Upload } from 'lucide-react';

// -- Utils Imports --
import { cn } from '@/lib/utils';



interface ToolbarHandleProps {
   isEditing: boolean;
   isHovered: boolean;
   cardTheme: string;
   onDelete?: () => void;
   onFlip?: () => void;
   onEditCard?: () => void;
   onExport?: () => void;
   dragAttributes?: DraggableAttributes;
   dragListeners?: SyntheticListenerMap;
   side?: "left" | "right" | "top" | "bottom";
};

interface sideVariants {
   left: Variants,
   right: Variants,
   top: Variants,
   bottom: Variants
};

const variants: sideVariants = {
   left: {
      initial: { opacity: 0, x: 38 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 38 },
   },
   right: {
      initial: { opacity: 0, x: -38 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -38 },
   },
   top: {
      initial: { opacity: 0, y: 38 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 38 },
   },
   bottom: {
      initial: { opacity: 0, y: -38 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -38 },
   },
};



export function ToolbarHandle({ isEditing, isHovered, cardTheme, onDelete, onFlip, onEditCard, onExport, dragAttributes, dragListeners, side = "left" }: ToolbarHandleProps) {
   return (
      <AnimatePresence>
         {isHovered && (
            <motion.div
               variants={variants[side]}
               initial="initial"
               animate="animate"
               exit="exit"
               transition={{ duration: 0.2, ease: "easeInOut" }}
               className={cn(
                  "z-0",
                  "absolute flex items-center justify-center",
                  (side === 'left' || side === 'right') && "top-0 h-full flex-col",
                  (side === 'top' || side === 'bottom') && "left-1/2 -translate-x-1/2 w-auto flex-row",
                  side === 'left' && "left-[-38px]",
                  side === 'right' && "right-[-38px]",
                  side === 'top' && "top-[-38px]",
                  side === 'bottom' && "bottom-[-38px]",
                  cardTheme
               )}
            >
               <div className={cn(
                  "relative z-0 p-1 flex items-center bg-red",
                  (side === 'left' || side === 'right') ? "flex-col gap-4 border-y-2" : "flex-row gap-4 border-x-2",
                  side === 'left' && "border-l-2 rounded-l-lg",
                  side === 'right' && "border-r-2 rounded-r-lg",
                  side === 'top' && "border-t-2 rounded-t-lg",
                  side === 'bottom' && "border-b-2 rounded-b-lg",
                  "bg-card-popover-bg border-card-border"
               )}>
                  {onFlip && (
                     <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7 cursor-pointer bg-card-paper-bg text-card-paper-fg"
                        onClick={onFlip}
                     >
                        <RefreshCw className="h-4 w-4" />
                     </Button>
                  )}

                  { isEditing && onEditCard && (
                     <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7 cursor-pointer bg-card-paper-bg text-card-paper-fg"
                        onClick={onEditCard}
                     >
                        <Edit2 className="h-4 w-4" />
                     </Button>
                  )}

                  { onExport && (
                     <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7 cursor-pointer bg-card-paper-bg text-card-paper-fg"
                        onClick={onExport}
                     >
                        <Upload className="h-4 w-4" />
                     </Button>
                  )}

                  <div className="flex items-center justify-center cursor-grab text-card-popover-fg h-7 w-7" {...dragAttributes} {...dragListeners}>
                     <GripVertical />
                  </div>

                  { isEditing && onDelete &&
                     <Button 
                        variant="destructive" 
                        size="icon" 
                        className="h-7 w-7 cursor-pointer border-1 border-card-border hover:bg-destructive/60"
                        onClick={onDelete}
                     >
                        <Trash2 className="h-4 w-4" />
                     </Button>
                  }
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
}
