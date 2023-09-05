import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";
import renderer from "react-test-renderer";

describe("ButtonComponent", () => {
  test("кнопки с текстом", () => {
    const tree = renderer.create(<Button text="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("кнопки без текста", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("заблокированной кнопки", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("кнопки с индикацией загрузки", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("вызова колбека при клике на кнопку", () => {
    const callback = jest.fn();
    render(<Button onClick={callback}/>);
    fireEvent.click(screen.getByRole('button'))
    expect(callback).toHaveBeenCalledTimes(1);
  });
});