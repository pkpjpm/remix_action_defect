import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import { createEmptyContact, getContacts } from "./data";
import type { LinksFunction } from "@remix-run/node";

import appStylesHref from "./app.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

const not_authorized_url = "http://localhost:3333/api/va/staff_members/1";

const makeUnauthorizedCall = async () => {
  const response = await fetch(not_authorized_url);
  console.dir(response);
  if (!response.ok) throw response;
};

export const loader = async () => {
  const contacts = await getContacts();
  // await makeUnauthorizedCall();
  return json({ contacts });
};

export const action = async () => {
  const contact = await createEmptyContact();
  await makeUnauthorizedCall();
  return json({ contact });
};

export default function App() {
  const { contacts } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite ? <span>★</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const ErrorBoundary = () => {
  const theError = useRouteError();
  const errorDetails = isRouteErrorResponse(theError)
    ? `status:${theError.status} detail:${theError.statusText}`
    : "not a route error";
  return (
    <html lang="en">
      <body>
        <h1>Error</h1>
        <p>{errorDetails}</p>
      </body>
    </html>
  );
};
