import React from 'react';
import axios from 'axios';
import {LocalStorage} from "../localstorage/LocalStorage";
import {strings} from "../constant/strings";

export class AxiosUtil {
    static initAxios() {
        axios.interceptors.request.use(
            async (config) => {
                // Add configurations here
                config.headers[strings.jwttoken] = LocalStorage.getItem(strings.jwttoken);
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
        axios.interceptors.response.use(
            (res) => {
                // Add configurations here
                if (res.status === 201) {
                    console.log('Posted Successfully');
                }
                return res;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
    }
}