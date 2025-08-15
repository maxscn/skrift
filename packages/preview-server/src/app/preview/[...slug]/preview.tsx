'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { use, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Toaster } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import { MeasuredIframe, Topbar } from '../../../components';
import { CodeContainer } from '../../../components/code-container';
import {
  makeIframeDocumentBubbleEvents,
  ResizableWrapper,
} from '../../../components/resizable-wrapper';
import { Print } from '../../../components/send';
import { useToolbarState } from '../../../components/toolbar';
import { Tooltip } from '../../../components/tooltip';
import { ActiveViewToggleGroup } from '../../../components/topbar/active-view-toggle-group';
import { VIEW_PRESETS, ViewSizeControls } from '../../../components/topbar/view-size-controls';
import type { PresetOption } from '../../../components/topbar/view-size-controls';
import { PreviewContext } from '../../../contexts/preview';
import { useClampedState } from '../../../hooks/use-clamped-state';
import { cn } from '../../../utils';
import { RenderingError } from './rendering-error';

interface PreviewProps extends React.ComponentProps<'div'> {
  documentTitle: string;
}

const Preview = ({ documentTitle, className, ...props }: PreviewProps) => {
  const { renderingResult, renderedDocumentMetadata } = use(PreviewContext)!;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeView = searchParams.get('view') ?? 'preview';
  const activeLang = searchParams.get('lang') ?? 'jsx';

  const handleViewChange = (view: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', view);
    router.push(`${pathname}?${params.toString()}${location.hash}`);
  };

  const handleLangChange = (lang: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', 'source');
    params.set('lang', lang);
    const isSameLang = searchParams.get('lang') === lang;
    router.push(
      `${pathname}?${params.toString()}${isSameLang ? location.hash : ''}`,
    );
  };

  const hasRenderingMetadata = typeof renderedDocumentMetadata !== 'undefined';
  const hasErrors = 'error' in renderingResult;

  const [maxWidth, setMaxWidth] = useState(Number.POSITIVE_INFINITY);
  const [maxHeight, setMaxHeight] = useState(Number.POSITIVE_INFINITY);
  const minWidth = 100;
  const minHeight = 100;
  const storedWidth = searchParams.get('width');
  const storedHeight = searchParams.get('height');
  const [width, setWidth] = useClampedState(
    storedWidth ? Number.parseInt(storedWidth) : 600,
    minWidth,
    maxWidth,
  );
  const [height, setHeight] = useClampedState(
    storedHeight ? Number.parseInt(storedHeight) : 1024,
    minHeight,
    maxHeight,
  );
  const [currentPreset, setCurrentPreset] = useState<PresetOption | undefined>(VIEW_PRESETS?.[0]);

  const handleSaveViewSize = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set('width', width.toString());
    params.set('height', height.toString());
    router.push(`${pathname}?${params.toString()}${location.hash}`);
  }, 300);

  const { toggled: toolbarToggled } = useToolbarState();
  return (
    <>

      <Topbar documentTitle={documentTitle} className="print:hidden">
        <ViewSizeControls
          setViewHeight={(height) => {
            setHeight(height);
            flushSync(() => {
              handleSaveViewSize();
            });
          }}
          setViewWidth={(width) => {
            setWidth(width);
            flushSync(() => {
              handleSaveViewSize();
            });
          }}
          viewHeight={height}
          viewWidth={width}
          onPresetChange={setCurrentPreset}
        />
        <ActiveViewToggleGroup
          activeView={activeView}
          setActiveView={handleViewChange}
        />
        {hasRenderingMetadata ? (
          <div className="flex justify-end">
            <Print iframe={iframeRef} />
          </div>
        ) : null}
      </Topbar>
      <div
        {...props}
        className={cn(
          'h-[calc(100%-3.5rem-2.375rem)] will-change-[height] flex p-4 transition-[height] duration-300 overflow-auto',
          activeView === 'preview' && 'bg-gray-200',
          toolbarToggled && 'h-[calc(100%-3.5rem-13rem)]',
          className,
        )}
        ref={(element) => {
          const observer = new ResizeObserver((entry) => {
            const [elementEntry] = entry;
            if (elementEntry) {
              //  setMaxWidth(elementEntry.contentRect.width);
              //  setMaxHeight(elementEntry.contentRect.height);
            }
          });

          if (element) {
            observer.observe(element);
          }

          return () => {
            observer.disconnect();
          };
        }}
      >
        {hasErrors ? <RenderingError error={renderingResult.error} /> : null}

        {hasRenderingMetadata ? (
          <>
            {activeView === 'preview' && (
              <ResizableWrapper
                className="print:hidden"
                minHeight={minHeight}
                minWidth={minWidth}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
                height={height}
                onResizeEnd={() => {
                  handleSaveViewSize();
                }}
                onResize={(value, direction) => {
                  const isHorizontal =
                    direction === 'east' || direction === 'west';
                  if (isHorizontal) {
                    setWidth(Math.round(value));
                  } else {
                    setHeight(Math.round(value));
                  }
                }}
                width={width}
                preset={currentPreset ? {
                  name: currentPreset.name,
                  width: currentPreset.dimensions.width,
                  height: currentPreset.dimensions.height
                } : undefined}
                isPaginationEnabled={!!currentPreset}
              >
                {!!currentPreset ?
                  <MeasuredIframe
                    className=" bg-white [color-scheme:auto]"
                    ref={(iframe) => {
                      iframeRef.current = iframe;
                      if (iframe) {
                        return makeIframeDocumentBubbleEvents(iframe);
                      }
                    }}
                    minHeight={minHeight}
                    style={{ width: `${width}px` }}
                    srcDoc={renderedDocumentMetadata.markup} />

                  : <iframe
                    className="bg-white [color-scheme:auto]"
                    ref={(iframe) => {
                      if (iframe) {
                        return makeIframeDocumentBubbleEvents(iframe);
                      }
                    }}
                    srcDoc={renderedDocumentMetadata.markup}
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                    }}
                    title={documentTitle}
                  />}
              </ResizableWrapper>
            )}

            {activeView === 'source' && (
              <div className="h-full w-full">
                <div className="m-auto h-full flex max-w-3xl p-6">
                  <Tooltip.Provider>
                    <CodeContainer
                      activeLang={activeLang}
                      markups={[
                        {
                          language: 'jsx',
                          content: renderedDocumentMetadata.reactMarkup,
                        },
                        {
                          language: 'markup',
                          content: renderedDocumentMetadata.markup,
                        },
                        {
                          language: 'markdown',
                          content: renderedDocumentMetadata.plainText,
                        },
                      ]}
                      setActiveLang={handleLangChange}
                    />
                  </Tooltip.Provider>
                </div>
              </div>
            )}
          </>
        ) : null}

        <Toaster />
      </div>
    </>
  );
};

export default Preview;
