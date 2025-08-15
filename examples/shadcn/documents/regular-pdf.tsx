import {
  Tailwind,
} from '@skrift/components';

import { Button } from "../components/ui/button";
interface RegularPDFProps {
  validationCode: string;
}

const baseUrl = '';

export const RegularPDF = ({
  validationCode,
}: RegularPDFProps) => (
    <Tailwind>
      <head>

      </head>
      <body className="mx-auto my-auto bg-white px-2 font-sans">
        <main className="p-10">
          <Button variant="ghost">Click me </Button>
        </main>
      </body>
    </Tailwind>
);



RegularPDF.PreviewProps = {
  validationCode: '144833',
} as RegularPDFProps;

export default RegularPDF;
