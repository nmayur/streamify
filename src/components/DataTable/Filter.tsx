import React from "react";
import { Column } from "@tanstack/react-table";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/shared/utils";
import { CheckIcon, ListFilter } from "lucide-react";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: Array<string>;
  handleColumnFilterChange: (columnId: string, filterValues: string[]) => void;
}

export function Filter<TData, TValue>({
  column,
  title,
  options,
  handleColumnFilterChange,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  // Helper function to handle option selection
  const handleOptionSelect = (option: string) => {
    const newSelectedValues = new Set(selectedValues);
    if (newSelectedValues.has(option)) {
      newSelectedValues.delete(option);
    } else {
      newSelectedValues.add(option);
    }
    handleColumnFilterChange(column?.id as string, Array.from(newSelectedValues));
  };

  // Helper function to clear filters
  const clearFilters = () => {
    column?.setFilterValue(undefined);
  };

  // Compute filtered options only once per render
  const filteredOptions = options.filter((option) => selectedValues.has(option));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center text-sm border-2 whitespace-nowrap rounded-md border-slate-700 px-3 py-1 mr-3">
          <ListFilter size={16} className="mr-2" />
          Filter by {title}
          {selectedValues.size > 0 && (
            <>
              {/* <Separator orientation="vertical" className="mx-2 h-4" /> */}
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.size}
              </Badge>
              {/* <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-2 font-normal text-xs bg-slate-900 text-white hover:bg-slate-950"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  filteredOptions.map((option) => (
                    <Badge
                      variant="secondary"
                      key={option}
                      className="rounded-sm px-2 font-normal text-xs bg-slate-900 text-white hover:bg-slate-950"
                    >
                      {option}
                    </Badge>
                  ))
                )}
              </div> */}
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option);
                return (
                  <CommandItem key={option} onSelect={() => handleOptionSelect(option)}>
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <span>{option}</span>
                    {facets?.get(option) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={clearFilters} className="justify-center text-center">
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
