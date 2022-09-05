describe("Add address manually", () => {
  it("should open address modal", () => {
    const address = "Prime Minister & First Lord of the Treasury";
    cy.visit("http://localhost:3000/");
    cy.get("#floating-action-btn").click();
    cy.get("#address-modal").should("be.visible");

    //   fill address form
    cy.get("#address-modal").within(() => {
      cy.get("#address-line-1").type(
        "Prime Minister & First Lord of the Treasury"
      );
      cy.get("#address-line-2").type("10 Downing Street");
      cy.get("#address-line-3").type("London");
      cy.get("#address-town").type("London");
      cy.get("#address-postcode").type("SW1A 2AA");
      cy.get("#country-search-box")
        .type("UK")
        .wait(1000)
        .then(() => {
          cy.get("#country-search-box-option-0").click();
        });

      //   click on save button
      cy.get("#add-address-btn").click();

      // check if modal is closed
      cy.get("#address-modal").should("not.exist");

      // check if notifcation is displayed
      //   TODO: fix breaking test
      cy.get("#notification")
        .should("exist")
        .should("contain", "Address added successfully")
        .wait(2000)
        .then(() => {
          cy.get("#notification").should("not.exist");
        });

      //   check if address is added to list
      //   TODO: fix breaking test
      cy.get("#address-list").should("contain", address);
    });
  });
});
