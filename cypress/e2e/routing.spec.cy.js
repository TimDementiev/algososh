import { CY_BASE_URL } from '../constants';

describe("роутинг приложения", () => {
  before(() => {
    cy.visit(`${CY_BASE_URL}`);
  });

  const pagesToVisit = [
    {url: `${CY_BASE_URL}/recursion`, text: /Строка/i},
    {url: `${CY_BASE_URL}/fibonacci`, text: /Последовательность Фибоначчи/i},
    {url: `${CY_BASE_URL}/sorting`, text: /Сортировка массива/i},
    {url: `${CY_BASE_URL}/stack`, text: /Стек/i},
    {url: `${CY_BASE_URL}/queue`, text: /Очередь/i},
    {url: `${CY_BASE_URL}/list`, text: /Связный список/i}
  ];

  pagesToVisit.forEach(({url, text}) => {
    it(`должна открываться страница ${url}`, () => {
      cy.visit(url);
      cy.contains(text);
    });
  });
});