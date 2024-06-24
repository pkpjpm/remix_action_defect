import ActionErrorScreen from "../screens/ActionErrorScreen";
import ErrorHandler from "../ErrorHandler";
import { makeUnauthorizedCall } from "../badCall";
import { json } from "@remix-run/react";

export const action = async () => {
  await makeUnauthorizedCall();
  return json({ foo: "bar" });
};

export function ErrorBoundary() {
  return <ErrorHandler />;
}

const ActionError = () => {
  return <ActionErrorScreen />;
};

export default ActionError;
