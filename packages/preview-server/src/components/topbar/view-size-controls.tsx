import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import { cn } from '../../utils';
import { IconArrowDown } from '../icons/icon-arrow-down';
import { PAGE_SIZES, PageSize, ViewDimensions } from '@skrift/components';




interface ViewSizeControlsProps {
  viewWidth: number;
  setViewWidth: (width: number) => void;
  viewHeight: number;
  setViewHeight: (height: number) => void;
  onPresetChange?: (preset: PageSize) => void;
}



interface PresetMenuItemProps {
  name: string;
  dimensions: ViewDimensions;
  onSelect: (dimensions: ViewDimensions) => void;
}




const PresetMenuItem = ({
  name,
  dimensions,
  onSelect,
}: PresetMenuItemProps) => (
  <DropdownMenu.Item
    className="group flex w-full cursor-pointer select-none items-center justify-between rounded-md py-1.5 pr-1 pl-2 text-sm outline-none transition-colors data-[highlighted]:bg-slate-5"
    onClick={() => onSelect(dimensions)}
  >
    {name}
    <span className="flex h-fit items-center rounded-full bg-slate-6 px-2 py-1 font-medium text-slate-11 text-xs">
      {dimensions.width}x{dimensions.height}
    </span>
  </DropdownMenu.Item>
);

export const ViewSizeControls = ({
  setViewWidth,
  setViewHeight,
  onPresetChange,
}: ViewSizeControlsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handlePresetSelect = (dimensions: ViewDimensions) => {
    const preset = PAGE_SIZES.find(p => 
      p.dimensions.width === dimensions.width && 
      p.dimensions.height === dimensions.height
    )!;
    
    setViewWidth(dimensions.width);
    setViewHeight(dimensions.height);
    onPresetChange?.(preset);
  };



  return (
    <div className="relative flex h-9 w-fit overflow-hidden rounded-lg border border-slate-6 text-sm transition-colors duration-300 ease-in-out focus-within:border-slate-8 hover:border-slate-8">
      <DropdownMenu.Root open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="relative flex items-center justify-center overflow-hidden bg-slate-5 p-2 text-slate-11 text-sm leading-none outline-none transition-colors ease-linear focus-within:text-slate-12 hover:text-slate-12 focus:text-slate-12"
          >
            <span className="sr-only">View presets</span>
            <IconArrowDown
              className={cn(
                'transform transition-transform duration-200 ease-[cubic-bezier(.36,.66,.6,1)]',
                {
                  '-rotate-180': isDropdownOpen,
                },
              )}
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            className="flex min-w-[12rem] flex-col gap-2 rounded-md border border-slate-8 border-solid bg-black px-2 py-2 text-white"
            sideOffset={5}
          >
            {PAGE_SIZES.map((preset) => (
              <PresetMenuItem
                key={preset.name}
                name={preset.name}
                dimensions={preset.dimensions}
                onSelect={handlePresetSelect}
              />
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
