"use client";

import { RecentStreams, TopStreamedSong } from "@/shared/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { artistFilterFunction } from "./utils";

const handleSort = (
  column: Column<RecentStreams, unknown> | Column<TopStreamedSong, unknown>,
  label: string
) => {
  return (
    <div className="flex items-center gap-4">
      {label}
      <button
        className="p-2 bg-slate-800 rounded hover:bg-slate-950 transition-all"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <ArrowUpDown size={14} />
      </button>
    </div>
  );
};

export const recentStreamsColumns: ColumnDef<RecentStreams>[] = [
  {
    accessorKey: "songName",
    header: ({ column }) => handleSort(column, "Song"),
  },
  {
    accessorKey: "artist",
    header: ({ column }) => handleSort(column, "Artist"),
    filterFn: artistFilterFunction,
  },
  {
    accessorKey: "dateStreamed",
    header: ({ column }) => handleSort(column, "Last streamed on"),
  },
  {
    accessorKey: "streamCount",
    header: ({ column }) => handleSort(column, "Total streams"),
  },
  {
    accessorKey: "topLocations",
    header: ({ column }) => handleSort(column, " Top locations"),
  },
];

export const topStreamedSongsColumns: ColumnDef<TopStreamedSong>[] = [
  {
    accessorKey: "songName",
    header: ({ column }) => handleSort(column, "Song"),
  },
  {
    accessorKey: "streamCount",
    header: ({ column }) => handleSort(column, "Total streams"),
  },
];
