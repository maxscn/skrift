import * as Popover from '@radix-ui/react-popover';
import * as React from 'react';
import { toast } from 'sonner';
import { Button } from './button';
import { Text } from './text';

export const Print = ({ iframe }: { iframe: React.Ref<HTMLIFrameElement> }) => {

  const onFormSubmit = async (e: React.FormEvent) => {
    if (typeof window === 'undefined') {
      return;
    }
    e.preventDefault();
    console.log(iframe, iframe.current)
    iframe.current.contentWindow.focus();
    iframe.current.contentWindow.print();
  };


  return (
    <button
      className="box-border flex h-5 w-20 items-center justify-center self-center rounded-lg border border-slate-6 bg-slate-2 px-4 py-4 text-center font-sans text-sm text-slate-11 outline-none transition duration-300 ease-in-out hover:border-slate-10 hover:text-slate-12"
      type="submit"
      onClick={onFormSubmit}
    >
      Print
    </button>

  );
};
