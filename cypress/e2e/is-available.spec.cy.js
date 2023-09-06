import { CY_BASE_URL } from '../constants';

describe("запуск приложения", () => {
  it(`порт ${CY_BASE_URL}`, () => {
    cy.visit(`${CY_BASE_URL}`);
    cy.contains(/МБОУ АЛГОСОШ/i);
  });
});