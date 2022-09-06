import {
  deleteIconSelector,
  inputFieldSelector,
  submitBtnSelector,
  addBtnSelector,
} from "../support/types";

describe("The Groups page", () => {
  beforeEach(() => {
    cy.visit("/my-groups");
    cy.wait(2000);
  });

  const formVisibilityCheck = (check: string): void => {
    cy.get(inputFieldSelector).should(check);
    cy.get(submitBtnSelector).should(check);
  };
  it("displays correctly", () => {
    cy.get("h1").should("contain", "My Groups");
    cy.get(addBtnSelector).should("exist");
    cy.get("h3").should("contain", "Current Groups");
    cy.get("[data-cy=group-0]").should("not.exist");

    formVisibilityCheck("not.be.visible");
  });
  it("toggles the visibility of the form when the Add Group buttons is clicked", () => {
    cy.get(addBtnSelector).click().should("contain", "Cancel");

    formVisibilityCheck("be.visible");
    cy.get(addBtnSelector).click().should("contain", "Add Group");
    formVisibilityCheck("not.be.visible");
  });
  it("adds and then removes the group MAVO1", () => {
    cy.get(addBtnSelector).click();

    const groupMavo1 = "mavo1";

    cy.get("[data-cy=group-0]").should("not.exist");
    cy.get(inputFieldSelector)
      .clear()
      .type(groupMavo1)
      .should("have.value", groupMavo1);
    cy.get(submitBtnSelector).click();

    cy.get("[data-cy=group-0]").as("mavo1");

    cy.get("@mavo1").should("exist").and("contain", groupMavo1.toUpperCase());

    cy.get("@mavo1").find(deleteIconSelector).click();
    cy.get("[data-cy=group-0]").should("not.exist");
  });
  it("goes back to homepage when home is clicked", () => {
    cy.backToHomepage();
  });
});
