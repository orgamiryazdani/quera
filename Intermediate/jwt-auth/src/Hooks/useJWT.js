import { useState } from "react";
import axios from 'axios';

function useJWT() {
	const apiUrl = 'http://127.0.0.1:4000/api';
	const [accessTokenValue, setAccessTokenValue] = useState(localStorage.getItem('access') || '');
	const [refreshTokenValue, setRefreshTokenValue] = useState(localStorage.getItem('refresh') || '');

	const setTokens = (access, refresh) => {
		setAccessTokenValue(access);
		setRefreshTokenValue(refresh);
		localStorage.setItem('access', access);
		localStorage.setItem('refresh', refresh);
	};

	const clearTokens = () => {
		setAccessTokenValue('');
		setRefreshTokenValue('');
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');
	};

	const refreshToken = async () => {
		try {
			const { data } = await axios.post(`${apiUrl}/token`, { token: refreshTokenValue });
			const { access, refresh } = data;
			setTokens(access, refresh);
			return data;
		} catch (error) {
			throw new Error(error.response?.data?.message || 'Login failed');
		}
	};

	async function login(email, password) {
		try {
			const { data } = await axios.post(`${apiUrl}/login`, { email, password });
			const { access, refresh } = data;
			setTokens(access, refresh);
			return data;
		} catch (error) {
			throw new Error(error.response?.data?.message || 'Login failed');
		}
	}

	async function postRequest(path, data, accessToken) {
		const response = await axios.post(path, { data }, {
			headers: {
				'Content-Type': 'application/json',
				'jwt': accessToken
			}
		});
		return response;
	}

	const sendPostRequest = async (url, data) => {
		try {
			const response = await postRequest(url, data, accessTokenValue);
			return response;
		} catch (error) {
			if (error.response && (error.response.status === 401 || error.response.status === 403)) {
				try {
					await refreshToken();
					const newAccess = localStorage.getItem("access");
					const newResponse = await postRequest(url, data, newAccess);
					return newResponse;
				} catch (refreshError) {
					throw refreshError.response?.data || refreshError.message;
				}
			}
			throw error.response?.data || error.message;
		}
	};


	const logout = async () => {
		try {
			await axios.delete(`${apiUrl}/logout`, { token: refreshTokenValue });
			clearTokens();
		} catch (error) {
			throw new Error(error.response?.data?.message || 'logout failed');
		}
	};

	return {
		login,
		logout,
		refreshToken,
		sendPostRequest,
	};
}

export default useJWT;