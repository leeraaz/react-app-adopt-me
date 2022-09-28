describe("Get and Find element", { defaultCommandTimeout: 10000 }, () => {
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

    // many other custom attributes
    // get the first element from multiple elements having same attributes
    cy.get('[data-cy="form-location-element"]:first');

    // get the alias elements
    cy.get('input[type="text"]').as("locInput");
    cy.get("@locInput");
  });

  it("Find and filter element", () => {
    // find option elements under select
    cy.get("#animal").find("option");

    // find the elements and filter by id
    cy.get("#animal").find("option").filter("#animal-dog");
    cy.get("#animal").find("option").filter("#animal-cat");

    // find the elements and filter by textContent
    cy.get("#animal").find("option").filter(":contains('DOG')");
    cy.get("#animal").find("option").filter(":contains('BIRD')");
  });
});

describe("Interacting with Elements", () => {
  it("Interactions", { defaultCommandTimeout: 7500 }, () => {
    // type
    cy.get("#location").focus().type("Seattle, WA");
    cy.get('[id="location"]').clear().type("Los Angeles, CA").blur();

    // select
    cy.get("#animal").select("dog").blur();
    cy.get("#breed").select("Havanese").blur();

    // click
    cy.get("#btnSubmit").click({ force: true });

    // trigger
    cy.get("#pet-name15", { timeout: 10000 })
      .should("contain", "Sheff")
      .then(($a) => $a.trigger("click"));
  });
});

describe("Assertions", () => {
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
});

describe("Variables and Alisases", () => {
  let petLists;
  before(() => {
    cy.intercept("pets?*").as("pets");
    cy.visit("/");
  });

  it("Return values, Variables and Aliases", () => {
    // wait for api response with aliases
    cy.wait("@pets").then((intercept) => {
      petLists = intercept.response.body.pets;
    });

    // closures & variables
    cy.get("#pet-name1", {timeout: 10000}).then(($h1) => {
      const dogLuna = $h1.text();
      cy.wrap(dogLuna).as("dogName");
    });
  });

  it("Reading variables and alias", function () {
    cy.log(petLists);
    cy.log(this.dogName);

    expect(petLists[0]["name"]).to.have.include(
      this.dogName.replace(/\s/g, "")
    );
  });

  it("Request", () => {
    cy.request("http://pets-images.dev-apis.com/pets/dog31.jpg").as("dogImage");

    // other test code here

    cy.get("@dogImage").should((response) => {
      if (response.status === 200) {
        expect(response).to.have.property("duration");
      } else {
        // whatever you want to check here
      }
    });
  });

  it("Adopt the given alias dogName ", function () {
    cy.get("h1").contains(this.dogName).click();
    cy.url().should("contain", "details");
    cy.get("#dog-name").should("have.text", this.dogName.replace(/\s/g, ""));

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
