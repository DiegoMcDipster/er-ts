const gridSelector = "[data-cy=grid]";

describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("display the title and two boxes: ", () => {
    cy.get("h1").should("contain", "ER in TS");
    cy.get(gridSelector).children().should("have.length", 2);
  });
  it("The subjects item display exists and it links to the subjects page", () => {
    const pageTitle = "My Subjects and Modules";

    cy.get(gridSelector).children().eq(0).as("subject");

    cy.get("@subject").find("h2").should("contain", pageTitle);
    cy.get("@subject").click();
    cy.location("pathname").should("eq", "/my-subj-modules");
    cy.get("h1").should("contain", pageTitle);
  });
  it("The groups item display exists and it links to the groups page", () => {
    const pageTitle = "My Groups";
    cy.get(gridSelector).children().eq(1).as("groups");

    cy.get("@groups").find("h2").should("contain", pageTitle);
    cy.get("@groups").click();
    cy.location("pathname").should("eq", "/my-groups");
    cy.get("h1").should("contain", pageTitle);
  });
});

export {};
