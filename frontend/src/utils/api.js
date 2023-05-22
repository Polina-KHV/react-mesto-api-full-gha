class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options)
    .then((res) => {
      if(res.ok) {return res.json()}
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
  }

  setUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  setUserAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers
    })
  }

  addNewCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: !isLiked ? 'DELETE' : 'PUT',
      credentials: 'include',
      headers: this._headers
    })
  }
}

export const api = new Api({
  baseUrl: 'http://api.daechwita.students.nomoredomains.monster',
  headers: {
    authorization: '75baa56a-370e-4e70-8e83-c19302f5044d',
    'Content-Type': 'application/json'
  }
});