import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../routes';

let url = "http://127.0.0.1:8000/api";
export let useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            userData: null,
            userToken: null,
        };
    },

    actions: {
        login(username, password, rememberMe) {
            return axios
                .get(`${url}/login/getUser`, {
                    params: {
                        username: username,
                        password: password,
                    }
                })
                .then((response) => {
                    this.setUserData(response.data.data);
                    if (rememberMe) {
                        localStorage.setItem('userToken', response.data.data.remember_token);
                    }
                    router.push({ name: "Product" });
                })
                .catch((error) => {
                    return Promise.reject(error.response);
                });
        },
        logout() {
            this.setStateToNull();
        },
        setStateToNull() {
            this.userData = null;
            this.userToken = null;
        },
        setUserData(userData) {
            this.userToken = userData.remember_token,
                this.userData = {
                    id: userData.id,
                    name: userData.name,
                    userToken: userData.remember_token,
                    email: userData.email,
                };
        },
    },
})
