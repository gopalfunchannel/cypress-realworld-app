import { mount } from "@cypress/react";
import AlertBar from "../AlertBar";
import { SnackbarContext, snackbarMachine } from "machines/snackbarMachine";
import { useMachine } from "@xstate/react";

describe("smoke", () => {
  function FakeAlertBarWithState(fakeSnackbarProps: SnackbarContext) {
    const [, sendEvent, snackbarService] = useMachine(snackbarMachine);

    function triggerSnackBar() {
      sendEvent({ type: "SHOW", ...(fakeSnackbarProps as any) });
    }

    return (
      <>
        <AlertBar snackbarService={snackbarService as any} />
        <button onClick={triggerSnackBar}> Trigger snackbar </button>
      </>
    );
  }

  it("works", () => {
    mount(<FakeAlertBarWithState severity="warning" message="test snack" />);

    cy.contains("Trigger snackbar").click();
    cy.contains("test snack");
  });
});
