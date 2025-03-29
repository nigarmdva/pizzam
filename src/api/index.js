import axios from "axios";

const baseURL = "https://tools.vescode.net/api/v1";

export const axiosFunction = async (method, endpoint, data) => {
  try {
    const response = await axios({
      method,
      url: `${baseURL}/${endpoint}`,
      data: data && data,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
};
