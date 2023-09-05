import { fireEvent, render, screen } from "@testing-library/react";
import { Circle } from "./circle";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

describe("CircleComponent", () => {
  test("без буквы", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("с буквами", () => {
    const tree = renderer.create(<Circle letter="a" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("с head", () => {
    const tree = renderer.create(<Circle head="a" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("с react-элементом в head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("с tail", () => {
    const tree = renderer.create(<Circle tail="a" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("с react-элементом в tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("с index", () => {
    const tree = renderer.create(<Circle index={7} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("с пропом isSmall ===  true", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("в состоянии default", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("в состоянии changing", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("в состоянии modified", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});