import React, { ChangeEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ButtonName } from "../../types/buttons-name";
import { TElement, TElementNumber } from "../../types/element";
import { ElementStates } from "../../types/element-states";
import { timeOut } from "../../utils/delay";
import { getRandomArray } from "../../utils/random-generate";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList, TNode } from "./utils";
import style from "./list-page.module.css";

const $EMPTY_INPUT = { value: "", index: "" };
type TEmptyInput = {
  value: string;
  index: string;
};

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<TEmptyInput>($EMPTY_INPUT);
  const [linkedList] = useState(
    new LinkedList<TElement | TElementNumber>(getRandomArray(3, 3))
  );
  const [renderArr, setRenderArr] = useState<
    Array<TNode<TElement | TElementNumber>>
  >(linkedList.toArray());
  const [addNode, setAddNode] = useState(false);
  const [deleteNode, setDeleteNode] = useState(false);
  const [deleteNodeValue, setDeleteNodeValue] = useState("");
  const [addIndex, setAddIndex] = useState<number>(0);
  const [loader, setLoader] = useState(false);
  const [btnName, setBtnName] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });

  const handleClickPrepend = async () => {
    setLoader(true);
    setBtnName(ButtonName.AddHead);
    setAddNode(true);
    setAddIndex(linkedList.getLength());
    setRenderArr(linkedList.toArray());
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList.prepend({
      value: inputValue.value,
      color: ElementStates.Modified,
    });

    setAddNode(false);
    setRenderArr(linkedList.toArray());
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList.getLastAddedNode()!.value = {
      value: inputValue.value,
      color: ElementStates.Default,
    };
    setRenderArr(linkedList.toArray());
    setInputValue($EMPTY_INPUT);
    setLoader(false);
  };

  const handleClickAppend = async () => {
    setLoader(true);
    setBtnName(ButtonName.AddTail);
    setAddNode(true);
    setAddIndex(1);
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList.append({
      value: inputValue.value,
      color: ElementStates.Modified,
    });

    setAddNode(false);
    setRenderArr(linkedList.toArray());
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList.getLastAddedNode()!.value = {
      value: inputValue.value,
      color: ElementStates.Default,
    };
    setRenderArr(linkedList.toArray());
    setInputValue($EMPTY_INPUT);
    setLoader(false);
  };

  const handleClickDeleteHead = async () => {
    setLoader(true);
    setBtnName(ButtonName.DeleteHead);
    setDeleteNode(true);
    setDeleteNodeValue(linkedList.findByIndex(0).value);
    setAddIndex(linkedList.getLength());
    linkedList.findByIndex(0).value = "";
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList.deleteHead();
    setRenderArr(linkedList.toArray());
    setDeleteNode(false);
    setLoader(false);
  };

  const handleClickDeleteTail = async () => {
    setLoader(true);
    setBtnName(ButtonName.DeleteTail);
    setDeleteNode(true);
    setDeleteNodeValue(
      linkedList.findByIndex(linkedList.getLength() - 1).value
    );
    setAddIndex(1);
    linkedList.findByIndex(linkedList.getLength() - 1).value = "";
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList.deleteTail();
    setRenderArr(linkedList.toArray());
    setDeleteNode(false);
    setLoader(false);
  };

  const handleClickInsertByIndex = async () => {
    setLoader(true);
    setBtnName(ButtonName.AddByIndex);
    setAddNode(true);
    for (let i = 0; i <= Number(inputValue.index); i++) {
      setAddIndex(linkedList.getLength() - i);
      if (i < Number(inputValue.index)) {
        linkedList.findByIndex(i).color = ElementStates.Changing;
      }
      setRenderArr(linkedList.toArray());
      await timeOut(SHORT_DELAY_IN_MS);
    }
    setAddNode(false);
    linkedList.addByIndex(Number(inputValue.index), {
      value: inputValue.value,
      color: ElementStates.Modified,
    });
    setRenderArr(linkedList.toArray());
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList
      .toArray()
      .forEach((item) => (item.value.color = ElementStates.Default));
    setRenderArr(linkedList.toArray());
    setInputValue($EMPTY_INPUT);
    setLoader(false);
  };

  const handleClickDeleteByIndex = async () => {
    setLoader(true);
    setBtnName(ButtonName.DeleteByIndex);
    for (let i = 0; i <= Number(inputValue.index); i++) {
      if (i < Number(inputValue.index)) {
        linkedList.findByIndex(i).color = ElementStates.Changing;
      }
      setRenderArr(linkedList.toArray());
      await timeOut(SHORT_DELAY_IN_MS);
    }
    setDeleteNodeValue(linkedList.findByIndex(Number(inputValue.index)).value);
    setDeleteNode(true);
    setAddIndex(linkedList.getLength() - Number(inputValue.index));
    linkedList.findByIndex(Number(inputValue.index)).value = "";
    setRenderArr(linkedList.toArray());

    await timeOut(SHORT_DELAY_IN_MS);
    setDeleteNode(false);
    linkedList.deleteByIndex(Number(inputValue.index));
    setRenderArr(linkedList.toArray());
    linkedList
      .toArray()
      .forEach((item) => (item.value.color = ElementStates.Default));
    setRenderArr(linkedList.toArray());
    setInputValue($EMPTY_INPUT);
    setLoader(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={style.wrapper}>
        <Input
          name="value"
          type="text"
          isLimitText={true}
          maxLength={4}
          value={`${inputValue?.value}`}
          onChange={handleChange}
        />

        <Button
          type="submit"
          onClick={handleClickPrepend}
          isLoader={loader && btnName === ButtonName.AddHead}
          text="Добавить в head"
          disabled={!inputValue.value || loader}
          linkedList="big"
          extraClass={style.btn}
        />
        <Button
          type="submit"
          onClick={handleClickAppend}
          isLoader={loader && btnName === ButtonName.AddTail}
          text="Добавить в tail"
          disabled={!inputValue.value || loader}
          linkedList="big"
          extraClass={style.btn}
        />
        <Button
          data-cy="remove"
          onClick={handleClickDeleteHead}
          isLoader={loader && btnName === ButtonName.DeleteHead}
          text="Удалить из head"
          disabled={linkedList.isEmpty() || loader}
          linkedList="big"
          extraClass={style.btn}
        />
        <Button
          data-cy="remove"
          onClick={handleClickDeleteTail}
          isLoader={loader && btnName === ButtonName.DeleteTail}
          text="Удалить из tail"
          disabled={linkedList.isEmpty() || loader}
          linkedList="big"
          extraClass={style.btn}
        />
      </div>
      <div className={style.wrapperIndex}>
        <Input
          name="index"
          type="number"
          value={`${inputValue?.index}`}
          onChange={handleChange}
        />

        <Button
          type="submit"
          onClick={handleClickInsertByIndex}
          isLoader={loader && btnName === ButtonName.AddByIndex}
          text="Добавить по индексу"
          disabled={
            !inputValue.value ||
            !inputValue.index ||
            loader ||
            Number(inputValue.index) > linkedList.getLength() - 1
          }
          linkedList="big"
          extraClass={style.btnIndex}
        />
        <Button
          data-cy="remove"
          onClick={handleClickDeleteByIndex}
          isLoader={loader && btnName === ButtonName.DeleteByIndex}
          text="Удалить по индексу"
          disabled={
            !inputValue.index ||
            linkedList.isEmpty() ||
            loader ||
            Number(inputValue.index) > linkedList.getLength() - 1
          }
          linkedList="big"
          extraClass={style.btnIndex}
        />
      </div>
      <ul className={style.listWrapper}>
        {renderArr.map((item: any, index: number) => (
          <li className={style.list} key={index}>
            {addNode && linkedList.getLength() - addIndex === index && (
              <Circle
                state={ElementStates.Changing}
                isSmall={true}
                letter={inputValue.value}
                extraClass={style.addNodeCircle}
              />
            )}
            <Circle
              key={index}
              index={index}
              letter={item.value.value}
              state={item.value.color}
              tail={!item.next && !deleteNode ? "tail" : ""}
              head={index === 0 && !addNode ? "head" : ""}
            />
            {deleteNode && linkedList.getLength() - addIndex === index && (
              <Circle
                state={ElementStates.Changing}
                isSmall={true}
                letter={deleteNodeValue}
                extraClass={style.deleteNodeCircle}
              />
            )}
            {item.next && (
              <ArrowIcon
                fill={
                  item.value.color === ElementStates.Changing
                    ? "#D252E1"
                    : undefined
                }
              />
            )}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
