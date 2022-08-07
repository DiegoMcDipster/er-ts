import {
  deleteIconSelector,
  inputFieldSelector,
  submitBtnSelector,
} from "../support/types";
const subjectSelector = "[data-cy=subject-0]";
const moduleSelector = "[data-cy=module-0-0]";

describe("My Subject and Modules page", () => {
  beforeEach(() => {
    cy.visit("/my-subj-modules");
  });

  it("displays correctly", () => {
    cy.get("h1").should("contain", "My Subjects and Modules");

    cy.get(subjectSelector).should("not.exist");
    cy.get(inputFieldSelector).should("be.visible");
    cy.get(submitBtnSelector).should("be.visible");
  });
  context("Adding and Removing Subjects and Modules", () => {
    it("adds the subject Maths", () => {
      const subjectMaths = "maths";

      cy.get(subjectSelector).should("not.exist");

      // Add the subject maths
      cy.get(inputFieldSelector)
        .clear()
        .type(subjectMaths)
        .should("have.value", subjectMaths);
      cy.get(submitBtnSelector).click();

      // check that maths exists and the module input
      // field is visible as a child
      cy.get(subjectSelector).as("maths");

      cy.get("@maths")
        .should("exist")
        .and("contain", subjectMaths.toUpperCase())
        .find(deleteIconSelector)
        .should("be.visible");

      cy.get("@maths").find(inputFieldSelector).should("exist");

      cy.get("@maths").find(submitBtnSelector).should("exist");

      // Add a module for maths
      const trigonometry = "Trigonometry";

      cy.get("@maths")
        .find(inputFieldSelector)
        .clear()
        .type(trigonometry)
        .should("have.value", trigonometry);

      cy.get("@maths").find(submitBtnSelector).click();

      // The module Trigonometry should now exist
      cy.get(moduleSelector).as("trig");

      cy.get("@trig")
        .should("exist")
        .and("contain", trigonometry.toUpperCase());

      cy.get("@trig").find(deleteIconSelector).should("be.visible").click();

      cy.wait(5000); // delay for the db to update and come back
      cy.get("@maths").find(deleteIconSelector).click();
      cy.get(subjectSelector).should("not.exist");
    });
  });
  it("goes back to the homepage when home is clicked", () => {
    cy.backToHomepage();
  });
});
