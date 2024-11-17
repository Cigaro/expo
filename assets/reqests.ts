import axios from 'axios';

const baseURL = `https://back-end-grjz.onrender.com`;

export interface ItemData {
  _id?: string;
  value: string;
  status: boolean;
}

export const getItems = async (url: string) => {
  const response = await axios.get(baseURL + url);
  return response;
};

export const deleteItem = async (url: string, id: string) => {
  console.log(id);
  const data = {
    _id: id,
  };
  const response = await axios.delete(baseURL + url, { data });
  return response;
};

export const addItem = async (
  url: string,
  id: string,
  value: string,
  status: boolean
) => {
  const data = {
    _id: id,
    value: value,
    status: status,
  };
  const response = await axios.post(baseURL + url, data);
  return response;
};

export const updateItem = async (
  url: string,
  id: string,
  value: string,
  status: boolean
) => {
  const data = {
    _id: id,
    value: value,
    status: status,
  };
  const response = await axios.put(baseURL + url, data);
  return response;
};
