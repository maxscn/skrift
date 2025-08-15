import { Slot } from '@radix-ui/react-slot';
import { type ComponentProps, useCallback, useEffect, useRef } from 'react';
import { cn } from '../utils';
import {PagedContent} from './paged-content';

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

const ResizeHandle = ({ direction, value, minValue, maxValue, onStartResize }: ResizeHandleProps) => {
  const config = HANDLE_CONFIG[direction];
  
  return (
    <div
      aria-label={`resize-${direction}`}
      aria-valuenow={value}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      className={config.className}
      onDragStart={(event) => event.preventDefault()}
      draggable="false"
      onMouseDown={() => onStartResize(direction)}
      role="slider"
      tabIndex={0}
    >
      <div className={config.barClassName} />
    </div>
  );
};

export interface PresetDimensions {
  name: string;
  width: number;
  height: number;
}

type ResizableWrapperProps = {
  children: React.ReactNode;
  
  // Dimensions
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;

  // Event handlers
  onResize: (newSize: number, direction: Direction) => void;
  onResizeEnd?: () => void;

  // Preset mode options
  preset?: PresetDimensions;
  isPaginationEnabled?: boolean;
} & Omit<ComponentProps<'div'>, 'onResize' | 'children'>;

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
  width,
  height,
  onResize,
  onResizeEnd,
  children,
  preset,
  isPaginationEnabled = false,

  maxHeight,
  maxWidth,
  minHeight,
  minWidth,

  ...rest
}: ResizableWrapperProps) => {
  const resizableRef = useRef<HTMLElement>(null);
  const mouseMoveListenerRef = useRef<((event: MouseEvent) => void) | null>(null);

  const isPresetMode = preset && isPaginationEnabled;

  const handleStopResizing = useCallback(() => {
    if (mouseMoveListenerRef.current) {
      document.removeEventListener('mousemove', mouseMoveListenerRef.current);
      mouseMoveListenerRef.current = null;
    }
    document.removeEventListener('mouseup', handleStopResizing);
    onResizeEnd?.();
  }, [onResizeEnd]);

  const handleStartResizing = (direction: Direction) => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.button === 0 && resizableRef.current) {
        const isHorizontal = direction === 'east' || direction === 'west';
        const mousePosition = isHorizontal ? event.clientX : event.clientY;
        const resizableBoundingRect = resizableRef.current.getBoundingClientRect();
        const center = isHorizontal
          ? resizableBoundingRect.x + resizableBoundingRect.width / 2
          : resizableBoundingRect.y + resizableBoundingRect.height / 2;
        onResize(Math.abs(mousePosition - center) * 2, direction);
      } else {
        handleStopResizing();
      }
    };

    mouseMoveListenerRef.current = handleMouseMove;
    document.addEventListener('mouseup', handleStopResizing);
    document.addEventListener('mousemove', handleMouseMove);
  };

  useEffect(() => {
    if (!window.document) return;

    return () => {
      handleStopResizing();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPresetMode) {
    return (
      <div
        {...rest}
        className={cn('mx-auto my-auto', rest.className)}
      >
        <PagedContent pageHeight={preset.height} pageWidth={preset.width} gapSize={20}>
          {children}
        </PagedContent>

      </div>
    );
  }

  return (
    <div
      {...rest}
      className={cn('relative mx-auto my-auto box-content', rest.className)}
    >
      <ResizeHandle 
        direction="west" 
        value={width} 
        minValue={minWidth} 
        maxValue={maxWidth} 
        onStartResize={handleStartResizing} 
      />
      <ResizeHandle 
        direction="east" 
        value={width} 
        minValue={minWidth} 
        maxValue={maxWidth} 
        onStartResize={handleStartResizing} 
      />
      <ResizeHandle 
        direction="north" 
        value={height} 
        minValue={minHeight} 
        maxValue={maxHeight} 
        onStartResize={handleStartResizing} 
      />
      <ResizeHandle 
        direction="south" 
        value={height} 
        minValue={minHeight} 
        maxValue={maxHeight} 
        onStartResize={handleStartResizing} 
      />

      <Slot ref={resizableRef}>{children}</Slot>
    </div>
  );
};
