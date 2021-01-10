import axios from 'axios';
import { API_URI } from './config';

export const login = (email, password) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return axios.post(API_URI.concat('/login'), formData);
};

export const register = (name, email, password) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    return axios.post(API_URI.concat('/register'), formData);
};

export const load_expenses = (user_id, month) => {
    return axios.get(API_URI.concat('/get_expenses', {
        params: {
          user_id: user_id,
          month: month
        }
      }));
};