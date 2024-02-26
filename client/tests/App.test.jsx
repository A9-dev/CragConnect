import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";

describe("Correct rendering", () => {
  test("renders App component", () => {
    render(<App />);
    const linkElement = screen.getByText(/CragConnect/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Renders navigation buttons", () => {
    render(<App />);
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
    render(<App />);
    // Check for the presence of the Feed buttons, Feed, Following, Search
    const feedButton = screen.getByText(/Feed/i);
    const followingButton = screen.getByText(/Following/i);
    expect(feedButton).toBeInTheDocument();
    expect(followingButton).toBeInTheDocument();
  });

  test("Renders the Search button", () => {
    render(<App />);
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
});
