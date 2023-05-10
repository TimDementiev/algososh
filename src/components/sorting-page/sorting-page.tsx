import React, { useEffect, useState } from "react";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import sortingPageStyles from './sorting-page.module.css';
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { Button } from "../../components/ui/button/button";
import { Column } from "../../components/ui/column/column";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS } from "../../constants/delays";
import { timeOut } from "../../utils/delay";
import { makeRandomArr } from "./utils";

type TArray = {
  value: number;
  color: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<TArray[]>([]);
  const [sortName, setSortName] = useState('выбор');
  const [sorting, setSorting] = useState<Direction>();
  const [loader, setLoader] = useState(false);

  const onNewArrButtonClik = () => {
    setArray([...makeRandomArr()]);
  };

  const selectionSortAscending = async (arr: TArray[]) => {
    setLoader(true);
    for (let i = 0; i < arr.length - 1; i++) {
      let minInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArray([...arr]);
        await timeOut(DELAY_IN_MS);
        if (arr[j].value < arr[minInd].value) {
          minInd = j;
        };
        arr[j].color = ElementStates.Default;
        setArray([...arr]);
      };
      [arr[i].value, arr[minInd].value] = [arr[minInd].value, arr[i].value];
      arr[i].color = ElementStates.Modified;
    }
    arr[arr.length - 1].color = ElementStates.Modified;
    setLoader(false);
  };

  const selectionSortDescending = async (arr: TArray[]) => {
    setLoader(true);
    for (let i = 0; i < arr.length - 1; i++) {
      let maxInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArray([...arr]);
        await timeOut(DELAY_IN_MS);
        if (arr[j].value > arr[maxInd].value) {
          maxInd = j;
        };
        arr[j].color = ElementStates.Default;
        setArray([...arr]);
      };
      [arr[i].value, arr[maxInd].value] = [arr[maxInd].value, arr[i].value];
      arr[i].color = ElementStates.Modified;
    }
    arr[arr.length - 1].color = ElementStates.Modified;
    setLoader(false);
  };

  const bubbleSortAscending = async (arr: TArray[]) => {
    setLoader(true);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setArray([...arr]);
        await timeOut(DELAY_IN_MS);
        if (arr[j].value > arr[j + 1].value) {
          [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
        };
        arr[j].color = ElementStates.Default;
      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
    };
    setLoader(false);
  };

  const bubbleSortDescending = async (arr: TArray[]) => {
    setLoader(true);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setArray([...arr]);
        await timeOut(DELAY_IN_MS);
        if (arr[j].value < arr[j + 1].value) {
          [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
        };
        arr[j].color = ElementStates.Default;
      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
    };
    setLoader(false);
  };

  const handleClick = (sorting: Direction) => {
    setSorting(sorting);

    if (sortName === 'выбор' && sorting === Direction.Ascending) {
      selectionSortAscending(array);
    };
    if (sortName === 'выбор' && sorting === Direction.Descending) {
      selectionSortDescending(array);
    };
    if (sortName === 'пузырек' && sorting === Direction.Ascending) {
      bubbleSortAscending(array);
    };
    if (sortName === 'пузырек' && sorting === Direction.Descending) {
      bubbleSortDescending(array);
    };
  };

  const changeOptionValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortName(event.target.value);
  };

  const setLoading = (direction: Direction) => {
    if (sorting === direction && loader === true) {
      return true;
    } else {
      return false;
    }
  };

  const setDisabled = (direction: Direction) => {
    if (sorting !== direction && loader === true) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setArray([...makeRandomArr()]);
    return () => { setArray([])};
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingPageStyles.mainContainer}>
        <div className={sortingPageStyles.sortingOptionsContainer}>
          <section className={sortingPageStyles.section}>
            <div className={sortingPageStyles.radioButtonsCont}>
              <RadioInput
                label="Выбор"
                value='выбор'
                checked={sortName === 'выбор' ? true : false}
                onChange={changeOptionValue}
                disabled={loader} />
              <RadioInput
                label="Пузырёк"
                value='пузырек'
                checked={sortName === 'пузырек' ? true : false}
                onChange={changeOptionValue}
                disabled={loader} />
            </div>
            <div className={sortingPageStyles.sortingButtonsCont}>
              <div className={sortingPageStyles.button}>
                <Button
                  text='По возрастанию'
                  sorting={Direction.Ascending}
                  onClick={() => handleClick(Direction.Ascending)}
                  isLoader={setLoading(Direction.Ascending)}
                  disabled={setDisabled(Direction.Ascending)}
                />
              </div>
              <div className={sortingPageStyles.button}>
                <Button
                  text='По убыванию'
                  sorting={Direction.Descending}
                  onClick={() => handleClick(Direction.Descending)}
                  isLoader={setLoading(Direction.Descending)}
                  disabled={setDisabled(Direction.Descending)}
                />
              </div>
            </div>
          </section>
          <div className={sortingPageStyles.button}>
            <Button text='Новый массив' disabled={loader} onClick={onNewArrButtonClik} />
          </div>
        </div>
        <ul className={sortingPageStyles.visualContainer}>
          {array.map((item, index) =>
            <li key={index} className={sortingPageStyles.column}>
              <Column index={item.value} state={item.color} />
            </li>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};