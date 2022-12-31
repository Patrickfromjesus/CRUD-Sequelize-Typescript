export default function makeOptions (method, body=false, auth=null) {
  if (!body) return { method, Authorization: auth };
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
};