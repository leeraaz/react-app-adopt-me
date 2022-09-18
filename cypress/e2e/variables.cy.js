describe("Variables and Aliases", () => {
  let petLists;
  it("Return values, Variables and Aliases", () => {
    // wait for api response with aliases
    cy.intercept("pets?*").as("pets");
    cy.visit("/");
    cy.wait("@pets").then((intercept) => {
      petLists = intercept.response.body.pets;
    });

    // // return values misconception
    // const dogLuna = cy.get("#pet-name1").text()
    // cy.log(dogLuna)

    // closures & variables
    cy.get("#pet-name1").then(($h1) => {
      const dogLuna = $h1.text();
      cy.log(dogLuna);
      cy.wrap(dogLuna).as("dogName");
      $h1.trigger("click");
      cy.url().should("contain", "details");
      cy.get("#dog-name").contains(dogLuna.replace(/\s/g, ""));
    });
  });

  it("Reading variables and alias", function () {
    cy.log(petLists);
    cy.log(this.dogName);
  });

  it("Adopt count ", () => {
    let count = 2;
    for (let i = 0; i < count; i++) {
      cy.get('[data-cy="adopt-count"]').then(($st) => {
        // capture what num is right now
        const num1 = parseInt($st.text());

        cy.get("button")
          .filter("[data-cy='adopt-me']")
          .click()
          .get("button")
          .filter(":contains('Yes')")
          .click()
          .then(() => {
            // now capture it again
            const num2 = parseInt($st.text());

            // make sure it's what we expected
            expect(num2).to.eq(num1 + 1);
          });
      });
    }
  });
});
