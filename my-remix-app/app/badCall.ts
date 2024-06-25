const not_authorized_url = "http://localhost:5555/";

export const makeUnauthorizedCall = async () => {
  const response = await fetch(not_authorized_url);
  console.dir(response);
  if (!response.ok) throw response;
};