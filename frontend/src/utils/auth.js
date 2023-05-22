export const BASE_URL = 'https://api.daechwita.students.nomoredomains.monster';

function makeRequest(url, method, body, token) {
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  };

  const config = {
    method,
    headers,
    credentials: 'include',
  };

  if (body) {
    config.body = JSON.stringify(body)
  };

  return fetch(`${BASE_URL + url}`, config)
  .then(((res) => {
    return res.ok ? res.json() : Promise.reject(res)
  }))
};

export function register(email, password) {
  return makeRequest('/signup', 'POST', {email, password})
};

export function authorize(email, password) {
  return makeRequest('/signin', 'POST', {email, password})
};

export function getContent() {
  return makeRequest('/users/me', 'GET')
};
