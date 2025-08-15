'use client';
import { clsx } from 'clsx';
import { useDocuments } from '../../contexts/documents';
import { cn } from '../../utils';
import { Logo } from '../logo';
import { FileTree } from './file-tree';

interface SidebarProps {
  className?: string;
  currentDocumentOpenSlug?: string;
}

export const Sidebar = ({ className, currentDocumentOpenSlug }: SidebarProps) => {
  const { documentsDirectoryMetadata } = useDocuments();

  return (
    <aside
      className={cn(
        'overflow-hidden',
        'lg:static lg:z-auto lg:max-h-screen lg:w-[16rem]',
        className,
      )}
    >
      <div className="flex w-full h-full overflow-hidden flex-col border-slate-6 border-r">
        <div
          className={clsx(
            'hidden min-h-[3.3125rem] flex-shrink items-center p-3 px-4 lg:flex',
          )}
        >
          <h2>
            <Logo />
          </h2>
        </div>
        <div className="relative grow w-full h-full overflow-y-auto overflow-x-hidden border-slate-4 border-t px-4 pb-3">
          <FileTree
            currentDocumentOpenSlug={currentDocumentOpenSlug}
            documentsDirectoryMetadata={documentsDirectoryMetadata}
          />
        </div>
      </div>
    </aside>
  );
};
