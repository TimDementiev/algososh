describe("роутинг приложения", () => {
  before(() => {
    cy.visit(`/`);
  });

  const pagesToVisit = [
    {url: `/recursion`, text: /Строка/i},
    {url: `/fibonacci`, text: /Последовательность Фибоначчи/i},
    {url: `/sorting`, text: /Сортировка массива/i},
    {url: `/stack`, text: /Стек/i},
    {url: `/queue`, text: /Очередь/i},
    {url: `/list`, text: /Связный список/i}
  ];

  pagesToVisit.forEach(({url, text}) => {
    it(`должна открываться страница ${url}`, () => {
      cy.visit(url);
      cy.contains(text);
    });
  });
});