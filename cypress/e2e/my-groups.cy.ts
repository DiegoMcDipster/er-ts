import {
  deleteIconSelector,
  inputFieldSelector,
  submitBtnSelector,
} from "../support/types";

describe("The Groups page", () => {
  beforeEach(() => {
    cy.visit("/my-groups");
  });

  it("displays correctly", () => {
    cy.get("h1").should("contain", "My Groups");

    cy.get("[data-cy=group-0]").should("not.exist");
    cy.get(inputFieldSelector).should("be.visible");
    cy.get(submitBtnSelector).should("be.visible");
  });
  it("adds and then removes the group MAVO1", () => {
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
