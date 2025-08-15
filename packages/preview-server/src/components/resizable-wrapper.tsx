import { Slot } from '@radix-ui/react-slot';
import { type ComponentProps, useCallback, useEffect, useRef } from 'react';
import { cn } from '../utils';
import {PagedContent} from './paged-content';
import { PageSize } from '@skrift/components';

type Direction = 'north' | 'south' | 'east' | 'west';

interface ResizeHandleProps {
  direction: Direction;
  value: number;
  minValue: number;
  maxValue: number;
  onStartResize: (direction: Direction) => void;
}

const HANDLE_CONFIG = {
  north: {
    className: '-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 cursor-n-resize p-2 [user-drag:none]',
    barClassName: 'h-1 w-8 rounded-md bg-black/30',
  },
  south: {
    className: '-translate-x-1/2 -translate-y-1/2 absolute top-full left-1/2 cursor-s-resize p-2 [user-drag:none]',
    barClassName: 'h-1 w-8 rounded-md bg-black/30',
  },
  west: {
    className: '-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-2 cursor-w-resize p-2 [user-drag:none]',
    barClassName: 'h-8 w-1 rounded-md bg-black/30',
  },
  east: {
    className: '-translate-x-full -translate-y-1/2 absolute top-1/2 left-full cursor-e-resize p-2 [user-drag:none]',
    barClassName: 'h-8 w-1 rounded-md bg-black/30',
  },
} as const;



type ResizableWrapperProps = {
  children: React.ReactNode;
  preset: PageSize;
} & Omit<ComponentProps<'div'>, 'children'>;

export const makeIframeDocumentBubbleEvents = (iframe: HTMLIFrameElement) => {
  const mouseMoveBubbler = (event: MouseEvent) => {
    const bounds = iframe.getBoundingClientRect();
    document.dispatchEvent(
      new MouseEvent('mousemove', {
        ...event,
        clientX: event.clientX + bounds.x,
        clientY: event.clientY + bounds.y,
      }),
    );
  };
  const mouseUpBubbler = (event: MouseEvent) => {
    document.dispatchEvent(new MouseEvent('mouseup', event));
  };
  iframe.contentDocument?.addEventListener('mousemove', mouseMoveBubbler);
  iframe.contentDocument?.addEventListener('mouseup', mouseUpBubbler);
  return () => {
    iframe.contentDocument?.removeEventListener('mousemove', mouseMoveBubbler);
    iframe.contentDocument?.removeEventListener('mouseup', mouseUpBubbler);
  };
};


export const ResizableWrapper = ({
  children,
  preset,
  ...rest
}: ResizableWrapperProps) => {



    return (
      <div
        {...rest}
        className={cn('mx-auto my-auto', rest.className)}
      >
        <PagedContent pageHeight={preset.dimensions.height} pageWidth={preset.dimensions.width} gapSize={20}>
          {children}
        </PagedContent>

      </div>
    );

};
