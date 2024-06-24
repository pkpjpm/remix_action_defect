import { Form } from "@remix-run/react";

const ActionErrorScreen = () => {
  return (
    <div>
      <h1>Action Error</h1>
      <Form method="post">
        <button type="submit">Generate Error</button>
      </Form>
    </div>
  );
};

export default ActionErrorScreen;
