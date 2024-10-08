"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InsightsPayload, MetricsData, RecentStreams } from "@/shared/types";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/shared/constants";
import Header from "@/components/Header";
import { fetchAIInsights } from "@/shared/utils";
import Loader from "@/components/loader";

// Dynamically import all components for lazy loading
const KeyMetrics = dynamic(() => import("@/components/KeyMetrics"), {
  ssr: false,
});
const UserGrowth = dynamic(() => import("@/components/UserGrowth"), {
  ssr: false,
});
const RevenueData = dynamic(() => import("@/components/Revenue"), {
  ssr: false,
});
const TopArtist = dynamic(() => import("@/components/TopArtist"), {
  ssr: false,
});
const RecentStreamsTable = dynamic(() => import("@/components/DataTable"), {
  ssr: false,
});
const UsersByLocation = dynamic(() => import("@/components/UsersByLocation"), {
  ssr: false,
});
const TopStreams = dynamic(() => import("@/components/TopStreams"), {
  ssr: false,
});
const InsightsSheet = dynamic(() => import("@/components/InsightsSheet"), {
  ssr: false,
});

export default function Home() {
  const [songs, setSongs] = useState<RecentStreams[]>([]);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [openInsights, setOpenInsights] = useState<boolean>(false);
  const [insights, setInsights] = useState<any | null>(null);
  const [insightsLoading, setInsightsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cache states for insights
  const [cachedInsights, setCachedInsights] = useState<Record<string, any>>({});

  const fetchData = useCallback(async () => {
    try {
      const [songsResponse, metricsResponse] = await Promise.all([
        fetch("/api/recentStreams"),
        fetch("/api/metrics"),
      ]);

      const [songsData, metricsData] = await Promise.all([
        songsResponse.json(),
        metricsResponse.json(),
      ]);

      setSongs(songsData);
      setMetrics(metricsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getAIInsights = useCallback(
    async (data: InsightsPayload) => {
      setInsightsLoading(true);
      setOpenInsights(true);
      setError(null);

      // Check if insights already exist in the cache
      if (cachedInsights[data.type]) {
        setInsights(cachedInsights[data.type]);
        setInsightsLoading(false);
        return;
      } else {
        setInsights(null);
        setInsightsLoading(true);
      }

      const aiInsights = await fetchAIInsights(data);
      setInsightsLoading(false);

      if (aiInsights.error) {
        setError("Something Went Wrong!!");
        return;
      }

      if (aiInsights) {
        const newInsight = { ...data, insights: aiInsights };
        setInsights(newInsight);
        setCachedInsights((prev) => ({ ...prev, [data.type]: newInsight }));
      } else {
        setInsights(null);
      }
    },
    [cachedInsights]
  );

  const recentStreamedSongsTable = useMemo(
    () => <RecentStreamsTable songs={songs} />,
    [songs]
  );

  return (
    <>
      <div className="flex relative">
        <aside className="w-[300px] sticky top-0 h-screen bg-cyan-800 flex-shrink-0 lg:block hidden">
          side nav
        </aside>

        <ScrollArea className="min-h-screen h-[100vh] w-full lg:w-[calc(100vw-300px)] bg-primary-gradient pl-2 md:pl-3 py-2 pr-4 ">
          <div className="">
            {metrics ? (
              <>
                <Header />
                <BlurFade
                  delay={BLUR_FADE_DELAY}
                  className="flex flex-wrap gap-x-2 gap-y-3 mb-5 justify-between"
                >
                  <>
                    <TopArtist
                      keyMetrics={metrics.keyMetrics}
                      className="w-full h-[300px] md:h-auto md:w-[30%] lg:w-[20%]"
                    />
                    <KeyMetrics
                      metrics={metrics}
                      className="w-full md:w-[45%] lg:w-[25%] min-w-[250px]"
                    />
                    <RevenueData
                      metrics={metrics}
                      className="w-full md:w-[45%] lg:w-[25%] min-w-[250px] flex-shrink-0"
                      onInsightClick={getAIInsights}
                    />
                    <UsersByLocation
                      data={metrics.activeUsers.countryDistribution}
                      className="w-full md:w-[45%] lg:w-[25%] min-w-[250px] flex-shrink-0"
                    />
                    <UserGrowth
                      metrics={metrics}
                      className="w-full md:w-1/2 lg:w-[50%] min-w-[250px] flex-shrink-0"
                      onInsightClick={getAIInsights}
                    />
                    <TopStreams
                      metrics={metrics}
                      className="w-full md:w-[45%] lg:w-[48%] order-7"
                    />

                    <section className="w-full text-white cardBg order-7">
                      <div className="px-4 pt-4">
                        <h2>Recent Streamed Songs</h2>
                      </div>
                      {recentStreamedSongsTable}
                    </section>
                  </>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY} inView>
                  <p className="text-sm w-full text-center mt-8 pb-4 text-gray-200">
                    Copyright © 2024. Streamify
                  </p>
                </BlurFade>
              </>
            ) : (
              <Loader className="h-screen" />
            )}
          </div>

          <InsightsSheet
            openInsights={openInsights}
            setOpenInsights={setOpenInsights}
            insights={insights}
            error={error}
            insightsLoading={insightsLoading}
          />
        </ScrollArea>
      </div>
    </>
  );
}
