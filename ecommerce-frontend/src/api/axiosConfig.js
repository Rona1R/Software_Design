import axios from "axios";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
           // console.log('Authorization header set:', config.headers['Authorization']);
        }
        else {
            console.log('No token found');
        }
        return config;
    },
    error => Promise.reject(error)
);



let isRefreshing = false;
let subscribers = [];

function onAccessTokenFetched(access_token) {
  subscribers.forEach(callback => callback(access_token));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

axios.interceptors.response.use(
  response => response,
  error => {
    const {
      config,
      response: { status }
    } = error;
    const originalRequest = config;

    // Bypass interceptor for the refresh token endpoint
    if (originalRequest.url.includes('/refresh-token')) {
      return Promise.reject(error);
    }

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        
        axios.post('https://localhost:7061/api/Authentication/refresh-token',{})
          .then((response) => {
            if (response.data) {
              localStorage.setItem('accessToken', response.data);
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data;
              onAccessTokenFetched(response.data);
            }
            isRefreshing = false;
          })
          .catch((refreshError) => {
            console.error('Refresh login error:', refreshError);
            redirectToLogin();
            isRefreshing = false;
          });
        //const refreshToken = localStorage.getItem('refreshToken');

        // axios.post('https://localhost:7061/api/Authentication/refresh-token', { refreshToken })
        //   .then(({ data }) => {
        //     if (data.accessToken && data.refreshToken) {
        //       localStorage.setItem('accessToken', data.accessToken);
        //       localStorage.setItem('refreshToken', data.refreshToken);
        //       axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
        //       onAccessTokenFetched(data.accessToken);
        //     }
        //     isRefreshing = false;
        //   })
        //   .catch((refreshError) => {
        //     console.error('Refresh login error:', refreshError);
        //     redirectToLogin();
        //     isRefreshing = false;
        //   });


      }

      // Handle GET requests separately
      if (originalRequest.method === 'get') {
        return new Promise((resolve) => {
          addSubscriber(access_token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
            resolve(axios(originalRequest));
          });
        });
      } else {
        // Ensure other methods are also queued and retried after token refresh
        return new Promise((resolve, reject) => {
          addSubscriber(access_token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
            axios(originalRequest).then(resolve).catch(reject);
          });
        });
      }
    }

    if (status === 403) {
      console.error('Access denied. You do not have permission to perform this action.');
      redirectToAccessDenied();
    }

    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(response => response, async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true; 
//         try {
//             const refreshToken = localStorage.getItem('refreshToken');
            
//             const response = await axios.post('https://localhost:7061/api/Authentication/refresh-token',
//                  { refreshToken:refreshToken }
//             );

//             if (response.data.accessToken && response.data.refreshToken) {
         
//                 localStorage.setItem('accessToken', response.data.accyoessToken);
//                 localStorage.setItem('refreshToken', response.data.refreshToken);
//                 originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
//                 return axios(originalRequest); 
//             } else {
//                 console.error('Token refresh failed: No new tokens returned');
//                 redirectToLogin(); 
//             }
//         } catch (refreshError) {
//             if(refreshError.response.status === 401){
//                 console.log(refreshError.response.data)
//             }else{
//                 console.error('Token refresh failed:', refreshError);
//             }
//             redirectToLogin(); 
//         }
//     }

//     if (error.response.status === 403) {
//         console.error('Access denied. You do not have permission to perform this action.');
//         redirectToAccessDenied();
//         return;
//     }
//     return Promise.reject(error);
// });

function redirectToLogin() {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    window.location.href = '/LogIn';
}

function redirectToAccessDenied(){
    window.location.href = '/access-denied';   
}

