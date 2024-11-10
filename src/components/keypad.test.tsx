import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { KEY_CHARS } from "@context/constants";
import Keypad from "./keypad";

describe("Keypad", () => {
  // Mock props
  const defaultProps = {
    onBackspace: jest.fn(),
    onKeyPress: jest.fn(),
    onSubmit: jest.fn(),
    guessedChars: ["1", "+"],
    greenTiles: ["2"],
    yellowTiles: ["4"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all keyboard characters", () => {
    render(<Keypad {...defaultProps} />);

    KEY_CHARS.forEach(key => {
      expect(screen.getByText(key)).toBeInTheDocument();
    });
  });

  it("applies correct background colors based on tile states", () => {
    render(<Keypad {...defaultProps} />);

    const greenKey = screen.getByText("2");
    expect(greenKey).toHaveClass("bg-green-400");

    const yellowKey = screen.getByText("4");
    expect(yellowKey).toHaveClass("bg-yellow-400");

    const guessedKey = screen.getByText("+");
    expect(guessedKey).toHaveClass("bg-gray-400");

    const unusedKey = screen.getByText("9");
    expect(unusedKey).toHaveClass("bg-white");
  });

  it("calls onKeyPress the corresponding character when a key is clicked", () => {
    render(<Keypad {...defaultProps} />);

    // Click multiple different keys
    fireEvent.click(screen.getByText("1"));
    expect(defaultProps.onKeyPress).toHaveBeenCalledWith("1");

    fireEvent.click(screen.getByText("+"));
    expect(defaultProps.onKeyPress).toHaveBeenCalledWith("+");
  });

  it("calls onBackspace when backspace key is clicked", () => {
    render(<Keypad {...defaultProps} />);

    const backspaceKey = screen.getByTestId("backspace-key");
    fireEvent.click(backspaceKey);

    expect(defaultProps.onBackspace).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit when Enter key is clicked", () => {
    render(<Keypad {...defaultProps} />);

    const enterKey = screen.getByTestId("submit-key");
    fireEvent.click(enterKey);

    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });
});
