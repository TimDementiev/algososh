import {
  CHANGING_COLOR,
  CY_CIRCLE_CIRCLE,
  CY_INPUT,
  CY_REMOVE_BTN,
  CY_RESET_BTN,
  CY_SHORT_DELAY,
  CY_SUBMIT_BTN,
  DEFAULT_COLOR,
} from "../constants";

describe("корректная работа кнопки на странице /queue", () => {
  const testValue = "test";
  beforeEach(() => {
    cy.visit(`/queue`);
  });

  it("должна начинаться с заблокированной кнопки", () => {
    cy.get(CY_SUBMIT_BTN).should("be.disabled");
  });

  it("должна становиться активной при вводе данных", () => {
    cy.get(CY_INPUT).type(testValue);
    cy.get(CY_SUBMIT_BTN).should("not.be.disabled");
  });

  it("должна становиться снова заблокированной при удалении данных", () => {
    cy.get(CY_INPUT).type(testValue);
    cy.get(CY_SUBMIT_BTN).should("not.be.disabled");
    cy.get(CY_INPUT).clear();
    cy.get(CY_SUBMIT_BTN).should("be.disabled");
  });
});

describe("визуализация алгоритма", () => {
  const testArr = ["1", "2", "3"];
  beforeEach(() => {
    cy.visit(`/queue`);
  });

  it("элемент правильно добавляется в очередь", function () {
    for (let i = 1; i < 4; i++) {
      cy.get(CY_INPUT).type(i);
      cy.get(CY_SUBMIT_BTN).should("not.be.disabled").click();

      cy.get('[class^="queue-page_list"]')
        .find('[class^="circle_content"]')
        .find('[class^="circle_circle"]')
        .as("allCircle");

      cy.get("@allCircle").should(async ($allCircle) => {
        expect($allCircle[i - 1]).to.have.css("border", CHANGING_COLOR);

        await new Cypress.Promise((resolve) => setTimeout(resolve, 500));

        expect($allCircle[i - 1]).to.contain(i);
        expect($allCircle[i - 1]).to.have.css("border", DEFAULT_COLOR);
      });

      cy.get('[class^="queue-page_list"]')
        .find('[class^="circle_content"]')
        .eq(0)
        .should("contain", "head");

      cy.get('[class^="queue-page_list"]')
        .find('[class^="circle_content"]')
        .eq(i - 1)
        .should("contain", "tail");
    }
  });

  it("элемент правильно удаляется из очереди", function () {
    for (let i = 1; i < 4; i++) {
      cy.get(CY_INPUT).type(i);
      cy.get(CY_SUBMIT_BTN).should("not.be.disabled").click();
      cy.wait(500);
    }

    cy.get(`${CY_REMOVE_BTN}[class^="text"]`).should("not.be.disabled").click();

    cy.get('[class^="queue-page_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle").should(async ($allCircle) => {
      expect($allCircle[0]).to.have.css("border", CHANGING_COLOR);

      await new Cypress.Promise((resolve) => setTimeout(resolve, 500));

      expect($allCircle[0]).to.contain("");
    });

    cy.get('[class^="queue-page_list"]')
      .find('[class^="circle_content"]')
      .eq(1)
      .should("contain", "head");
  });

  it("поведение кнопки «Очистить»", () => {
    cy.clock();
    cy.get(CY_RESET_BTN).should("be.disabled");
    for (let k = 0; k < testArr.length; k++) {
      cy.get(CY_INPUT).type(testArr[k]);
      cy.get(CY_SUBMIT_BTN).click();
      cy.tick(CY_SHORT_DELAY);
    }
    cy.get(CY_RESET_BTN).should("not.be.disabled").click();
    cy.get(CY_CIRCLE_CIRCLE).each(($el) => {
      expect($el).contain("");
    });
  });
});
