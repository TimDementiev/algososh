describe("запуск приложения", () => {
  it(`базовый URL`, () => {
    cy.visit(`/`);
    cy.contains(/МБОУ АЛГОСОШ/i);
  });
});