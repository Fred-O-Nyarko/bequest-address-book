describe("Search and add address by postcode", () => {
  const lookupPostcodeAndAddress = () => {
    cy.visit("http://localhost:3000/");
    cy.get("#postcode-search-box").type("SW1A 2AA");
    cy.get("#postcode-search-box-option-0").click();
  };
  it("should search by postcode and add address to list", () => {
    lookupPostcodeAndAddress();
    // check if notifcation is displayed
    cy.get("#notification")
      .should("be.visible")
      .should("contain", "Address added successfully")
      .wait(2000)
      .then(() => {
        cy.get("#notification").should("not.exist");
      });
  });

  it("should search by postcode and display error message", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#postcode-search-box").type("xxx xx");
    cy.get("#postcode-search-box-option-0").should("not.exist");

    // check if notifcation is displayed
    cy.get("#notification")
      .should("be.visible")
      .should("contain", "Bad Request: Invalid postcode")
      .wait(2000)
      .then(() => {
        cy.get("#notification").should("not.exist");
      });
  });

  it("should delete added address", () => {
    const address = "Prime Minister & First Lord of the Treasury";
    lookupPostcodeAndAddress();

    cy.get("#postcode-search-box");

    // check if address is added to list
    cy.get("#address-list").should("contain", address);
    cy.get("#postcode-search-box").clear();

    //  add another address
    cy.get("#postcode-search-box").type("nn13er");
    cy.get("#postcode-search-box-option-1").click();

    // click on delete button
    cy.get("#delete-btn-SW1A2AA").click();

    // check if address is deleted
    cy.get("#address-list").should("not.contain", address);
  });
});
