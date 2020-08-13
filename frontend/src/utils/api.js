import axios from "axios";

import { navigate } from "@reach/router";

const api = axios.create({
	baseURL: process.env.api_server || "http://localhost:8080",
	responseType: "json",
	withCredentials: true,
});

api.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.data.error === "auth_failed") {
			navigate("/login");
		}
		return Promise.reject(error);
	}
);
export default api;
