import { fetchWrapper } from '../_helpers';


const baseUrl = `${process.env.REACT_APP_API_URL}`;

export const UserService = {
    getAll: async () => {
      try {
        // Make the API call to fetch users
        const response = await fetchWrapper.get(`${baseUrl}/user`);
        const data = await response.data;
        return data;
      } catch (error) {
        throw error;
      }
    }
  };
  