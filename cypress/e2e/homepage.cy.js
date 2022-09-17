describe("This is homepage", () => {
  it("should visit homepage", () => {
    cy.visit("/");
    // get the element
    cy.get("form");

    // get the element by id
    cy.get("#btnSubmit");
    cy.get("[id='btnSubmit']");

    // get the element by class
    cy.get(".bg-red-600.text-sm");
    cy.get('input[class="bg-red-600 text-sm"]');

    // get the first element from multiple elements having same attributes
    cy.get('[data-cy="form-element"]:first');

    // get the alias elements
    cy.get('button[type="submit"]').as("btnSubmit");
    cy.get("@btnSubmit");
  });
});
