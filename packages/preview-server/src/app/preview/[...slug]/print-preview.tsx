'use client';
import {  useSearchParams } from 'next/navigation';

import { use, useState } from 'react';
import { MeasuredIframe } from '../../../components';
import { PreviewContext } from '../../../contexts/preview';
import { useClampedState } from '../../../hooks/use-clamped-state';
import { useIsPrinting } from '../../../hooks/use-is-printing';
import { cn } from '../../../utils';

interface PrintPreviewProps extends React.ComponentProps<'div'> {
  documentTitle: string;
  width?: number;
}

const PrintPreview = ({ documentTitle, className, width = 794, ...props }: PrintPreviewProps) => {
  const {  renderedDocumentMetadata } = use(PreviewContext)!;
  const [height, setHeight] = useState(0)
  const isPrinting = useIsPrinting();

  if (!renderedDocumentMetadata?.markup) {
    return "Please wait a few seconds while the document is being rendered, then retry.";
  }

  return (
      <MeasuredIframe
          onHeightChange={(h => setHeight(h))}
          className="print:visible invisible bg-white print:top-0 -top-[1000000px] absolute"
          srcDoc={renderedDocumentMetadata.markup}
          style={{
            width: `${width}px`,
              boxSizing: 'border-box',
             
          }}
          minHeight={height}
          title={documentTitle}
        />
  );
};

export default PrintPreview;
