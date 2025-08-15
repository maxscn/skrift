import { useEffect, useState } from "react";

export const useIsPrinting = () => {
    const [isPrinting, setIsPrinting] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('print');
        setIsPrinting(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setIsPrinting(e.matches);
        mediaQuery.addListener(handler);
        return () => mediaQuery.removeListener(handler);
    }, []);

    return isPrinting;
};