import * as React from 'react';
import { usePageSize } from './page';

export type HeadProps = Readonly<React.ComponentPropsWithoutRef<'head'>>;

export const Head = React.forwardRef<HTMLHeadElement, HeadProps>(
  ({ children, ...props }, ref) => {
    const pageSize = usePageSize();
    return (
      <head {...props} ref={ref}>
        <style>
          {`@page {
              size: ${pageSize?.name};
              margin: 0;
            }
            .pagedjs_page {
              background-color: white;
              display: block;
              position: relative !important;
              page-break-after: always;
              width: ${pageSize?.dimensions.width}px !important;
              height: ${pageSize?.dimensions.height}px !important;
            }
            .pagedjs_sheet {
              width: ${pageSize?.dimensions.width}px !important;
              height: ${pageSize?.dimensions.height}px !important;
            }
            .pagedjs_pages {
              display: flex;
              flex-direction: column;
              gap: 1em; /* space between pages */
            }

            table[data-split-from] thead,
            table[data-split-from] thead :is(th, tr) {
              visibility: unset !important;
              margin-top: unset !important;
              margin-bottom: unset !important;
              padding-top: unset !important;
              padding-bottom: unset !important;
              border-top: unset !important;
              border-bottom: unset !important;
              line-height: unset !important;
              opacity: unset !important;
            }
            `}
        </style>
        <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
        {children}
      </head>
    )
  },
);

Head.displayName = 'Head';