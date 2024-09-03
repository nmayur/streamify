import { render, screen } from "@testing-library/react";
import RecentStreamsTable from "./index";
import { RecentStreams } from "@/shared/types";

// Mock data for testing
const mockRecentStreams: Array<RecentStreams> = [
    {
        songName: "Blinding Lights",
        artist: "The Weeknd",
        dateStreamed: "2024-08-28",
        streamCount: 5000,
        userId: "user_101",
        topLocations: ["USA", "India", "UK"],
    },
    {
        songName: "Levitating",
        artist: "Dua Lipa",
        dateStreamed: "2024-08-28",
        streamCount: 4500,
        userId: "user_102",
        topLocations: ["Canada", "Australia", "UK"],
    }
];

describe("RecentStreamsTable", () => {
    it("renders the table with the correct data", () => {
        render(<RecentStreamsTable songs={mockRecentStreams} />);

        // Check if the table is rendered
        const tableElement = screen.getByTestId("table");
        expect(tableElement).toBeInTheDocument();

        // Check if the correct number of rows are rendered (including header row)
        const tableRow = screen.getAllByTestId("table-row");
        expect(tableRow).toHaveLength(mockRecentStreams.length);

        // Check if the song titles are rendered for each song
        mockRecentStreams.forEach((stream) => {
            expect(screen.getByText(stream.songName)).toBeInTheDocument();
        });

        // Check if the artist names are rendered for each song
        mockRecentStreams.forEach((stream) => {
            expect(screen.getByText(stream.artist)).toBeInTheDocument();
        });

        // Check if the streamCounts are rendered for each song
        mockRecentStreams.forEach((stream) => {
            expect(screen.getByText(stream.streamCount)).toBeInTheDocument();
        });
    });
});
