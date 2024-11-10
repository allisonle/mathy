import { create, all } from "mathjs";

export const commutativeCheck = (expr1: string, expr2: string) => {
  const math = create(all);
  return math.symbolicEqual(expr1, expr2);
};

export const judge = (sol: string) => {
  try {
    const math = create(all);
    return math.evaluate(sol);
  } catch {
    return null;
  }
};
