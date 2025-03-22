import axios from "axios";
import { DataItem } from "../types";

const API_URL = "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs";

export const fetchData = async (token: string) => {
  const response = await axios.get(`${API_URL}/userdocs/get`, {
    headers: { "x-auth": token, "Content-Type": "application/json" },
  });
  return response.data.data;
};

export const createItem = async (token: string, data: Omit<DataItem, "id">) => {
  const response = await axios.post(`${API_URL}/userdocs/create`, data, {
    headers: { "x-auth": token },
  });
  console.log(response)
  return response.data.data;
};

export const updateItem = async (token: string, id: string, data: Omit<DataItem, "id">) => {
  const response = await axios.post(`${API_URL}/userdocs/set/${id}`, data, { headers: { "x-auth": token } });
  return { ...response.data.data, id };
};

export const deleteItem = async (token: string, id: string) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/userdocs/delete/${id}`,
      {},
      {
        headers: { "x-auth": token, "Content-Type": "application/json" },
      }
    );
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
