import { DeleteIcon } from "./Icons";

const iconSelector = "[data-cy=delete-icon]";

describe("The Delete Icon", () => {
  it("it mounts with an icon", () => {
    cy.mount(<DeleteIcon handler={() => {}} />);
    cy.get(iconSelector).find("path").should("exist");
  });
  it("should run the handler when clicked", () => {
    const handler = cy.spy().as("handlerSpy");

    cy.mount(<DeleteIcon handler={handler} />);

    cy.get(iconSelector).click();
    cy.get("@handlerSpy").should("have.been.called");
  });
});
