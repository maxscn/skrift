import * as React from 'react';
import { usePageSize } from './page';

export type HeadProps = Readonly<React.ComponentPropsWithoutRef<'head'>>;

export const Head = React.forwardRef<HTMLHeadElement, HeadProps>(
  ({ children, ...props }, ref) => {
    const pageSize = usePageSize();
    return (
      <head {...props} ref={ref}>

        <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
        {children}
      </head>
    )
  },
);

Head.displayName = 'Head';