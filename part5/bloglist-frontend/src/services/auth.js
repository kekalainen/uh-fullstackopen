import axios from 'axios';

const instance = axios.create({ baseURL: '/api/auth' });

instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error?.response?.data?.error)
);

const login = ({ username, password }) =>
  instance.post('', { username, password });

const authService = { login };
export default authService;
