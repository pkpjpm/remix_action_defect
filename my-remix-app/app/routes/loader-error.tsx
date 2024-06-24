import { json } from "@remix-run/react";
import LoaderErrorScreen from "../screens/LoaderErrorScreen"
import ErrorHandler from "../ErrorHandler";
import { makeUnauthorizedCall } from "../badCall";

export const loader = async () => {
  await makeUnauthorizedCall();
  return json({ foo:"bar" });
};

export function ErrorBoundary() {
  return (<ErrorHandler />);
}

const LoaderError = () => (<LoaderErrorScreen />); 

export default LoaderError;