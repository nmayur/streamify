"use client";
import React, { useState, useMemo } from "react";
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
import { ChevronsLeft, ChevronsRight, CircleX } from "lucide-react";
import { artistFilterFunction } from "./utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/shared/utils";

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

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  // Use useMemo to memoize the unique artists
  const uniqueArtists = useMemo(() => Array.from(new Set(data.map((stream) => stream.artist))), [data]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  // Use useReactTable for table functionalities
  const table = useReactTable({
    data,
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
      value.length ? [...prev.filter((f) => f.id !== columnId), { id: columnId, value }] : prev.filter((f) => f.id !== columnId)
    );
  };

  return (
    <div className="overflow-hidden">
      <div className="flex flex-wrap items-center py-4">
        <input
          placeholder="Filter by artist or song name..."
          value={globalFilter}
          onChange={(event) => handleFilterChange(event.target.value)}
          className="md:max-w-sm w-full bg-slate-950 rounded-md px-4 py-[0.5rem] md:mr-3 md:ml-1 md:mb-0 mb-2 text-sm text-white"
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
            <CircleX className="h-4 w-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="w-[calc(100vw-3rem)] lg:w-auto whitespace-nowrap pb-4">
        <div className="rounded-md border border-slate-700 overflow-x-auto">
          <Table data-testid="table">
            <TableHeader className="bg-slate-900">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-slate-900 border-slate-600">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-white font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow data-testid="table-row" key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-transparent border-slate-600">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
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
