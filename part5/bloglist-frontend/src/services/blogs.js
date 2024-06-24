import axios from 'axios';
const baseUrl = '/api/blogs';

let config = {
  headers: { Authorization: null },
};

const setToken = (newToken) => {
  config = {
    headers: { Authorization: `bearer ${newToken}` },
  };
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config);
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export default { getAll, setToken, create, update, remove };
