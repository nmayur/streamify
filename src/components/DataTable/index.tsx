import { RecentStreams, TopStreamedSong } from "@/shared/types";
import { recentStreamsColumns, topStreamedSongsColumns } from "./Columns";
import { DataTable } from "./Table";

const RecentStreamsTable = ({
  songs,
}: {
  songs: Array<RecentStreams>;
}) => {

  return (
    <div className="px-3 mx-auto text-white">
      <DataTable columns={recentStreamsColumns} data={songs} />
    </div>
  );
};

export default RecentStreamsTable;
