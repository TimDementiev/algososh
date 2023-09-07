/* eslint-disable no-unused-expressions */
/* eslint-disable jest/valid-expect */
import {
  CHANGING_COLOR,
  CY_CIRCLE_CIRCLE,
  CY_CIRCLE_HEAD,
  CY_CIRCLE_TAIL,
  CY_INPUT,
  CY_REMOVE_BTN,
  CY_SHORT_DELAY,
  CY_SUBMIT_BTN,
  DEFAULT_COLOR,
  MODIFIED_COLOR,
} from "../constants";

describe("корректная работа кнопок на странице /list", () => {
  const testValue = "test";
  const testIndex = 1;
  beforeEach(() => {
    cy.visit(`/list`);
  });

  it("кнопки изначально заблокированны", () => {
    cy.get(CY_SUBMIT_BTN).each(($button) => {
      expect($button).to.be.disabled;
    });
    cy.get(CY_REMOVE_BTN).eq(2).should("be.disabled");
  });

  it("кнопки становяться активными при вводе данных(value)", () => {
    cy.get(CY_SUBMIT_BTN).eq(0).should("be.disabled");
    cy.get(CY_SUBMIT_BTN).eq(1).should("be.disabled");
    cy.get(CY_INPUT).first().type(testValue);
    cy.get(CY_SUBMIT_BTN).eq(0).should("not.be.disabled");
    cy.get(CY_SUBMIT_BTN).eq(1).should("not.be.disabled");
  });

  it("кнопки становяться активными при вводе (index) и (value)", () => {
    cy.get(CY_SUBMIT_BTN).eq(2).should("be.disabled");
    cy.get(CY_REMOVE_BTN).eq(2).should("be.disabled");
    cy.get(CY_INPUT).first().type(testValue);
    cy.get(CY_INPUT).last().type(testIndex);
    cy.get(CY_SUBMIT_BTN).eq(2).should("not.be.disabled");
    cy.get(CY_REMOVE_BTN).eq(2).should("not.be.disabled");
  });
  it("кнопки становяться заблокированными при удалении данных", () => {
    cy.get(CY_INPUT).first().type(testValue);
    cy.get(CY_INPUT).last().type(testIndex);
    cy.get(CY_SUBMIT_BTN).each(($button) => {
      expect($button).to.not.be.disabled;
    });
    cy.get(CY_INPUT).first().clear();
    cy.get(CY_INPUT).last().clear();
    cy.get(CY_SUBMIT_BTN).each(($button) => {
      expect($button).to.be.disabled;
    });
  });
});

describe("визуализация алгоритма", () => {
  const testValue = "test";
  beforeEach(() => {
    cy.visit(`/list`);
  });

  it("отрисовки дефолтного списка", () => {
    cy.get(CY_CIRCLE_CIRCLE).each(($circle) => {
      cy.wrap($circle).should("have.css", "border", DEFAULT_COLOR).invoke("text").should("not.be.empty");
    });
    cy.get(CY_CIRCLE_HEAD).eq(0).contains("head");
    cy.get(CY_CIRCLE_TAIL).eq(3).contains("tail");
  });

  it("добавления элемента в head", () => {
    cy.clock();
    cy.get(CY_INPUT).first().type(testValue);
    cy.get(CY_SUBMIT_BTN).eq(0).click();
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle)
        .should("have.css", "border", index === 0 ? CHANGING_COLOR : DEFAULT_COLOR)
        .invoke("text")
        .should("not.be.empty");
      if (index === 0) {
        cy.wrap($circle).contains(testValue);
      }
    });
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle)
        .should("have.css", "border", index === 0 ? MODIFIED_COLOR : DEFAULT_COLOR)
        .invoke("text")
        .should("not.be.empty");
      if (index === 0) {
        cy.wrap($circle).contains(testValue);
      }
    });
    cy.get(CY_CIRCLE_HEAD).first().contains("head");
    cy.get(CY_CIRCLE_TAIL).last().contains("tail");
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE_CIRCLE)
      .should("have.length", 5)
      .each(($circle) => {
        cy.wrap($circle).should("have.css", "border", DEFAULT_COLOR).invoke("text").should("not.be.empty");
      });
  });
  it("удаление элемента из head", () => {
    cy.clock();
    cy.get(CY_REMOVE_BTN).eq(0).click();
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle)
        .should("have.css", "border", index === 1 ? CHANGING_COLOR : DEFAULT_COLOR)
        .invoke("text")
        .should(index === 0 ? "be.empty" : "not.be.empty");
    });
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE_CIRCLE)
      .should("have.length", 3)
      .each(($circle) => {
        cy.wrap($circle).should("have.css", "border", DEFAULT_COLOR).invoke("text").should("not.be.empty");
      });
    cy.get(CY_CIRCLE_HEAD).first().contains("head");
    cy.get(CY_CIRCLE_TAIL).last().contains("tail");
  });

  it("добавления элемента в tail", () => {
    cy.clock();
    cy.get(CY_INPUT).first().type(testValue);
    cy.get(CY_SUBMIT_BTN).eq(1).click();
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle)
        .should("have.css", "border", index === 3 ? CHANGING_COLOR : DEFAULT_COLOR)
        .invoke("text")
        .should("not.be.empty");
      if (index === 3) {
        cy.wrap($circle).contains(testValue);
      }
    });
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle)
        .should("have.css", "border", index === 4 ? MODIFIED_COLOR : DEFAULT_COLOR)
        .invoke("text")
        .should("not.be.empty");
      if (index === 4) {
        cy.wrap($circle).contains(testValue);
      }
    });
    cy.get(CY_CIRCLE_HEAD).first().contains("head");
    cy.get(CY_CIRCLE_TAIL).last().contains("tail");
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE_CIRCLE)
      .should("have.length", 5)
      .each(($circle) => {
        cy.wrap($circle).should("have.css", "border", DEFAULT_COLOR).invoke("text").should("not.be.empty");
      });
  });

  it("удаление элемента из tail", () => {
    cy.clock();
    cy.get(CY_REMOVE_BTN).eq(1).click();
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle)
        .should("have.css", "border", index === 4 ? CHANGING_COLOR : DEFAULT_COLOR)
        .invoke("text")
        .should(index === 3 ? "be.empty" : "not.be.empty");
    });
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE_CIRCLE)
      .should("have.length", 3)
      .each(($circle) => {
        cy.wrap($circle).should("have.css", "border", DEFAULT_COLOR).invoke("text").should("not.be.empty");
      });
    cy.get(CY_CIRCLE_HEAD).first().contains("head");
    cy.get(CY_CIRCLE_TAIL).last().contains("tail");
  });

  it("добавления элемента по индексу", () => {
    cy.clock();
    cy.get(CY_INPUT).first().type(testValue);
    cy.get(CY_INPUT).last().type(1);
    cy.get(CY_SUBMIT_BTN).eq(2).click();
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle).should("have.css", "border", index === 0 || index === 1 ? CHANGING_COLOR : DEFAULT_COLOR);
      if (index === 0) {
        cy.wrap($circle).contains(testValue);
      }
    });
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle).should("have.css", "border", index === 0 || index === 1 ? CHANGING_COLOR : DEFAULT_COLOR);
      if (index === 1) {
        cy.wrap($circle).contains(testValue);
      }
    });
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle).should(
        "have.css",
        "border",
        index === 0 ? CHANGING_COLOR : index === 1 ? MODIFIED_COLOR : DEFAULT_COLOR
      );
      if (index === 1) {
        cy.wrap($circle).contains(testValue);
      }
    });
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE_CIRCLE)
      .should("have.length", 5)
      .each(($circle) => {
        cy.wrap($circle).should("have.css", "border", DEFAULT_COLOR).invoke("text").should("not.be.empty");
      });
    cy.get(CY_CIRCLE_HEAD).first().contains("head");
    cy.get(CY_CIRCLE_TAIL).last().contains("tail");
  });

  it("удаление элемента по индексу", () => {
    cy.clock();
    let inputIndex = 1;
    cy.get(CY_INPUT).last().type(inputIndex);
    cy.get(CY_REMOVE_BTN).eq(2).click();
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle).should("have.css", "border", index < inputIndex ? CHANGING_COLOR : DEFAULT_COLOR);
    });
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE_CIRCLE).eq(2);
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle)
        .should("have.css", "border", index < inputIndex || index === 2 ? CHANGING_COLOR : DEFAULT_COLOR)
        .invoke("text")
        .should(index === 1 ? "be.empty" : "not.be.empty");
    });
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE_CIRCLE)
      .should("have.length", 3)
      .each(($circle) => {
        cy.wrap($circle).should("have.css", "border", DEFAULT_COLOR).invoke("text").should("not.be.empty");
      });
    cy.get(CY_CIRCLE_HEAD).first().contains("head");
    cy.get(CY_CIRCLE_TAIL).last().contains("tail");
  });
});