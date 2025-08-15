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
            <Logo />
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
