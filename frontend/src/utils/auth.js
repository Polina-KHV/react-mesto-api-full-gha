export const BASE_URL = 'https://auth.nomoreparties.co';

function makeRequest(url, method, body, token) {
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  };

  if (token){
    headers['Authorization'] = `Bearer ${token}`
  };

  const config = {
    method,
    headers
  };

  if (body) {
    config.body = JSON.stringify(body)
  };

  return fetch(`${BASE_URL + url}`, config)
  .then(((res) => {
    if(res.ok) {return res.json()}
    return Promise.reject(res)
  }))
};

export function register(email, password) {
  return makeRequest('/signup', 'POST', {email, password})
};

export function authorize(email, password) {
  return makeRequest('/signin', 'POST', {email, password})
};

export function getContent(token) {
  return makeRequest('/users/me', 'GET', undefined, token)
};