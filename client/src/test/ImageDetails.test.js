import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import ImageDetails from "./ImageDetails";
import { MemoryRouter, Route } from "react-router-dom";

jest.mock("axios");

describe("ImageDetails", () => {
    test("renders image details correctly", async () => {
        const mockData = {
            data: {
                collection: {
                    items: [
                        {
                            data: [
                                {
                                    title: "Test Image",
                                    nasa_id: "123",
                                    center: "NASA Center",
                                    date_created: "2024-05-19",
                                    description: "Test description",
                                    keywords: ["test", "space"],
                                },
                            ],
                            links: [{ href: "test_image_url.jpg" }],
                        },
                    ],
                },
            },
        };

        axios.get.mockResolvedValue(mockData);

        render(
            <MemoryRouter initialEntries={["/images/123"]}>
                <Route path="/images/:id">
                    <ImageDetails />
                </Route>
            </MemoryRouter>
        );

        // No need for waitFor since we're not making actual network requests

        expect(screen.getByAltText("Test Image")).toBeInTheDocument();
        expect(screen.getByText("Test Image")).toBeInTheDocument();
        expect(screen.getByText("NASA ID: 123")).toBeInTheDocument();
        expect(screen.getByText("NASA Center")).toBeInTheDocument();
        expect(screen.getByText("Date Created: 2024-05-19")).toBeInTheDocument();
        expect(screen.getByText("Test description")).toBeInTheDocument();
        expect(screen.getByText("Keywords:")).toBeInTheDocument();
        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByText("space")).toBeInTheDocument();
    });

    test("displays error message when fetching image details fails", async () => {
        axios.get.mockRejectedValue(new Error("Failed to fetch"));

        render(
            <MemoryRouter initialEntries={["/images/123"]}>
                <Route path="/images/:id">
                    <ImageDetails />
                </Route>
            </MemoryRouter>
        );

        // No need for waitFor since we're not making actual network requests

        expect(
            screen.getByText("Error: Error fetching image details")
        ).toBeInTheDocument();
    });
});
