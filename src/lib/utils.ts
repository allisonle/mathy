import { create, all } from "mathjs";

import { OPERATORS } from "@context/constants";

export const commutativeCheck = (expr1: string, expr2: string) => {
  const math = create(all);

  const operators1 = expr1.split("").filter(char => OPERATORS.includes(char));
  const operators2 = expr2.split("").filter(char => OPERATORS.includes(char));

  const operands1 = expr1.split(/[^0-9]/);
  const operands2 = expr2.split(/[^0-9]/);

  const operatorsMatch =
    operators1.sort().join("") === operators2.sort().join("");
  const operandsMatch =
    operands1.sort().join(",") === operands2.sort().join(",");
  const resultsMatch = math.evaluate(expr1) === math.evaluate(expr2);

  return operatorsMatch && operandsMatch && resultsMatch;
};

export const judge = (sol: string) => {
  try {
    const math = create(all);
    return math.evaluate(sol);
  } catch {
    return null;
  }
};
