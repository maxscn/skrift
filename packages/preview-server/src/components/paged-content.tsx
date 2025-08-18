import { Previewer } from 'pagedjs';
import { useEffect, useRef } from 'react';

interface PagedContentProps {
    children: React.ReactNode;
    pageHeight?: number;
    pageWidth?: number;
    gapSize?: number;
}

export const PagedContent: React.FC<PagedContentProps> = ({
    children,
    pageHeight = 1000,
    pageWidth = 800,
    gapSize = 20
}) => {
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            // Initialize Paged.js on the rendered content
            new Previewer().preview(contentRef.current);
        }
    }, [children]);

    return (
        <div style={{ padding: '20px' }} ref={contentRef}>
            {children}
        </div>
    );
};