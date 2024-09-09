"use client";

import { RecentStreams, TopStreamedSong } from "@/shared/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { artistFilterFunction } from "./utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[200px] truncate font-medium">
            {row.getValue("songName")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "artist",
    header: ({ column }) => handleSort(column, "Artist"),
    filterFn: artistFilterFunction,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="w-[200px] truncate text-left">
                {row.getValue("artist")}
              </TooltipTrigger>
              <TooltipContent>{row.getValue("artist")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "dateStreamed",
    header: ({ column }) => handleSort(column, "Last streamed on"),
  },
  {
    accessorKey: "dateJoined",
    header: ({ column }) => handleSort(column, "Date Joined"),
  },
  {
    accessorKey: "streamCount",
    header: ({ column }) => handleSort(column, "Total streams"),
  },
  {
    accessorKey: "topLocations",
    header: ({ column }) => handleSort(column, " Top locations"),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[200px] truncate font-medium">
            {(row.getValue("topLocations") as string[]).join(", ")}
          </span>
        </div>
      );
    },
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
