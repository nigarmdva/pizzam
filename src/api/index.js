import axios from "axios";
//get post put patch delete
const baseURL = "https://tools.vescode.net/api/v1";

export const axiosFunction = async (method, endpoint, data, config = {}) => {
  try {
    const response = await axios({
      method,
      url: `${baseURL}/${endpoint}`,
      data: data && data,
      headers: {
        'Content-Type': 'application/json',
        ...(config.headers)
      }
    });

    console.log(response.data);

    return response.data; 
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
};

