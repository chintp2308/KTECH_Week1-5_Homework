import React, { useState } from "react";
import styles from "./Calculator.module.css";

const buttons: string[][] = [
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "C", "+"],
  ["="],
];

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const isOperator = (value: string) => ["+", "-", "*", "÷"].includes(value);

  const handleClick = (value: string) => {
    if (value === "C") {
      setExpression("");
      setResult("");
      return;
    }

    if (value === "=") {
      calculate();
      return;
    }

    const lastChar = expression.slice(-1);

    // Ngăn 2 toán tử liên tiếp
    if (isOperator(value) && isOperator(lastChar)) return;

    // Ngăn nhiều dấu . trong một số
    if (value === ".") {
      const lastNumber = expression.split(/[+\-*/÷]/).pop()!;
      if (lastNumber.includes(".") || lastNumber === "") return;
    }

    setExpression((prev) => prev + value);
  };

  const calculate = () => {
    try {
      const sanitized = expression.replace(/÷/g, "/");
      const resultEval = eval(sanitized);

      if (!isFinite(resultEval)) {
        setResult("Error");
      } else {
        setResult(resultEval.toString());
      }
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>
        <div className={styles.expression}>{expression || "0"}</div>
        <div className={styles.result}>{result}</div>
      </div>
      <div className={styles.keypad}>
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((btn) => (
              <button
                key={btn}
                className={
                  isOperator(btn)
                    ? styles.operator
                    : btn === "="
                    ? styles.equals
                    : btn === "C"
                    ? styles.clear
                    : styles.button
                }
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
