import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://dev.codeleap.co.uk/careers",
  headers: {
    "Content-Type": "application/json",
  },
});
