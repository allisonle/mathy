import { commutativeCheck, judge } from "./utils";

describe("commutativeCheck", () => {
  it("should return a boolean", () => {
    expect(typeof commutativeCheck("2+2", "2+2")).toBe("boolean");
  });

  it("should return true for commutative expressions", () => {
    expect(commutativeCheck("5+2", "2+5")).toBe(true);
    expect(commutativeCheck("2*5", "5*2")).toBe(true);
  });

  it("should return false for non-commutative expressions", () => {
    expect(commutativeCheck("4/2", "2/4")).toBe(false);
    expect(commutativeCheck("2-4", "4-2")).toBe(false);
  });

  it("should throw an error for invalid expressions", () => {
    expect(() => commutativeCheck("2+", "2+")).toThrow("Invalid expression");
  });
});

describe("judge", () => {
  it("should return a number or null", () => {
    expect(judge("2+2")).toBe(4);
    expect(judge("2+")).toBe(null);
  });

  it("should return the result of a valid expression", () => {
    expect(judge("2+2")).toBe(4);
    expect(judge("2*2")).toBe(4);
    expect(judge("2/2")).toBe(1);
    expect(judge("2-2")).toBe(0);
  });

  it("should follow the order of operations for expressions with multiple operators", () => {
    expect(judge("2+2*2")).toBe(6);
    expect(judge("2*2+2")).toBe(6);
    expect(judge("2*2/2")).toBe(2);
    expect(judge("2/2*2")).toBe(2);
  });

  it("should return null for an invalid expression", () => {
    expect(judge("2+")).toBe(null);
    expect(judge("2*")).toBe(null);
    expect(judge("2/")).toBe(null);
    expect(judge("2-")).toBe(null);
  });
});
