import { create, all } from "mathjs";

import { OPERATORS } from "@context/constants";
import { getDailyTimestamp, generateExpression } from "./gameUtils";

describe("getDailyTimestamp", () => {
  it("should return a number", () => {
    const result = getDailyTimestamp();
    expect(typeof result).toBe("number");
  });

  it("should return the same number for the same day", () => {
    const result1 = getDailyTimestamp();
    const result2 = getDailyTimestamp();
    expect(result1).toBe(result2);
  });

  it("should return a number representing the start of the day", () => {
    const now = new Date();
    const result = getDailyTimestamp();
    expect(now.getTime()).toBeGreaterThan(result);
  });
});

describe("generateExpression", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.12121212);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("should return a string", () => {
    const result = generateExpression();
    expect(typeof result).toBe("string");
  });

  it("should return a string with a length of exactly 6", () => {
    const result = generateExpression();
    expect(result.length).toBe(6);
  });

  it("should return a string with a valid math expression", () => {
    const result = generateExpression();
    const math = create(all);
    expect(math.evaluate(result)).not.toBeNaN();
  });

  it("should return an expression that evaluates to an integer", () => {
    const result = generateExpression();
    const math = create(all);
    expect(math.evaluate(result) % 1).toBe(0);
  });

  it("should return an expression that evaluates to a positive number", () => {
    const result = generateExpression();
    const math = create(all);
    expect(math.evaluate(result)).toBeGreaterThan(0);
  });

  it("should return an expression that contains at least one operator", () => {
    const result = generateExpression();
    const operators = result.split("").filter(char => OPERATORS.includes(char));
    expect(operators.length).toBeGreaterThan(0);
  });

  it("should return an expression that only contains the operators +, -, *, /", () => {
    const result = generateExpression();
    const nonNumericChars = result
      .split("")
      .filter(char => isNaN(Number(char)));
    expect(nonNumericChars.every(char => OPERATORS.includes(char))).toBe(true);
  });

  it("should return an expression that contains at least two operands", () => {
    const result = generateExpression();
    const operands = result.split(/[^0-9]/);
    expect(operands.length).toBeGreaterThan(1);
  });

  it("should return an expression that contains no more than three operands", () => {
    const result = generateExpression();
    const operands = result.split(/[^0-9]/);
    expect(operands.length).toBeLessThanOrEqual(3);
  });
});
