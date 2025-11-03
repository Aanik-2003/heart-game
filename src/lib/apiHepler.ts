import axios, { AxiosResponse } from "axios";

// Retrieve token from Cookies
export function getToken() {
  if (typeof window !== "undefined") {
    // return Cookies.get("token");
  }
  return null;
}

// Remove token from Cookies (for logout)
export function removeToken() {
  if (typeof window !== "undefined") {
    // Cookies.remove("token");
    // Cookies.remove("role");
  }
}

// Create the Axios instance without Authorization header
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Add request interceptor to set the Authorization header dynamically
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor to handle 401 error (Unauthorized)
instance.interceptors.response.use(
  (response) => response, // Return the response if successful
  (error) => {
    if (error.response && error.response.status === 401) {
      // If 401 Unauthorized, log the user out
      //   removeToken();
      //   if (window.location.pathname !== "/login") {
      //     window.location.href = "/login"; // Redirect to login page
      //   } // Redirect to login page
    }

    return Promise.reject(error); // Return the error for further handling
  },
);

// GET request
export function get(url: string, params = {}): Promise<AxiosResponse> {
  return instance.get(url, {
    params,
  });
}

const apiClient = { get };

export default apiClient;
