import {
  CHANGING_COLOR,
  CY_BASE_URL,
  CY_CIRCLE_CIRCLE,
  CY_REMOVE_BTN,
  CY_RESET_BTN,
  CY_SUBMIT_BTN,
  DEFAULT_COLOR,
} from "../constants";

describe("корректная работа кнопки на странице /recursion", () => {
  beforeEach(() => {
    cy.visit(`${CY_BASE_URL}/stack`);
  });

  it("должна начинаться с заблокированной кнопки", () => {
    cy.get(CY_SUBMIT_BTN).should("be.disabled");
  });

  it("должна становиться активной при вводе данных", () => {
    cy.get("input").type("test");
    cy.get(CY_SUBMIT_BTN).should("not.be.disabled");
  });

  it("должна становиться снова заблокированной при удалении данных", () => {
    cy.get("input").type("test");
    cy.get(CY_SUBMIT_BTN).should("not.be.disabled");
    cy.get("input").clear();
    cy.get(CY_SUBMIT_BTN).should("be.disabled");
  });
});

describe("визуализация алгоритма", () => {
  const test_arr = ["FE", "DM", "PT"];
  beforeEach(() => {
    cy.visit(`${CY_BASE_URL}/stack`);
  });

  it("правильность добавления и удаления элементов в стек", () => {
    cy.clock();
    // ДОБАВЛЕНИЕ
    for (let i = 0; i < test_arr.length; i++) {
      cy.get("input").type(test_arr[i]);
      cy.get(CY_SUBMIT_BTN).click();
      for (let j = 0; j <= i; j++) {
        cy.get(CY_CIRCLE_CIRCLE)
          .eq(j)
          .should(
            "have.css",
            "border",
            j === i ? CHANGING_COLOR : DEFAULT_COLOR
          )
          .contains(test_arr[j]);
      }
      cy.tick(500);
      for (let j = 0; j <= i; j++) {
        cy.get(CY_CIRCLE_CIRCLE)
          .eq(j)
          .should("have.css", "border", DEFAULT_COLOR)
          .contains(test_arr[j]);
      }
    }
    cy.tick(1000);
    // УДАЛЕНИЕ
    // ! ПОДУМАТЬ НАД ЦИКЛОМ
    cy.get(CY_REMOVE_BTN).click();
    cy.get(CY_CIRCLE_CIRCLE)
      .eq(0)
      .should("have.css", "border", DEFAULT_COLOR)
      .contains(test_arr[0]);
    cy.get(CY_CIRCLE_CIRCLE)
      .eq(1)
      .should("have.css", "border", DEFAULT_COLOR)
      .contains(test_arr[1]);
    cy.get(CY_CIRCLE_CIRCLE)
      .eq(2)
      .should("have.css", "border", CHANGING_COLOR)
      .contains(test_arr[2]);
    cy.tick(500);
    cy.get(CY_REMOVE_BTN).click();
    cy.get(CY_CIRCLE_CIRCLE)
      .eq(0)
      .should("have.css", "border", DEFAULT_COLOR)
      .contains(test_arr[0]);
    cy.get(CY_CIRCLE_CIRCLE)
      .eq(1)
      .should("have.css", "border", CHANGING_COLOR)
      .contains(test_arr[1]);
    cy.tick(500);
    cy.get(CY_REMOVE_BTN).click();
    cy.get(CY_CIRCLE_CIRCLE)
      .eq(0)
      .should("have.css", "border", CHANGING_COLOR)
      .contains(test_arr[0]);
    cy.tick(500);
    cy.get(CY_CIRCLE_CIRCLE).should("not.exist");
  });

  it("поведение кнопки «Очистить»", () => {
    cy.clock();
    cy.get(CY_RESET_BTN).should("be.disabled");
    for (let k = 0; k < test_arr.length; k++) {
      cy.get("input").type(test_arr[k]);
      cy.get(CY_SUBMIT_BTN).click();
      cy.tick(500);
    }
    cy.get(CY_RESET_BTN).should("not.be.disabled");
    cy.get(CY_RESET_BTN).click();
    cy.get(CY_CIRCLE_CIRCLE).should("not.exist");
  });
});
