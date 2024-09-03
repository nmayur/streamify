import { FilterFn } from "@tanstack/react-table";

export const artistFilterFunction: FilterFn<any> = (
  row,
  columnId,
  filterValue
) => {
  if (!Array.isArray(filterValue)) return true;
  const artist = row.getValue(columnId)?.toString().toLowerCase();

  // Return true if the artist matches any of the selected values
  const data = filterValue.some(
    (selectedArtist: string) =>
      artist?.length && artist.includes(selectedArtist.toLowerCase())
  );
  return data;
};
