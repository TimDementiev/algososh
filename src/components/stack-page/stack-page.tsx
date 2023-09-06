import React, { FC, FormEvent, useState } from "react";
import styles from "./stack-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./utils";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { timeOut } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [stack, setStack] = useState<TCircle[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [stackClass] = useState(new Stack<TCircle>());

  type TCircle = {
    state?: ElementStates;
    value: string | number;
    head?: string;
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);
  };

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const pushElement = async () => {
    setIsloading(true);
    stackClass.push({ value: inputValue, state: ElementStates.Changing });
    setStack([...stackClass.getElements()]);
    setInputValue("");
    await timeOut(SHORT_DELAY_IN_MS);
    const value = stackClass.peak();
    if (value) {
      value.state = ElementStates.Default;
      setStack([...stackClass.getElements()]);
    }
    setIsloading(false);
  };

  const popElement = async () => {
    const value = stackClass.peak();
    if (value) {
      value.state = ElementStates.Changing;
      setStack([...stackClass.getElements()]);
    }
    await timeOut(SHORT_DELAY_IN_MS);
    stackClass.pop();
    setStack([...stackClass.getElements()]);
  };

  const deleteAllElements = () => {
    stackClass.clear();
    setStack([...stackClass.getElements()]);
  };

  const getPosition = (index: number, stack: TCircle[]) => {
    if (index === stack.length - 1) {
      return "top";
    } else {
      return "";
    }
  };

  const elements = stack.map((element: TCircle, index: number) => {
    return (
      <li key={index}>
        <Circle
          state={element.state}
          letter={element.value.toString()}
          head={getPosition(index, stack)}
          index={index}
        />
      </li>
    );
  });

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stack}>
        <form className={styles.stack__form} onSubmit={handleSubmit}>
          <Input
            maxLength={4}
            isLimitText={true}
            value={inputValue}
            onChange={handleChange}
          />
          <Button
            text="Добавить"
            type="submit"
            onClick={pushElement}
            isLoader={isLoading}
            disabled={!inputValue || stack.length >= 20}
          />
          <Button
            text="Удалить"
            data-cy="remove"
            onClick={popElement}
            disabled={stack.length === 0}
          />
          <div className={styles.stack__lastBtn}>
            <Button
              text="Очистить"
              type="reset"
              onClick={deleteAllElements}
              disabled={stack.length === 0}
            />
          </div>
        </form>
        <ul className={styles.stack__numbersContainer}>{elements}</ul>
      </div>
    </SolutionLayout>
  );
};
