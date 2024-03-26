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

  test("Renders the post form", async () => {
    // await new Promise((r) => setTimeout(r, 500));
    const postForm = await screen.findByTestId("create-post-button");
    expect(postForm).toBeVisible();
  });

  test("Modal appears when clicking the post form", async () => {
    // await new Promise((r) => setTimeout(r, 500));
    const postForm = await screen.findByTestId("create-post-button");
    act(() => {
      fireEvent.click(postForm);
    });
    const modal = await screen.findByTestId("create-post-modal");
    await waitFor(() => {
      expect(modal).toBeVisible();
    });
  });

  test("Error message appears when submitting an empty post", async () => {
    const postForm = await screen.findByTestId("create-post-button", {
      timeout: 2000,
    });
    act(() => {
      fireEvent.click(postForm);
    });

    const modal = await screen.findByTestId("create-post-modal", {
      timeout: 3000,
    });
    await waitFor(() => {
      expect(modal).toBeVisible();
    });
    const submitButton = await screen.findByTestId("create-post-button-submit");

    act(() => {
      fireEvent.click(submitButton);
    });

    const error = await screen.findByTestId("create-post-error");
    expect(error).toBeVisible();
  });

  test("Post is created when submitting a valid post", async () => {
    // Find the create post button and click it
    const postForm = await screen.findByTestId("create-post-button");
    act(() => {
      fireEvent.click(postForm);
    });

    // Find the modal and check if it is visible
    const modal = await screen.findByTestId("create-post-modal");
    await waitFor(() => {
      expect(modal).toBeVisible();
    });

    // Find the input fields and change their values
    const titleInput = await screen.findByPlaceholderText("Enter title");
    const contentInput = await screen.findByPlaceholderText("Enter content");
    act(() => {
      fireEvent.change(titleInput, { target: { value: "Test Title" } });
      fireEvent.change(contentInput, { target: { value: "Test Content" } });
    });

    // Find the submit button and click it
    const submitButton = await screen.findByTestId("create-post-button-submit");
    act(() => {
      fireEvent.click(submitButton);
    });

    // Wait for the modal to disappear
    await waitFor(() => {
      expect(screen.queryByTestId("create-post-modal")).toBeNull();
    });

    // Check if the post is visible
    const posts = await screen.findAllByText("Test Title");
    expect(posts.length).toBe(1);
  });
});
