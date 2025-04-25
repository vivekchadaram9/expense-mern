import axios from "axios";

const BaseAxiosInstance = axios.create({
  baseURL: "http://localhost:5000/", // change if your backend URL is different
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export const ApiRequest = async function (options) {
  const onSuccess = function (response) {
    return Promise.resolve(response);
  };
  const onError = function (error) {
    return Promise.reject(error);
  };

  try {
    let response = "";
    options.timeout = options.timeout || 60000;
    response = BaseAxiosInstance(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export const ApiMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "Delete",
};
