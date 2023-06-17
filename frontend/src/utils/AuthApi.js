export const BASE_URL = 'http://localhost:3001';
/*'https://auth.nomoreparties.co';*/



export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            try {
                if (response.ok)
                    return response.json()
            } catch (e) {
                return (e)
            }
        })
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err));
    }
        

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response => response.json()))
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                return data.token;
            }
        })
        .catch(err => console.log(err))
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => data)
}

