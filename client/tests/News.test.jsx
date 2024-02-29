import { cleanup, render, screen, waitFor } from "@testing-library/react";
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
describe("News tests", () => {
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
      fireEvent.change(usernameInput, { target: { value: "testAccountO" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
    });
    // Click the submit button
    const submitButton = screen.getByTestId("login-button-submit");

    act(() => {
      fireEvent.click(submitButton);
    });

    // Wait for the profile button to appear
    const profileButton = await screen.findByTestId("profile-button");
    await waitFor(() => {
      expect(profileButton).toBeVisible();
    });

    const newsButton = screen.getByTestId("news-button");
    act(() => {
      fireEvent.click(newsButton);
    });
    const newsPage = await screen.findByTestId("news-page");
    expect(newsPage).toBeVisible();
    const postForm = await screen.findByTestId("create-news-post-button");
    await waitFor(() => {
      expect(postForm).toBeVisible();
    });
  });

  afterEach(() => {
    cleanup();
  });

  afterAll(async () => {
    await deleteTestPosts().catch((error) => {
      console.error("Error:", error);
    });
  });

  test("Modal appears when clicking the post form", async () => {
    const postForm = await screen.findByTestId("create-news-post-button");
    act(() => {
      fireEvent.click(postForm);
    });
    const modal = await screen.findByTestId("create-news-post-modal");
    await waitFor(() => {
      expect(modal).toBeVisible();
    });
  });

  test("Error message appears when posting without a title", async () => {
    const postForm = await screen.findByTestId("create-news-post-button");
    act(() => {
      fireEvent.click(postForm);
    });
    const modal = await screen.findByTestId("create-news-post-modal");
    await waitFor(() => {
      expect(modal).toBeVisible();
    });
    const postButton = await screen.findByText("Post");
    act(() => {
      fireEvent.click(postButton);
    });
    const error = await screen.findByText("Please enter a title and content");
    await waitFor(() => {
      expect(error).toBeVisible();
    });
  });

  test("News post can be created", async () => {
    const postForm = await screen.findByTestId("create-news-post-button");
    act(() => {
      fireEvent.click(postForm);
    });
    const modal = await screen.findByTestId("create-news-post-modal");
    await waitFor(() => {
      expect(modal).toBeVisible();
    });
    const titleInput = await screen.findByPlaceholderText("Enter title");
    const contentInput = await screen.findByPlaceholderText("Enter content");
    act(() => {
      fireEvent.change(titleInput, { target: { value: "Test Title" } });
      fireEvent.change(contentInput, { target: { value: "Test content" } });
    });
    const postButton = await screen.findByText("Post");
    act(() => {
      fireEvent.click(postButton);
    });
    const post = await screen.findByText("Test Title");
    await waitFor(() => {
      expect(post).toBeVisible();
    });
  });
});
