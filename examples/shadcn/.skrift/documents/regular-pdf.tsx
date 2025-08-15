import {
  Document,
  Tailwind,
  Unbreakable
} from '@skrift/components';
interface RegularPDFProps {}


export const RegularPDF = ({
}: RegularPDFProps) => (
  <Document>
    <Tailwind>
      <head />

      <div className="bg-red-500 w-full" style={{ height: 1123 }}>
        <p className="text-white mt-0">This is a test paragraph inside a red box.</p>
      </div>
      <div className="bg-red-500 w-full mt-4 " style={{ height: 1000 }}>
        <p className="text-white mb-4">This is a test paragraph inside a red box.</p>
      </div>
      <div className="bg-red-500 w-full " style={{ height: 1000 }}>
        <p style={{height: 998}}>whatever</p>
        <p className="text-white">This is a test paragraph inside a red box.</p>
      </div>
      <Unbreakable>

        <div className="bg-red-500 w-full mt-[194px]" style={{ height: 600 }}>
          <p className="text-white mt-10 pt-5">This is a test paragraph inside a red box.</p>
        </div>
      </Unbreakable>
    </Tailwind>
  </Document>
);



RegularPDF.PreviewProps = {} as RegularPDFProps;

export default RegularPDF;
