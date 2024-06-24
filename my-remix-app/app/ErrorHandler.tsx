import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

const ErrorHandler = () => {
  const theError = useRouteError();
  const errorDetails = isRouteErrorResponse(theError)
    ? `status:${theError.status} detail:${theError.statusText}`
    : "not a route error";
  return (
    <div>
      <h1>Error</h1>
      <p>{errorDetails}</p>
    </div>
  );
}

export default ErrorHandler;