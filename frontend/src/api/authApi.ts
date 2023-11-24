/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';

class AuthApi {
    private apiUrl = process.env.REACT_APP_API_KEY;
    async login({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const resp = axios.post(
                    `${this.apiUrl}/auth/login/`,
                    {
                        email,
                        password,
                    },
                    {
                        withCredentials: true,
                    }
                );

                resolve(resp);
            } catch (err) {
                reject(new Error('Internal server error'));
            }
        });
    }

    async signup({
        name,
        email,
        password,
    }: {
        name: string;
        email: string;
        password: string;
    }): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const user = axios.post(
                    `${this.apiUrl}/auth/signup/`,
                    {
                        name,
                        email,
                        password,
                    },
                    {
                        withCredentials: true,
                    }
                );
                resolve(user);
            } catch (err) {
                reject(new Error('Internal server error'));
            }
        });
    }
}

export const authApi = new AuthApi();
