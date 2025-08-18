// IframeWithPagedJs.tsx
import React, { useMemo } from "react";
import { MeasuredIframe, MeasuredIframeProps } from "./measured-iframe";

type IframeWithPagedJsProps = {
  srcDoc: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
} & MeasuredIframeProps;

const pagedJsCdn = "https://unpkg.com/pagedjs@0.5.0-beta.2/dist/paged.polyfill.js";

function injectPagedJs(html: string): string {
  // Find </head> to inject scripts before it, or inject at the end of <html> if not found
  const pagedScript = `
    <script src="${pagedJsCdn}"></script>
    <script>
      window.addEventListener('DOMContentLoaded', function() {
        if (window.PagedPolyfill) {
          window.PagedPolyfill.preview(undefined, ["--page-size", "A4"]);
        }
      });
    </script>
  `;

  if (html.includes("</head>")) {
    return html.replace("</head>", `${pagedScript}</head>`);
  } else if (html.includes("<body>")) {
    // If no head, inject at the start of body
    return html.replace("<body>", `<body>${pagedScript}`);
  } else {
    // Fallback: append at the end
    return html + pagedScript;
  }
}

export const PagedIframe: React.FC<IframeWithPagedJsProps> = ({
  srcDoc,
  width = "100%",
  height = 600,
  style,
  ...props
}) => {
  const htmlContent = useMemo(() => injectPagedJs(srcDoc, ), [srcDoc]);

  return (
    <MeasuredIframe
      srcDoc={htmlContent}
      style={{
        width,
        height,
        ...style,
        marginLeft: "auto",
        marginRight: "auto"
      }}
      title="Paged.js Iframe"
      sandbox="allow-scripts allow-same-origin allow-modals"
      {...props}
      key={width + "" + height}
    />
  );
};

export default PagedIframe;
