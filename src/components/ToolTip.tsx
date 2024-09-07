import React from 'react';
import { classNames } from '@/utils';

/**
 * Tooltip Component
 * 
 * Displays an information text when hovering over an element. The Tooltip is designed
 * to dynamically adjust to the size of its content while handling overflows.
 * Use the group class to determine which component it depends on
 * 
 * @param {string} content - The text to display in the tooltip.
 * @param {string} [position='top'] - The position of the tooltip relative to the trigger element. Can be 'top', 'bottom', 'left', or 'right'.
 * @param {string} [className] - Additional CSS classes to apply to the tooltip.
 * 
 * @example
 * <Tooltip content="Change theme" position="top">
 *   <button>Toggle</button>
 * </Tooltip>
 */

interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip : React.FC<TooltipProps> = ({ 
    text, 
    position = 'top', 
    className='bg-gray-800 text-white'
  }) => {  
  return(
    <div
      className={classNames(
        'absolute w-max max-w-xs px-2 py-1 text-xs rounded-lg overflow-hidden text-ellipsis hidden group-hover:block',
        className,
        position === 'top' ? 'bottom-full mb-2' : '',
        position === 'bottom' ? 'top-full mt-2' : '',
        position === 'left' ? 'right-full mr-2' : '',
        position === 'right' ? 'left-full ml-2' : ''
      )}
      style={{ left: '50%', transform: 'translateX(-50%)' }}
    >
      {text}
    </div>
  )
}