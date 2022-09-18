describe("Get and Find element", () => {
  it("Get Elements", () => {
    cy.visit("/");
    // get the element tag
    cy.get("label");

    // get the element by id
    cy.get("#location");
    cy.get("[id='location']");

    // get the element by class
    cy.get(".flex.flex-wrap.-mx-3");
    cy.get('div[class="flex flex-wrap -mx-3"]');

    // get the first element from multiple elements having same attributes
    cy.get('[data-cy="form-location-element"]:first');

    // get the alias elements
    cy.get('input[type="text"]').as("locInput");
    cy.get("@locInput");
  });

  it("Find and filter element", () => {
    // find option elements under select
    cy.get("#animal").find(">option");

    // find the elements and filter by id
    cy.get("#animal").find(">option").filter("#animal-dog");
    cy.get("#animal").find(">option").filter("#animal-cat");

    // find the elements and filter by textContent
    cy.get("#animal").find(">option").filter(":contains('DOG')");
    cy.get("#animal").find(">option").filter(":contains('BIRD')");
  });

  it("Interactions", () => {
    // type
    cy.get("#location").type("Seattle, WA").clear().type("Los Angeles, CA");

    // select
    cy.get("#animal").select("dog");
    cy.get("#breed").select("Havanese");

    // click
    cy.get("#btnSubmit").click();

    // cy.wait(5000)

    // trigger
    cy.get("#pet-name15", { timeout: 10000 })
      .should("contain", "Sheff")
      .then((a) => a.trigger("click"));
  });

  it("Assertions", () => {
    // contains
    cy.url().should("contains", "/details/15");
    cy.contains("h1", "Sheff");

    cy.visit("/");
    // length
    cy.get("div#pet-image-container").should("have.length", 10);

    // class
    cy.get("#pet-info-container").find("h1").should("have.class", "font-bold");
    cy.get("#pet-info-container")
      .find("h1")
      .should("not.have.class", "text-sm");

    // value
    cy.get("[type='hidden']")
      .filter("#hidden-2")
      .should("have.value", "Bunnahabhain");

    // text content
    cy.get("h2#pet-info2").should(
      "have.text",
      "dog - Goldendoodle - Minneapolis, MN"
    );
    cy.get("h2#pet-info2").should("include.text", "Goldendo");
    cy.get("h2#pet-info2").should("not.include.text", "Silver");
    cy.get("h2#pet-info2").invoke("text").should("match", /^dog/);

    // attr value
    cy.get('[id="pet-image-2"]')
      .should("be.visible")
      .invoke("attr", "src", "http://pets-images.dev-apis.com/pets/dog31.jpg");
  });

  it("Timeouts", () => {
    // timeout per command
    cy.get("form", { timeout: 5000 }).should("be.visible");
  });
});
