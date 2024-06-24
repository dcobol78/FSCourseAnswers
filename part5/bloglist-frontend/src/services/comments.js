import axios from 'axios';
const baseUrl = '/api/comments';

let config = {
  headers: { Authorization: null },
};

const setToken = (newToken) => {
  config = {
    headers: { Authorization: `bearer ${newToken}` },
  };
};

const create = async (newComment) => {
  const response = await axios.post(baseUrl, newComment, config);
  return response.data;
};

const getAll = async () => {
  const comments = await axios.get(baseUrl, config);
  return comments.data;
};

export default { create, setToken, getAll };
