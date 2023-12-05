const { default: axios } = require("axios");
const { ROUTES } = require("../constant/apiPath");
const { useNavigate } = require("react-router-dom");

const API_PATH = "http://localhost:3001/api/v1/";

const apiClient = axios.create({
  baseURL: API_PATH,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // check if the error is due to token expiration
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.get(API_PATH + ROUTES.AUTH.REFRESH_TOKEN);
        const { accessToken } = response.data;

        sessionStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient;
      } catch (refreshTokenError) {
        const navigate = useNavigate();
        navigate("/login");
        return Promise.reject(refreshTokenError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
