/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';

class HomeApi {
    private apiUrl = process.env.REACT_APP_API_KEY;
    async getHomeData(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const resp = axios.get(`${this.apiUrl}/`, {
                    withCredentials: true,
                });

                resolve(resp);
            } catch (err) {
                reject(new Error('Internal server error'));
            }
        });
    }
}

export const homeApi = new HomeApi();
