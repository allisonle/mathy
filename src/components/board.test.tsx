import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { judge, commutativeCheck } from "@/lib/utils";
import { triggerToast } from "@/helpers/toast";

import Board from "./board";
import { MAX_ATTEMPTS } from "@context/constants";
import { useGame } from "@context/game-provider";

jest.mock("@context/game-provider", () => ({
  useGame: jest.fn(),
}));

jest.mock("@/lib/utils", () => ({
  judge: jest.fn(),
  commutativeCheck: jest.fn(),
}));

jest.mock("@/helpers/toast", () => ({
  triggerToast: jest.fn(),
}));

describe("Board", () => {
  const mockSolution = "12*3+3";
  const mockWrongSolution = "30+4+5";
  const mockAns = 39;

  beforeEach(() => {
    jest.clearAllMocks();
    (useGame as jest.Mock).mockReturnValue(mockSolution);
    (judge as jest.Mock).mockImplementation(expr => {
      if (expr === mockSolution) return mockAns;
      if (expr === mockWrongSolution) return mockAns;
      return 0;
    });
    (commutativeCheck as jest.Mock).mockImplementation(
      (guess, solution) => guess === "3+3*12" && solution === "12*3+3",
    );
  });

  it("should render", () => {
    render(<Board />);
  });

  it("should show a heading containing the target number", () => {
    const { getByRole } = render(<Board />);
    console.log("getByRole: ", getByRole("heading"));
    expect(getByRole("heading")).toHaveTextContent(
      "Find the expression that equals",
    );
    expect(getByRole("heading")).toHaveTextContent(mockAns.toString());
  });

  it("should show a keypad", () => {
    const { getAllByRole, queryAllByTestId } = render(<Board />);
    const keypad = queryAllByTestId("keypad");

    expect(keypad).toHaveLength(1);
    expect(getAllByRole("button")).toHaveLength(16);
    expect(getAllByRole("button")[0]).toHaveTextContent("1");
    expect(getAllByRole("button")[9]).toHaveTextContent("0");
  });

  it("should handle keyboard input", () => {
    const { getByTestId } = render(<Board />);

    fireEvent.keyDown(window, { key: "1" });
    expect(getByTestId("board-buttons")).toHaveTextContent("1");

    fireEvent.keyDown(window, { key: "2" });
    expect(getByTestId("board-buttons")).toHaveTextContent("12");

    fireEvent.keyDown(window, { key: "+" });
    expect(getByTestId("board-buttons")).toHaveTextContent("12+");

    fireEvent.keyDown(window, { key: "Backspace" });
    expect(getByTestId("board-buttons")).not.toHaveTextContent("+");
  });

  it("fires a validation error if the expression is too short", () => {
    const { getByTestId } = render(<Board />);
    const submitButton = getByTestId("submit-key");

    fireEvent.click(submitButton);
    expect(triggerToast).toHaveBeenCalledWith(
      "Expression must be 6 characters long",
      "error",
    );
  });

  it("fires a validation error if the expression does not evaluate to the target number", () => {
    const { getByTestId } = render(<Board />);
    const submitButton = getByTestId("submit-key");
    const incorrectGuess = "12+1+9";

    incorrectGuess.split("").forEach(key => {
      fireEvent.keyDown(window, { key });
    });

    fireEvent.click(submitButton);

    expect(triggerToast).toHaveBeenCalledWith(
      "Expression must equal 39",
      "error",
    );
  });

  it("handles a correct guess", () => {
    const { getByTestId } = render(<Board />);
    const submitButton = getByTestId("submit-key");

    mockSolution.split("").forEach(key => {
      fireEvent.keyDown(window, { key });
    });

    fireEvent.click(submitButton);

    expect(triggerToast).toHaveBeenCalledWith("You did it!");
  });

  it("handles a commutative correct guess", () => {
    const { getByTestId } = render(<Board />);
    const submitButton = getByTestId("submit-key");
    const commutativeSolution = "12*3+3";

    commutativeSolution.split("").forEach(key => {
      fireEvent.keyDown(window, { key });
    });

    fireEvent.click(submitButton);

    expect(triggerToast).toHaveBeenCalledWith("You did it!");
  });

  it("displays a sad toast if the user has run out of attempts", () => {
    const { getByTestId } = render(<Board />);
    const submitButton = getByTestId("submit-key");

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      mockWrongSolution.split("").forEach(key => {
        fireEvent.keyDown(window, { key });
      });

      fireEvent.click(submitButton);
    }

    expect(triggerToast).toHaveBeenCalledWith(
      "You have run out of attempts :(",
      "warning",
    );
  });
});
