import React from "react";
import { render, screen } from "@testing-library/react";
import KeyMetrics from "./index";
import { metricsData } from "public/mockData";


describe("KeyMetrics Component", () => {
    it("should render without crashing", () => {
        render(<KeyMetrics metrics={metricsData} />);
        expect(screen.getByText("Key Metrics")).toBeInTheDocument();
    });

    it("should display the correct metrics", () => {
        render(<KeyMetrics metrics={metricsData} />);
        const totalUsers = screen.getByText("500 K");
        const activeUsers = screen.getByText("10 M");
        expect(totalUsers).toBeInTheDocument();
        expect(activeUsers).toBeInTheDocument();

    });


    it("should apply custom className if provided", () => {
        render(<KeyMetrics metrics={metricsData} className="custom-class" />);
        const container = screen.getByTestId("key-metrics-container");
        expect(container).toHaveClass("custom-class");
    });

});
