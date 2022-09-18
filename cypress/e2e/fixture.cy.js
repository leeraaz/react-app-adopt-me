describe("Fixture", () => {
  it("get users.json file", () => {
    cy.fixture("users").then((users) => {
      expect(users.length).to.eq(3);
      expect(users[0]["name"]).to.eq("Leanne Graham");
      expect(users[1]["address"]["city"]).to.eq("Wisokyburgh");
      expect(users[2]["address"]["geo"]).to.deep.equal({
        lat: "-68.6102",
        lng: "-47.0653",
      });
    });
  });

  it("update users.json file", () => {
    cy.fixture("users.json").then((users) => {
      expect(users.length).to.eq(3);
      let firstUserName = users[0].name
      users[0].name = "Updated Name"
      expect(users[0].name).not.to.eq(firstUserName)
    });
  });
});
