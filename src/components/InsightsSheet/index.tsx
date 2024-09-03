import { ScrollArea } from "@radix-ui/react-scroll-area";
import BlurFade from "../magicui/blur-fade";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Dispatch, SetStateAction } from "react";
import Loader from "../loader";
import { TriangleAlert } from "lucide-react";

interface InsightsSheetProps {
  openInsights: boolean;
  setOpenInsights: Dispatch<SetStateAction<boolean>>;
  insights: any;
  insightsLoading: boolean;
  error: string | null;
}

const InsightsSheet = ({
  openInsights,
  setOpenInsights,
  insights,
  insightsLoading,
  error,
}: InsightsSheetProps) => {
  return (
    <Sheet open={openInsights} onOpenChange={setOpenInsights}>
      <SheetContent className="insigtsBg rounded-none border-0 text-white">
        {error ? (
          <>
            <BlurFade delay={0.2}>
              <div className="h-[90vh] flex flex-col items-center justify-center">
                <TriangleAlert size={60} className="text-red-500" />
                <p className="text-xl mt-5 font-semibold">{error}</p>
              </div>
            </BlurFade>
          </>
        ) : (
          insights && (
            <BlurFade delay={0.2}>
              <SheetHeader className="">
                <SheetTitle className="text-white text-left">
                  {insights.label}
                </SheetTitle>
                <SheetDescription className="text-white text-left">
                  {insights.desc}
                </SheetDescription>
              </SheetHeader>
              <div className="my-8 w-full h-[1px] bg-gray-500"></div>
              {insights?.insights && (
                <BlurFade delay={0.2} className="mt-5">
                  <ScrollArea className="h-[70vh]">
                    {insights?.insights?.map((each: any, i: any) => (
                      <div
                        key={i}
                        className="text-white mb-3 pb-5 border-b border-b-gray-800"
                      >
                        <h3 className="text-base font-bold mb-1">
                          {each.title}
                        </h3>
                        <p className="text-sm font-normal">
                          {each.description}
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
                </BlurFade>
              )}
            </BlurFade>
          )
        )}
        {insightsLoading && <Loader className="h-full" />}
      </SheetContent>
    </Sheet>
  );
};

export default InsightsSheet;
