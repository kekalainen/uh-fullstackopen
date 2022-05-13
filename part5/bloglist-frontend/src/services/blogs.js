import axios from 'axios';

const config = { baseURL: '/api/blogs' };

const getAll = () => axios.get('', config);

const blogService = { getAll };
export default blogService;
