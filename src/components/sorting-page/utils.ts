import { ElementStates } from "../../types/element-states";

export const getRandomInt = (minLen: number, maxLen: number) => {
    return Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
};

export const makeRandomArr = () => {
    const arr = [];
    const length = getRandomInt(3, 17);
    for (let i = 0; i < length; i++) {
        arr.push({ value: Math.round(Math.random() * 100), color: ElementStates.Default });
    };
    return arr;
};