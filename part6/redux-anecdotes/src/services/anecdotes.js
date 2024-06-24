import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const anec = { content, votes: 0 };
  const response = await axios.post(baseUrl, anec);
  return response.data;
};

const likeAnec = async (id) => {
  const anec = await axios.get(`${baseUrl}/${id}`);
  const newAnec = {
    ...anec.data,
    votes: anec.data.votes + 1,
  };
  await axios.put(`${baseUrl}/${id}`, newAnec);
};

export default {
  getAll,
  createNew,
  likeAnec,
};
