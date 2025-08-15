import { Slot } from '@radix-ui/react-slot';
import { type ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../utils';
import { distributeElementsToPages } from '../utils/pagination';

type Direction = 'north' | 'south' | 'east' | 'west';

interface PresetDimensions {
  name: string;
  width: number;
  height: number;
}

type ResizableWrapperProps = {
  width: number;
  height: number;

  maxWidth: number;
  maxHeight: number;
  minWidth: number;
  minHeight: number;

  onResize: (newSize: number, direction: Direction) => void;
  onResizeEnd?: () => void;

  children: React.ReactNode;
  
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

const PagedContent = ({ 
  children, 
  preset, 
  srcDoc 
}: { 
  children: React.ReactNode; 
  preset: PresetDimensions;
  srcDoc?: string;
}) => {
  const [pages, setPages] = useState<Array<{ id: number; content: string }>>([]);
  const measureRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!srcDoc || !measureRef.current) return;

    const iframe = measureRef.current;
    const handlePagination = () => {
      const doc = iframe.contentDocument;
      if (!doc) {
        console.log('No contentDocument available');
        return;
      }

      // Wait for body to be available
      if (!doc.body) {
        console.log('No body element, retrying...');
        setTimeout(handlePagination, 50);
        return;
      }

      const pages = distributeElementsToPages(doc, preset, srcDoc);
      setPages(pages);
    };

    iframe.onload = () => {
      console.log('Iframe loaded, measuring in 300ms...');
      setTimeout(handlePagination, 300);
    };
    
    // Also try immediately in case the iframe is already loaded
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      console.log('Iframe already loaded, measuring immediately...');
      setTimeout(handlePagination, 100);
    }
  }, [srcDoc, preset.height, preset.width]);


  console.log(pages.length)
  if (pages.length === 0) {
    return (
      <div 
        className="bg-white shadow-lg"
        style={{ width: preset.width, height: preset.height }}
      >
        <iframe
          ref={measureRef}
          srcDoc={srcDoc}
          style={{ width: '100%', height: '100%', border: 'none' }}
          className="opacity-0 absolute pointer-events-none"
        />
        {children}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-4">
      {pages.map((page) => (
        <div
          key={page.id}
          className="bg-white shadow-lg relative"
          style={{ width: preset.width, height: preset.height, marginTop: "1rem", marginBottom: "1rem" }}
        >
          <div className="absolute top-2 right-2 bg-black/10 px-2 py-1 rounded text-xs text-gray-600">
            Page {page.id}
          </div>
          
          <iframe
            srcDoc={page.content}
            style={{ 
              width: '100%', 
              height: '100%', 
              border: 'none'
            }}
          />
        </div>
      ))}
    </div>
  );
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
  const mouseMoveListener = useRef<(event: MouseEvent) => void>(null);

  const isPresetMode = preset && isPaginationEnabled;

  const handleStopResizing = useCallback(() => {
    if (mouseMoveListener.current) {
      document.removeEventListener('mousemove', mouseMoveListener.current);
    }
    document.removeEventListener('mouseup', handleStopResizing);
    onResizeEnd?.();
  }, [onResizeEnd]);

  const handleStartResizing = (direction: Direction) => {
    mouseMoveListener.current = (event) => {
      if (event.button === 0 && resizableRef.current) {
        const isHorizontal = direction === 'east' || direction === 'west';

        const mousePosition = isHorizontal ? event.clientX : event.clientY;
        const resizableBoundingRect =
          resizableRef.current.getBoundingClientRect();
        const center = isHorizontal
          ? resizableBoundingRect.x + resizableBoundingRect.width / 2
          : resizableBoundingRect.y + resizableBoundingRect.height / 2;
        onResize(Math.abs(mousePosition - center) * 2, direction);
      } else {
        handleStopResizing();
      }
    };

    document.addEventListener('mouseup', handleStopResizing);
    document.addEventListener('mousemove', mouseMoveListener.current);
  };

  useEffect(() => {
    if (!window.document) return;

    return () => {
      handleStopResizing();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPresetMode) {
    const iframe = children as React.ReactElement<React.IframeHTMLAttributes<HTMLIFrameElement>>;
    const srcDoc = iframe?.props?.srcDoc;

    return (
      <div
        {...rest}
        className={cn('mx-auto my-auto', rest.className)}
      >
        <PagedContent preset={preset} srcDoc={srcDoc}>
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
      <div
        aria-label="resize-west"
        aria-valuenow={width}
        aria-valuemin={minWidth}
        aria-valuemax={maxWidth}
        className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-2 cursor-w-resize p-2 [user-drag:none]"
        onDragStart={(event) => event.preventDefault()}
        draggable="false"
        onMouseDown={() => {
          handleStartResizing('west');
        }}
        role="slider"
        tabIndex={0}
      >
        <div className="h-8 w-1 rounded-md bg-black/30" />
      </div>
      <div
        aria-label="resize-east"
        aria-valuenow={width}
        aria-valuemin={minWidth}
        aria-valuemax={maxWidth}
        onDragStart={(event) => event.preventDefault()}
        className="-translate-x-full -translate-y-1/2 absolute top-1/2 left-full cursor-e-resize p-2 [user-drag:none]"
        draggable="false"
        onMouseDown={() => {
          handleStartResizing('east');
        }}
        role="slider"
        tabIndex={0}
      >
        <div className="h-8 w-1 rounded-md bg-black/30" />
      </div>
      <div
        aria-label="resize-north"
        aria-valuenow={height}
        aria-valuemin={minHeight}
        aria-valuemax={maxHeight}
        onDragStart={(event) => event.preventDefault()}
        className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 cursor-n-resize p-2 [user-drag:none]"
        draggable="false"
        onMouseDown={() => {
          handleStartResizing('north');
        }}
        role="slider"
        tabIndex={0}
      >
        <div className="h-1 w-8 rounded-md bg-black/30" />
      </div>
      <div
        aria-label="resize-south"
        aria-valuenow={height}
        aria-valuemin={minHeight}
        aria-valuemax={maxHeight}
        onDragStart={(event) => event.preventDefault()}
        className="-translate-x-1/2 -translate-y-1/2 absolute top-full left-1/2 cursor-s-resize p-2 [user-drag:none]"
        draggable="false"
        onMouseDown={() => {
          handleStartResizing('south');
        }}
        role="slider"
        tabIndex={0}
      >
        <div className="h-1 w-8 rounded-md bg-black/30" />
      </div>

      <Slot ref={resizableRef}>{children}</Slot>
    </div>
  );
};
