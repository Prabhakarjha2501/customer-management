import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
});

const refreshTokenData = {
  isExecuting: false,
  promise: null,
};

const updateRefreshTokenData = (isExecuting, promise) => {
  refreshTokenData.isExecuting = isExecuting;
  refreshTokenData.promise = promise;
};

const setSession = (accessToken, refreshToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const isValidToken = (token) => {
  // Implement token validation logic
  return true;
};

//  const isValidToken = (accessToken) => {
//     if (!accessToken) {
//         return false;
//      }
//     // const decodedToken = jwtDecode(accessToken);
//     // const currentTime = Date.now() / 1000;
//     // return decodedToken.exp > currentTime;
//     try {
//         const decodedToken = jwtDecode(accessToken);
//         const currentTime = Date.now() / 1000;
//         return decodedToken.exp > currentTime;
//       } catch (error) {
//         console.error('Invalid token:', error.message); // Log the specific error message
//         return false;
//       }
// }
const logout = () => {
  setSession(null, null);
  window.location.href = '/signin';
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || !isValidToken(accessToken)) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken || !isValidToken(refreshToken)) {
        updateRefreshTokenData(false, null);
        logout();
        return Promise.reject('Unauthorized User');
      } else {
        try {
          let refreshTokenPromise;
          if (refreshTokenData.isExecuting && refreshTokenData.promise) {
            refreshTokenPromise = refreshTokenData.promise;
          } else {
            refreshTokenPromise = axios.post(`/auth/refresh`, { refreshToken });
            updateRefreshTokenData(true, refreshTokenPromise);
          }
          const response = await refreshTokenPromise;
          updateRefreshTokenData(false, null);
          if (response.data.accessToken) {
            const { accessToken, refreshToken } = response.data;
            setSession(accessToken, refreshToken);
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          } else {
            logout();
            return Promise.reject('Unauthorized User');
          }
        } catch (error) {
          updateRefreshTokenData(false, null);
          logout();
          return Promise.reject(error);
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;