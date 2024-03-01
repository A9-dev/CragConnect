import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import { fireEvent } from "@testing-library/dom";
import { expect, describe, test, beforeEach, afterEach } from "vitest";
import { act } from "react-dom/test-utils";
import { cleanup } from "@testing-library/react";
describe("Correct rendering", () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {
    cleanup();
  });
  test("renders App component", () => {
    const linkElement = screen.getByText(/CragConnect/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Renders navigation buttons", () => {
    // Check for the presence of the navigation buttons, Home, News, Events, GearShare, Fitness
    const homeButton = screen.getByText(/Home/i);
    const newsButton = screen.getByText(/News/i);
    const eventsButton = screen.getByText(/Events/i);
    const gearShareButton = screen.getByText(/GearShare/i);
    const fitnessButton = screen.getByText(/Fitness/i);
    expect(homeButton).toBeInTheDocument();
    expect(newsButton).toBeInTheDocument();
    expect(eventsButton).toBeInTheDocument();
    expect(gearShareButton).toBeInTheDocument();
    expect(fitnessButton).toBeInTheDocument();
  });

  test("Renders the Feed buttons", () => {
    // Check for the presence of the Feed buttons, Feed, Following, Search
    const feedButton = screen.getByText(/Feed/i);
    const followingButton = screen.getByText(/Following/i);
    expect(feedButton).toBeInTheDocument();
    expect(followingButton).toBeInTheDocument();
  });

  test("Renders the Search button", () => {
    // Check for the presence of 2 Search buttons
    const searchButtons = screen.getAllByText(/Search/i);
    expect(searchButtons.length).toEqual(2);
  });

  test("Renders the posts", async () => {
    render(<App />);
    // Wait for the posts to load
    await waitFor(() => {
      const posts = screen.getAllByText(/Test post/i);
      expect(posts.length).toBeGreaterThan(0);
    });
  });

  describe("Search testing", () => {
    test("Search for users", async () => {
      // Click the first search button
      const searchButton = screen.getByTestId("search-button");
      act(() => {
        searchButton.click();
      }); // Wait for the search to load
      const searchBar = await screen.findByTestId("search-bar");

      expect(searchBar).toBeVisible();
      act(() => {
        //Type in testAccount with fireevent
        fireEvent.change(searchBar, { target: { value: "testAccount" } });
      });

      const submitButton = screen.getByTestId("submit-search-button");
      act(() => {
        fireEvent.click(submitButton);
      });
      await waitFor(async () => {
        expect(await screen.findByText(/@testAccount/i)).toBeVisible();
        // Expect testAccountO to not be visible - because it is not a user but is an organisation
        expect(screen.queryByText(/@testAccountO/i)).toBeNull();
      });
    });
  });
});
