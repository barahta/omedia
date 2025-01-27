import axios from 'axios';

export const API_URL = 'http://localhost:5001/api';

const $api = axios.create({
    withCredentials: true, // Сохраните если хотите, чтобы с запросами отправлялись куки
    baseURL: API_URL,
});

// Удален перехватчик запросов для добавления токена
// $api.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//     return config;
// }, (error) => {
//     console.log(error);
//     return Promise.reject(error);
// });

// Удален перехватчик ответов для обработки ошибок авторизации
// $api.interceptors.response.use((config) => {
//     return config;
// }, async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
//             localStorage.setItem('token', response.data.accessToken);
//             return $api.request(originalRequest);
//         } catch (e) {
//             console.log('Не авторизован');
//         }
//     }
//     throw error;
// });

export default $api;