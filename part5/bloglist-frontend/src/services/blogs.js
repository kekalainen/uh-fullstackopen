import axios from 'axios';

const config = { baseURL: '/api/blogs' };

const create = ({ title, author, url }) =>
  axios.post('', { title, author, url }, config);

const getAll = () => axios.get('', config);

const blogService = { create, getAll };
export default blogService;
