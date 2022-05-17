import axios from 'axios';

const config = { baseURL: 'http://localhost:3001/anecdotes' };

const getAll = () => axios.get('', config);

const anecdoteService = { getAll };
export default anecdoteService;
