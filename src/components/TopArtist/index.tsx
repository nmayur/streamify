import { KeyMetrics } from "@/shared/types";
import { cn } from "@/shared/utils";
import Image from "next/image";

const TopArtist = ({
  keyMetrics,
  className,
}: {
  keyMetrics: KeyMetrics;
  className?: string;
}) => {
  return (
    <>
      <div className={cn("cardBg overflow-hidden relative", className)}>
        <div className="px-4 pb-10 pt-2 absolute text-white w-full left-0 z-10 top-0 bg-gradient-to-b from-indigo-950">
          <p className="text-base text-gray-300 font-medium">Top Artist</p>
        </div>
        <Image
          src={keyMetrics.albumCover}
          alt={keyMetrics.topArtist}
          fill
          className="w-full h-full object-cover"
        />

        <div className="px-4 pb-4 pt-16 mt-2 absolute text-white w-full left-0 z-10 bottom-0 bg-gradient-to-t from-blue-950">
          <h2 className="text-lg font-semibold">{keyMetrics.topArtist}</h2>
          <div className="flex justify-between">
            <p className="text-base font-medium">{keyMetrics.topAlbum}</p>
            <p className="text-base font-medium">{keyMetrics.topGenre}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopArtist;
