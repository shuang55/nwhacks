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

export const logout = () => {
    return axios.get(API_URI.concat('/logout'));
};

export const uploadReceipt = (account_id, file) => {
    let formData = new FormData();
    formData.append("user_id", account_id)
    formData.append("receipt", file);
    return axios.post(API_URI.concat('/extract_receipt'), formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }});
};

export const getExpensesForThisMonth = (accountID) => {
    const today = new Date();
    const currMonth = String(today.getMonth() + 1);

    return axios.get(API_URI.concat('/get_expenses'), {
        params: {
            'user_id': accountID,
            'month': currMonth
        }
    });
};

export const getAllTimeExpenses = (accountID) => {

    return axios.get(API_URI.concat('/get_all_expenses'), {
        params: {
            'user_id': accountID,
        }
    });
};
