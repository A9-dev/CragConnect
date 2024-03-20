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
describe("Events tests", () => {
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

    const eventsButton = screen.getByTestId("events-button");
    act(() => {
      fireEvent.click(eventsButton);
    });
    const eventsPage = await screen.findByTestId("events-page");
    expect(eventsPage).toBeVisible();
  });

  afterEach(() => {
    cleanup();
  });

  afterAll(async () => {
    await deleteTestPosts().catch((error) => {
      console.error("Error:", error);
    });
  });

  test("Create event button", async () => {
    const createEventButton = await screen.findByTestId("create-event-button");
    expect(createEventButton).toBeVisible();
  });

  test("Create event modal", async () => {
    const createEventButton = await screen.findByTestId("create-event-button");
    act(() => {
      fireEvent.click(createEventButton);
    });

    const createEventModal = await screen.findByTestId("create-event-modal");
    expect(createEventModal).toBeVisible();
  });

  test("Create event form", async () => {
    const createEventButton = await screen.findByTestId("create-event-button");
    act(() => {
      fireEvent.click(createEventButton);
    });

    const eventTitleInput = await screen.findByPlaceholderText(
      "Enter event name"
    );
    const eventDescriptionInput = await screen.findByPlaceholderText(
      "Enter event description"
    );
    const addressInput = await screen.findByPlaceholderText("Enter address");
    const postcodeInput = await screen.findByPlaceholderText("Enter postcode");
    const phoneNumberInput = await screen.findByPlaceholderText(
      "Enter phone number"
    );
    const dateAndTimeInput = await screen.findByPlaceholderText(
      "Select Date and Time"
    );

    expect(eventTitleInput).toBeVisible();
    expect(eventDescriptionInput).toBeVisible();
    expect(addressInput).toBeVisible();
    expect(postcodeInput).toBeVisible();
    expect(phoneNumberInput).toBeVisible();
    expect(dateAndTimeInput).toBeVisible();
  });
  test("Create event form submit", async () => {
    const createEventButton = await screen.findByTestId("create-event-button");
    act(() => {
      fireEvent.click(createEventButton);
    });

    const eventTitleInput = await screen.findByPlaceholderText(
      "Enter event name"
    );
    const eventDescriptionInput = await screen.findByPlaceholderText(
      "Enter event description"
    );
    const addressInput = await screen.findByPlaceholderText("Enter address");
    const postcodeInput = await screen.findByPlaceholderText("Enter postcode");
    const phoneNumberInput = await screen.findByPlaceholderText(
      "Enter phone number"
    );
    const dateAndTimeInput = await screen.findByPlaceholderText(
      "Select Date and Time"
    );

    expect(eventTitleInput).toBeVisible();
    act(() => {
      fireEvent.change(eventTitleInput, { target: { value: "Test event" } });
      fireEvent.change(eventDescriptionInput, {
        target: { value: "Test event description" },
      });
      fireEvent.change(addressInput, { target: { value: "Test address" } });
      fireEvent.change(postcodeInput, { target: { value: "IG76QE" } });
      fireEvent.change(phoneNumberInput, {
        target: { value: "+1234567890" },
      });
      fireEvent.change(dateAndTimeInput, {
        target: { value: "2025-12-12T12:00" },
      });
    });

    const submitButton = await screen.findByTestId(
      "create-event-submit-button"
    );

    act(() => {
      fireEvent.click(submitButton);
    });

    const eventCard = await screen.findByText("Test event");
    expect(eventCard).toBeVisible();
  });

  // TODO: Finish writing this test
  test.skip("Error message for malformed entry", async () => {});
});
