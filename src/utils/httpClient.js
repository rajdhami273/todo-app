import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3001",
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(function (request) {
  request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return request;
});

httpClient.interceptors.response.use(
  function (success) {
    return success;
  },
  function (error) {
    if (error.status === 498) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { httpClient };
