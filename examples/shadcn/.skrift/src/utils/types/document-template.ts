export interface DocumentTemplate {
  (props: Record<string, unknown> | Record<string, never>): React.ReactNode;
  PreviewProps?: Record<string, unknown>;
}

export const isDocumentTemplate = (val: unknown): val is DocumentTemplate => {
  return typeof val === 'function';
};
