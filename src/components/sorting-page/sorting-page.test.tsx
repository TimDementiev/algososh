import {
  selectionSortAscending,
  selectionSortDescending,
  bubbleSortAscending,
  bubbleSortDescending,
} from "./sorting-page";
import { ElementStates } from "../../types/element-states";

const arrayWithOneElement = [{ value: 1, color: ElementStates.Default }];

const arrayWithSomeElements = [
  { value: 0, color: ElementStates.Modified },
  { value: 22, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
  { value: 8, color: ElementStates.Modified },
  { value: 6, color: ElementStates.Modified },
];

const resultArrayWithSomeElementsAscending = [
  { value: 0, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
  { value: 6, color: ElementStates.Modified },
  { value: 8, color: ElementStates.Modified },
  { value: 22, color: ElementStates.Modified },
];

const resultArrayWithSomeElementsDescending = [
  { value: 22, color: ElementStates.Modified },
  { value: 8, color: ElementStates.Modified },
  { value: 6, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
  { value: 0, color: ElementStates.Modified },
];

const setArray = jest.fn();
const setLoader = jest.fn();

jest.setTimeout(30000);

describe("Алгоритм сортировки выбором по возрастанию", () => {
  it("Корректно с пустым массивом", async () => {
    await selectionSortAscending([], setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Корректно с массивом из одного элемента", async () => {
    await selectionSortAscending(arrayWithOneElement, setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Корректно с массивом массив из нескольких элементов", async () => {
    await selectionSortAscending(arrayWithSomeElements, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(
      resultArrayWithSomeElementsAscending
    );
  });
});

describe("Алгоритм сортировки выбором по убыванию", () => {
  it("Корректно с пустым массивом", async () => {
    await selectionSortDescending([], setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Корректно с массивом из одного элемента", async () => {
    await selectionSortDescending(arrayWithOneElement, setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Корректно с массивом массив из нескольких элементов", async () => {
    await selectionSortDescending(arrayWithSomeElements, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(
      resultArrayWithSomeElementsDescending
    );
  });
});

describe("Алгоритм сортировки пузырьком по возрастанию", () => {
  it("Корректно с пустым массивом", async () => {
    await bubbleSortAscending([], setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Корректно с массивом из одного элемента", async () => {
    await bubbleSortAscending(arrayWithOneElement, setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Корректно с массивом массив из нескольких элементов", async () => {
    await bubbleSortAscending(arrayWithSomeElements, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(
      resultArrayWithSomeElementsAscending
    );
  });
});

describe("Алгоритм сортировки пузырьком по убыванию", () => {
  it("Корректно с пустым массивом", async () => {
    await bubbleSortDescending([], setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Корректно с массивом из одного элемента", async () => {
    await bubbleSortDescending(arrayWithOneElement, setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Корректно с массивом массив из нескольких элементов", async () => {
    await bubbleSortDescending(arrayWithSomeElements, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(
      resultArrayWithSomeElementsDescending
    );
  });
});
