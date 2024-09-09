"use client";
import React, { useState, useMemo, useEffect } from "react";
import { addDays, format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  FilterFn,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter } from "@/components/DataTable/Filter";
import { RecentStreams, TopStreamedSong } from "@/shared/types";
import { Calendar as CalendarIcon, ListFilter } from "lucide-react";
import { ChevronsLeft, ChevronsRight, CircleX } from "lucide-react";
import { artistFilterFunction } from "./utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/shared/utils";
import { Calendar } from "../ui/calendar";
import { DateAfter, DateRange } from "react-day-picker";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: RecentStreams[];
}

// Global filter function to handle artist and song name filtering
const globalFilterFunction: FilterFn<any> = (row, columnId, filterValue) => {
  // Handle multiple artist selection
  if (Array.isArray(filterValue)) {
    const artist = row.getValue("artist")?.toString().toLowerCase() || "";

    // Return true if the artist matches any of the selected artists
    return filterValue.some((selectedArtist: string) =>
      artist.includes(selectedArtist.toLowerCase())
    );
  }

  // Ensure filterValue is a string
  if (typeof filterValue !== "string") return true;

  // Convert values to lowercase for case-insensitive comparison
  const artist = row.getValue("artist")?.toString().toLowerCase() || "";
  const songName = row.getValue("songName")?.toString().toLowerCase() || "";
  const searchValue = filterValue.toLowerCase();

  // Check if either artist or songName matches the filter value
  const artistMatch = artist.includes(searchValue);
  const songNameMatch = songName.includes(searchValue);

  // Return true if either matches, otherwise return false
  return artistMatch || songNameMatch;
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = useState<any>(data);
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(
    null
  );

  // Use useMemo to memoize the unique artists
  const uniqueArtists = useMemo(
    () => Array.from(new Set(data.map((stream: any) => stream.artist))),
    [tableData]
  );

  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>(
    {
      from: new Date(),
      to: new Date(),
    }
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  // Use useReactTable for table functionalities
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterFunction,
    filterFns: {
      artist: artistFilterFunction,
    },
    initialState: {
      pagination: { pageSize: 5 },
    },
    state: { sorting, columnFilters, globalFilter },
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  // Memoize functions to avoid creating new instances on each render
  const handleFilterChange = (value: string) => setGlobalFilter(value);
  const handleColumnFilterChange = (columnId: string, value: string[]) => {
    setColumnFilters((prev) =>
      value.length
        ? [...prev.filter((f) => f.id !== columnId), { id: columnId, value }]
        : prev.filter((f) => f.id !== columnId)
    );
  };

  const getSelectedDateRange = (range: string) => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - Number(range));
    return { today, pastDate };
  };

  const filterDataByDateJoined = (range: any) => {
    // if no date range, set back OG table data along with other filters
    if (!range) {
      setTableData(data);
      return;
    }

    if (range === "custom") {
      if (customDateRange?.from && customDateRange?.to) {
        const filteredData = data.filter((item: any) => {
          const dateJoined = new Date(item.dateJoined);
          // @ts-ignore
          return (
            dateJoined >= (customDateRange as any).from &&
            dateJoined <= (customDateRange as any).to
          );
        });
        setTableData(filteredData);
      }
    } else {
      // if date range filter and set the data
      const { pastDate, today } = getSelectedDateRange(range);
      const filteredData = data.filter((item: any) => {
        const dateJoined = new Date(item.dateJoined);
        return dateJoined >= pastDate && dateJoined <= today;
      });

      setTableData(filteredData);
    }
  };

  useEffect(() => {
    filterDataByDateJoined(selectedDateRange);
  }, [selectedDateRange, customDateRange, columnFilters, globalFilter]);

  return (
    <div className="overflow-hidden">
      <div className="flex flex-wrap justify-between items-center py-4 relative">
        <div className="flex flex-wrap lg:flex-nowrap flex-1">
          <input
            placeholder="Filter by artist or song name..."
            value={globalFilter}
            onChange={(event) => handleFilterChange(event.target.value)}
            className="md:max-w-sm w-full bg-slate-950 rounded-md px-4 py-[0.5rem] md:mr-3 md:ml-1 md:mb-0 mb-2 text-sm text-white flex-shrink-0"
          />

          {table.getColumn("artist") && (
            <Filter
              column={table.getColumn("artist")}
              title="Artist"
              options={uniqueArtists}
              handleColumnFilterChange={handleColumnFilterChange}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3 hover:bg-slate-950 hover:text-white"
            >
              <CircleX className="h-4 w-4 mr-2" /> Clear
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center mt-4 md:mt-0 border-t border-t-slate-700 pt-3 lg:border-0 lg:pt-0">
          <div className="mr-3 mb-3 md:mb-0">
            <RadioGroup defaultValue="option-all" className="flex gap-3 md:gap-4 text-xs md:text-sm whitespace-nowrap">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-all"
                  id="option-all"
                  className="border-white text-slate-50"
                  onClick={() => {
                    setSelectedDateRange(null);
                    setCustomDateRange(undefined);
                  }}
                />
                <label htmlFor="option-all">All Data</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-one"
                  id="option-one"
                  className="border-white text-slate-50"
                  onClick={() => setSelectedDateRange("30")}
                />
                <label htmlFor="option-one">Past 30 Days</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-two"
                  id="option-two"
                  className="border-white text-slate-50"
                  onClick={() => setSelectedDateRange("60")}
                />
                <label htmlFor="option-two">Past 60 Days</label>
              </div>
            </RadioGroup>
          </div>

          {
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full mt-2 md:mt-0  md:w-[250px]  justify-start text-left font-normal bg-slate-900 hover:bg-slate-900 text-white hover:text-white border-slate-900 mr-1 py-0 px-2",
                    !customDateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 w-4" />
                  {customDateRange?.from ? (
                    customDateRange.to ? (
                      <>
                        {format(customDateRange.from, "LLL dd, y")} -{" "}
                        {format(customDateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(customDateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto !z-50 p-0 bg-white text-black rounded-md"
                align="end"
              >
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={customDateRange?.from}
                  selected={customDateRange}
                  disabled={{ after: new Date() }}
                  onSelect={(range) => {
                    setCustomDateRange(range);
                    if (range?.from && range?.to) {
                      setSelectedDateRange("custom");
                    }
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          }
        </div>
      </div>

      <ScrollArea className="w-[calc(100vw-300px-3.5rem)] whitespace-nowrap pb-4">
        <div className="rounded-md border border-slate-700 overflow-x-auto">
          <Table data-testid="table" className="min-h-[330px]">
            <TableHeader className="bg-slate-900">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-slate-900 border-slate-600"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-white font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="min-h-[300px]">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    data-testid="table-row"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-transparent border-slate-600"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className=" align-baseline">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {data && data.length > 5 && (
        <div className="flex items-center space-x-2 pb-4 text-black">
          <button
            className={cn(
              "p-2 bg-slate-800 rounded hover:bg-slate-950 transition-all text-white",
              !table.getCanPreviousPage() ? "text-gray-500" : ""
            )}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </button>
          <button
            className={cn(
              "p-2 bg-slate-800 rounded hover:bg-slate-950 transition-all text-white",
              !table.getCanNextPage() ? "text-gray-500" : ""
            )}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </button>
        </div>
      )}
    </div>
  );
}
