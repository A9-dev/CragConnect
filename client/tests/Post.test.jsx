import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";

describe("Posting", () => {
  beforeEach(async () => {
    render(<App />);
    // Login as a user
    await waitFor(() => {
      // Add code here to wait for the modal to appear
      const loginButton = screen.getByTestId("login-button");
      loginButton.click();
      const usernameInput = screen.getByLabelText(/Username/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const submitButton = screen.getByTestId("login-button-submit");
      usernameInput.value = "henry";
      passwordInput.value = "password";
      submitButton.click();

      expect(screen.getAllByText(/Like/i)).toBeTruthy();
    });
  });

  test("Renders the post form", () => {
    const postForm = screen.getByTestId("create-post-button");
    expect(postForm.length).toBeGreaterThan(0);
  });
});
