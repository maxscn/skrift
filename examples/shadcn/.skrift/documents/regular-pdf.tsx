import {
  Document,
  Page,
  Tailwind,
  Unbreakable,
  usePageSize
} from '@skrift/components';
interface RegularPDFProps {
  // pageSize is automatically provided by the server-side rendering
  // when a page size is selected in the preview UI
  pageSize?: string;
}

const PageSizeDemo = () => {
  const pageSize = usePageSize();
  
  return (
    <div className="bg-blue-500 text-white p-4 rounded">
      <p className="text-sm font-bold">Current Page Size: {pageSize?.name || 'Default'}</p>
      <p className="text-xs">
        Dimensions: {pageSize?.dimensions.width || 'unknown'}px × {pageSize?.dimensions.height || 'unknown'}px
      </p>
    </div>
  );
};


export const RegularPDF = ({
  pageSize
}: RegularPDFProps) => (
  <Document pageSize={pageSize}>
    <Tailwind>
      <head />
      
      <Page>
        <PageSizeDemo />
        <p className="text-black mt-4">This content is now inside a Page component that responds to the selected page size.</p>
      </Page>

      <Page>
        <div className="bg-red-500 w-full h-96">
          <p className="text-white p-4 mt-0">This is page 2 with the red background, now using responsive Page components.</p>
        </div>
      </Page>
      
      <Page>
        <Unbreakable>
          <div className="bg-green-500 w-full h-64">
            <p className="text-white p-4 mt-0">This is page 3 inside an Unbreakable component.</p>
          </div>
        </Unbreakable>
      </Page>
    </Tailwind>
  </Document>
);



RegularPDF.PreviewProps = {} as RegularPDFProps;

export default RegularPDF;
