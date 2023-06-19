class Api {
    constructor(bathPath, token) {
        this._basePath = bathPath;
        /*this._token = token;*/
    }

    _getHeaders() {
        return {
            /*authorization: this._token,*/
            authorization: `Bearer ${localStorage.getItem('token')} `,
            'Content-Type': 'application/json'
        }
    }

    _getJson(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._getJson);
    }

    getCards() {
        return this._request(`${this._basePath}/cards`, {
            headers: this._getHeaders()
        });
    }

    deleteCard(id) {
        return this._request(`${this._basePath}/cards/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders()
        });
    }

    getUserInfo() {
        return this._request(`${this._basePath}/users/me`, {
            headers: this._getHeaders()
        });
    }

    getAllCardWhithUser() {
        return Promise.all([this.getCards(), this.getUserInfo()]);
    }

    editUserInfo({ item }) {
        return this._request(`${this._basePath}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: item.name,
                about: item.about
            })
        });
    }

    addNewCard({ item }) {
        return this._request(`${this._basePath}/cards`, {
            method: "POST",
            headers: this._getHeaders(),
            body: JSON.stringify({
                link: item.link,
                name: item.name
            })
        });
    }

    _likeCard(id) {
        return this._request(`${this._basePath}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._getHeaders(),
        });
    }

    _deleteLike(id) {
        return this._request(`${this._basePath}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._getHeaders(),
        });
    }

    changeLikeCardStatus(id, isLiked) {
        return isLiked ? this._deleteLike(id) : this._likeCard(id)
    }

    editAvatar({ item }) {
        return this._request(`${this._basePath}/users/me/avatar`, {
            method: "PATCH",
            headers: this._getHeaders(),
            body: JSON.stringify({ avatar: item.link })
        });
    }
}

/*const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61',
    '895e832b-1163-4e0c-87e7-99d6139284c1');*/
/*const api = new Api('http://localhost:3001')*/
const api = new Api('https://api.vmm459.nomoredomains.rocks')
export default api;


