import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newOBJ) => {
  return axios.post(baseUrl, newOBJ);
};

const deletePerson = (personOBJ) => {
  return axios.delete(`${baseUrl}/${personOBJ.id}`);
};

const update = (id, personOBJ) => {
  return axios.put(`${baseUrl}/${id}`, personOBJ);
};

export default { getAll, create, deletePerson, update };