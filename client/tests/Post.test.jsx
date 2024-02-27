import { cleanup, render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import { fireEvent } from "@testing-library/dom";
import { deleteTestPosts } from "../src/dbFunctions";

describe("Posting", () => {
  beforeEach(async () => {
    // Render the App component
    render(<App />);

    await new Promise((r) => setTimeout(r, 500));

    // Click the login button
    const loginButton = screen.getByTestId("login-button");
    fireEvent.click(loginButton);

    // Wait for the modal to appear
    const usernameInput = await screen.findByLabelText(/Username/i);
    const passwordInput = await screen.findByLabelText(/Password/i);

    // Input testAccount for the username and password
    fireEvent.change(usernameInput, { target: { value: "testAccount" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    // Click the submit button
    const submitButton = screen.getByTestId("login-button-submit");
    fireEvent.click(submitButton);

    // Wait for the profile button to appear
    const profileButton = await screen.findByTestId("profile-button");
    expect(profileButton).toBeVisible();
  });

  afterEach(() => {
    // Delete any post with the title "Test Title"
    cleanup();
  });

  afterAll(async () => {
    await deleteTestPosts().catch((error) => {
      console.error("Error:", error);
    });
  });
  test("Renders the post form", async () => {
    const postForm = await screen.findByTestId("create-post-button");
    expect(postForm).toBeVisible();
  });

  test("Modal appears when clicking the post form", async () => {
    const postForm = await screen.findByTestId("create-post-button");
    fireEvent.click(postForm);
    const modal = await screen.findByTestId("create-post-modal");
    expect(modal).toBeVisible();
  });

  test("Error message appears when submitting an empty post", async () => {
    const postForm = await screen.findByTestId("create-post-button");
    fireEvent.click(postForm);
    const modal = await screen.findByTestId("create-post-modal");
    expect(modal).toBeVisible();
    const submitButton = await screen.findByTestId("create-post-button-submit");
    fireEvent.click(submitButton);

    await waitFor(
      async () => {
        const error = await screen.findByTestId("create-post-error");
        expect(error).toBeVisible();
      },
      { timeout: 1000 }
    );
  });

  test("Post is created when submitting a valid post", async () => {
    // Count the number of posts with the title "Test Title"

    const posts = screen.queryAllByText("Test Title");
    const initialPostCount = posts.length;

    console.log("Initial Post Count: ", initialPostCount);

    const postForm = await screen.findByTestId("create-post-button");
    fireEvent.click(postForm);
    const modal = await screen.findByTestId("create-post-modal");
    expect(modal).toBeVisible();
    const titleInput = await screen.findByPlaceholderText("Enter title");
    const contentInput = await screen.findByPlaceholderText("Enter content");
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Test Content" } });
    const submitButton = await screen.findByTestId("create-post-button-submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.queryByTestId("create-post-modal")).toBeNull();
    });

    // Wait for 0.5 seconds
    await new Promise((r) => setTimeout(r, 500));

    // See if the count has increased
    const newPosts = screen.queryAllByText("Test Title");
    const newPostCount = newPosts.length;
    expect(newPostCount).toBe(initialPostCount + 1);
  });
});
