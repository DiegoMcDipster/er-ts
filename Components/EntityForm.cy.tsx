import {
  inputFieldSelector,
  submitBtnSelector,
} from "../cypress/support/types";
import EntityForm from "./EntityForm";

const btnLabel = "Add Item";
const someText = "An item";

describe("The Entity Form", () => {
  const mountComponent = (handler = () => {}) => {
    cy.mount(
      <EntityForm label={btnLabel} entityType={"GROUP"} handler={handler} />
    );
  };

  it("it mounts the form field and submit button", () => {
    mountComponent();

    cy.get(inputFieldSelector).should("exist");
    cy.get(submitBtnSelector).should("exist").and("contain", btnLabel);
  });
  it("allows the entering of text in the input field", () => {
    mountComponent();

    cy.get(inputFieldSelector)
      .clear()
      .type(someText)
      .should("have.value", someText);
  });
  it("should run the handler when clicked", () => {
    const handler = cy.spy().as("handlerSpy");

    mountComponent(handler);

    cy.get(inputFieldSelector)
      .clear()
      .type(someText)
      .should("have.value", someText);

    cy.get(submitBtnSelector).click();
    cy.get("@handlerSpy").should("have.been.calledWith", someText);
  });
});
