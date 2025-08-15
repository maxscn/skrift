"use client"
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '../utils';

export interface MeasuredIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  onHeightChange?: (height: number) => void;
  minHeight?: number;
  maxHeight?: number;
  measurementDebounceMs?: number;
}

export const MeasuredIframe = forwardRef<HTMLIFrameElement, MeasuredIframeProps>(
  ({
    onHeightChange,
    minHeight = 0,
    maxHeight = Infinity,
    measurementDebounceMs = 100,
    className,
    style,
    ...props
  }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    const debouncedHeightChange = useDebouncedCallback(
      (height: number) => {
        const clampedHeight = Math.max(minHeight, Math.min(maxHeight, height));
        setMeasuredHeight(clampedHeight);
        onHeightChange?.(clampedHeight);
      },
      measurementDebounceMs
    );

    const measureContent = useCallback(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDocument) return;

        const body = iframeDocument.body;
        const html = iframeDocument.documentElement;

        if (!body || !html) return;

        const height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );

        if (height > 0) {
          debouncedHeightChange(height);
        }
      } catch (error) {
        console.warn('MeasuredIframe: Could not measure content height, likely due to cross-origin restrictions:', error);
      }
    }, [debouncedHeightChange]);

    const setupObserver = useCallback(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDocument) return;

        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
        }

        resizeObserverRef.current = new ResizeObserver(() => {
          measureContent();
        });

        const body = iframeDocument.body;
        const html = iframeDocument.documentElement;

        if (body) resizeObserverRef.current.observe(body);
        if (html) resizeObserverRef.current.observe(html);

        measureContent();
      } catch (error) {
        console.warn('MeasuredIframe: Could not setup ResizeObserver, likely due to cross-origin restrictions:', error);
      }
    }, [measureContent]);

    const handleIframeLoad = useCallback(() => {
      setupObserver();
    }, [setupObserver]);

    useEffect(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      iframe.addEventListener('load', handleIframeLoad);

      if (iframe.contentDocument?.readyState === 'complete') {
        setupObserver();
      }

      return () => {
        iframe.removeEventListener('load', handleIframeLoad);
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
          resizeObserverRef.current = null;
        }
      };
    }, [handleIframeLoad, setupObserver]);

    const combinedRef = useCallback((node: HTMLIFrameElement) => {
      iframeRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);

    const finalStyle = {
      ...style,
      ...(measuredHeight !== null && { height: `${measuredHeight}px` })
    };
    

    return (
      <iframe
        {...props}
        ref={combinedRef}
        className={cn(className)}
        style={finalStyle}
      />
    );
  }
);

MeasuredIframe.displayName = 'MeasuredIframe';