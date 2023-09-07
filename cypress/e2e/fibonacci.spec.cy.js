import {CY_CIRCLE_CIRCLE, CY_SUBMIT_BTN } from "../constants";

describe("корректная работа кнопки на странице /fibonacci", () => {
  beforeEach(() => {
    cy.visit(`/fibonacci`);
  });

  it("должна начинаться с заблокированной кнопки", () => {
    cy.get(CY_SUBMIT_BTN).should("be.disabled");
  });

  it("должна становиться активной при вводе данных", () => {
    cy.get("input").type(10);
    cy.get(CY_SUBMIT_BTN).should("not.be.disabled");
  });

  it("должна становиться снова заблокированной при удалении данных", () => {
    cy.get("input").type(10);
    cy.get(CY_SUBMIT_BTN).should("not.be.disabled");
    cy.get("input").clear();
    cy.get(CY_SUBMIT_BTN).should("be.disabled");
  });
});

describe("визуализация алгоритма", () => {
  beforeEach(() => {
    cy.visit(`/fibonacci`);
  });

  it("визуализация добавление чисел", () => {
    cy.clock();
    const fibonacciNumbers = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    const input = 6;
    cy.get("input").type(input);
    cy.get(CY_SUBMIT_BTN).click();
    for (let i = 0; i <= input; i++) {
      cy.tick(500);
      for (let j = 0; j <= i; j++) {
        cy.get(CY_CIRCLE_CIRCLE).eq(j).contains(fibonacciNumbers[j]);
      }
    }
  });
});
