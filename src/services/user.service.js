import adapter from 'axios/lib/adapters/http';
const axios = require('axios');

class UserService {
    constructor(baseUrl, port) {
        this.baseUrl = baseUrl;
        this.port = port;
    }

    getUser(userId) {
        if (userId == null) {
            throw new Error("userId must not be null!");
        }
        return axios.request({
            method: 'GET',
            url: `/users/${userId}`,
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json; charset=utf-8'
            }
        }, adapter).then((response) => {
            const user = response.data;
            return new Promise((resolve, reject) => {
                try {
                    resolve(user);
                } catch (error) {
                    reject(error);
                }
            });
        });
    };
}

export default UserService;