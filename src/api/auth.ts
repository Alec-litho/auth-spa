import axios from 'axios';

const HOST  = 'https://test.v5.pryaniky.com'
const API_URL = HOST + `/ru/data/v3/testmethods/docs/login`;

export const loginUser = async (username: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });
    return response.data.data.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error_message || 'Login failed');
    }
    throw new Error('Unknown error occurred');
  }
};