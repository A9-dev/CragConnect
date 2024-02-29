import { cleanup, render, screen } from "@testing-library/react";

import App from "../src/App";
import { fireEvent } from "@testing-library/dom";
import { deleteTestPosts } from "../src/dbFunctions";
import {
  beforeEach,
  expect,
  describe,
  afterEach,
  afterAll,
  test,
} from "vitest";
import { act } from "react-dom/test-utils";
describe("Posting", () => {
  beforeEach(async () => {
    // Render the App component
    act(() => {
      render(<App />);
    });

    // await new Promise((r) => setTimeout(r, 500));

    // Click the login button
    const loginButton = screen.getByTestId("login-button");

    act(() => {
      fireEvent.click(loginButton);
    });
    // Wait for the modal to appear
    const usernameInput = await screen.findByLabelText(/Username/i);
    const passwordInput = await screen.findByLabelText(/Password/i);

    // Input testAccount for the username and password

    act(() => {
      fireEvent.change(usernameInput, { target: { value: "testAccount" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
    });
    // Click the submit button
    const submitButton = screen.getByTestId("login-button-submit");

    act(() => {
      fireEvent.click(submitButton);
    });

    // Wait for the profile button to appear
    const profileButton = await screen.findByTestId("profile-button");
    expect(profileButton).toBeVisible();
    const createPostButton = await screen.findByTestId("create-post-button");
    expect(createPostButton).toBeVisible();
  });

  afterEach(() => {
    cleanup();
  });

  afterAll(async () => {
    await deleteTestPosts().catch((error) => {
      console.error("Error:", error);
    });
  });

  test("Navigate to the news page", async () => {
    const newsButton = screen.getByTestId("news-button");
    act(() => {
      fireEvent.click(newsButton);
    });
    const newsPage = await screen.findByTestId("news-page");
    expect(newsPage).toBeVisible();
  });
});
