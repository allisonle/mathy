import Mexp from "math-expression-evaluator";
import { create, all } from "mathjs";

const OPERATORS = ["+", "-", "*", "/"];

export const getDailyTimestamp = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return today.getTime();
};

const getPotentialOperands = () => {
  const rand = Math.random();
  const randomInt = (min: number, max: number): number =>
    Math.floor(rand * (max - min + 1)) + min;

  const twoDigitsList = [randomInt(10, 50), randomInt(0, 9), randomInt(0, 9)];

  const threeDigitsList = [randomInt(100, 500), randomInt(10, 50)];

  return {
    twoDigits: twoDigitsList,
    threeDigits: threeDigitsList,
  };
};

const getRandomOperator = (includeMult?: boolean) => {
  const rand = Math.random();
  const operatorList = includeMult
    ? OPERATORS.slice(0, 3)
    : OPERATORS.slice(0, 2);
  return operatorList[Math.floor(rand * operatorList.length)];
};

export const generateExpressions = () => {
  const rand = Math.random();

  const { twoDigits, threeDigits } = getPotentialOperands();

  const operandList = rand > 0.5 ? twoDigits : threeDigits;

  if (operandList.length === 3) {
    return generateThreeOperandExpressions(operandList);
  } else {
    return generateTwoOperandExpressions(operandList);
  }
};

export const generateTwoOperandExpressions = (operandList: number[]) => {
  const [a, b] = operandList;

  // check if a is divisible by b
  const isDivisible = a % b === 0;

  if (isDivisible) {
    return `${a}/${b}`;
  } else {
    const operator = getRandomOperator();
    return `${a}${operator}${b}`;
  }
};

export const generateThreeOperandExpressions = (
  operandList: number[],
): string => {
  const rand = Math.random();
  const [a, b, c] = operandList;

  // check if a is divisible by b
  const isDivisible = a % b === 0;

  if (isDivisible) {
    const secondOperator = getRandomOperator(true);
    return `${a}/${b}${secondOperator}${c}`;
  } else {
    const [first, second, third] = [a, b, c].sort(() => rand - 0.5);

    const firstOperator = getRandomOperator(true);
    const secondOperator = getRandomOperator(firstOperator !== "*");

    const expr = `${first}${firstOperator}${second}${secondOperator}${third}`;
    const math = create(all);
    const result = math.evaluate(expr);

    // recurse if the result is less than 1
    if (result < 1) {
      return generateThreeOperandExpressions(operandList);
    }

    return expr;
  }
};
