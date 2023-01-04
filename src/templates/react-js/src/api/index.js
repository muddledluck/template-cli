import axios from "axios";
import { tokens } from "../utils/jwtTokenStorage";
import { SERVER_URL } from "../utils/serverUrl";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// @response interceptor
axiosInstance.interceptors.response.use((response) => {
  // do something...

  return response;
});

// @request function for api call.
export const request = async (config) => {
  try {
    if (!config.headers) {
      config.headers = {};
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    config.headers["Authorization"] = `Bearer ${tokens.accessToken()}`;
    config.headers["x-refresh"] = `Bearer ${tokens.refreshToken()}`;

    const response = await axiosInstance.request({ ...config });

    return {
      remote: "success",
      data: response.data,
    };
  } catch (error) {
    if (error) {
      if (error.response) {
        if (error.response && error.response.data) {
          let errorMessage = error.response.data.erros;

          if (error.response.status === 500) {
            errorMessage = "Internal Server Error!";
          }

          return {
            remote: "failure",
            error: {
              status: error.response.status,
              errors: errorMessage,
            },
          };
        }
      } else {
        let errorMessage = error.message;

        return {
          remote: "failure",
          error: {
            errors: errorMessage,
          },
        };
      }
    }
    throw error;
  }
};

// @parseResponse
// @desc parse Response data
export const parseResponse = (response) => {
  const data = JSON.parse(response);

  if (data && (data.errors || data.error)) {
    return {
      remote: "failure",
      error: {
        errors: data.errors ?? data.error,
      },
    };
  }
  return {
    remote: "success",
    data,
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { axiosInstance, request, parseResponse };