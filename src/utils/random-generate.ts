import { ElementStates } from "../types/element-states";

function getRandomInteger(min: number, max: number) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}

export function getRandomArray(min: number, max: number) {
  let arr = [];
  for (let i = 0; i <= getRandomInteger(min, max); i++)
    arr.push({
      value: Math.floor(Math.random() * 100),
      color: ElementStates.Default,
    });
  return arr;
}
