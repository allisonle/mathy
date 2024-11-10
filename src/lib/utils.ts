import Mexp from "math-expression-evaluator";

export const sortExpression = (expr: string) => {
  return expr.split("").sort().join("");
};

export const judge = (sol: string) => {
  try {
    const mexp = new Mexp();
    return mexp.eval(sol);
  } catch {
    return null;
  }
};
