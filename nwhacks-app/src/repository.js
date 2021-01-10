import axios from 'axios';
import { API_URI } from './config';

export const login = (email, password) => {
    return axios.post(
        API_URI.concat('/login'),
        { email, password }
    );
};


export const register = (name, email, password) => {
    return axios.post(API_URI.concat('/register'), { name, email, password });
};
