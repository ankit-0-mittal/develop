import axios from 'axios';

export const base = 'https://api-prod.eqaroguarantees.com';
export const paymentApi = base + '/payment/v1';
export const userApi = base + '/user/v1';

const baseApi = axios.create({
  baseURL: base + '/user/v1',
});
export const baseinstanceApi = axios.create({
  baseURL: base + '/user/v1',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export default baseApi;
