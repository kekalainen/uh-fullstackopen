import axios from 'axios';

const config = { baseURL: 'http://localhost:3001/anecdotes' };

const create = (content) => axios.post('', { content, votes: 0 }, config);

const getAll = () => axios.get('', config);

const anecdoteService = { create, getAll };
export default anecdoteService;
