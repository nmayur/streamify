export type RecentStreams = {
  songName: string;
  artist: string;
  dateStreamed: string;
  streamCount: number;
  userId: string;
  topLocations: string[];
};

// Types for Key Metrics
export type KeyMetrics = {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
  topGenre: string;
  topAlbum: string;
  albumCover: string;
};

// Types for User Growth Data
export type UserGrowthData = {
  month: string; // Format: YYYY-MM
  totalUsers: number;
  activeUsers: number;
};

// Types for Revenue Distribution Data
export type RevenueDistribution = {
  subscriptions: number;
  ads: number;
  locationWithMostSubscriptions: string;
  locationsWithTopAdsConsumption: string[];
};

// Types for Top Streamed Songs
export type TopStreamedSong = {
  songName: string;
  streamCount: number;
};

// Types for Active Users Data
export type Distribution = {
  label: string;
  users: number;
};

export type ActiveUsersData = {
  totalUsers: number;
  activeUsers: number;
  countryDistribution: Distribution[];
};

// Types for Genre Data
export type UserGenrePreference = {
  userId: string;
  preferredGenres: string[];
};

export type TrendingGenresByLocation = {
  [location: string]: string; // e.g., "USA": "Pop"
};

export type TrendingGenresByAgeGroup = {
  [ageGroup: string]: string; // e.g., "18-24": "Hip-Hop"
};

export type GenreData = {
  userPreferences: UserGenrePreference[];
  trendingGenres: {
    byLocation: TrendingGenresByLocation;
    byAgeGroup: TrendingGenresByAgeGroup;
  };
};

// Combined Type for Overall Dashboard Data
export type MetricsData = {
  keyMetrics: KeyMetrics;
  userGrowth: UserGrowthData[];
  revenueDistribution: RevenueDistribution;
  topStreamedSongs: TopStreamedSong[];
  activeUsers: ActiveUsersData;
  genreData: GenreData;
};

export type PieChartDataItem = {
  label: string;
  users: number;
  fill: string;
};

export type InsightsPayload = {
  label: string;
  desc: string;
  prompt: string;
  type: string;
};

