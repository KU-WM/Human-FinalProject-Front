import axios from "axios";


const refreshApi = axios.create({
    baseURL: "/api",
    withCredentials: true
})

refreshApi.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem("token")
        if(token) {
            config.headers.Authorization = "Bearer " + token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

refreshApi.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status ===401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("Refresh Start");
                
                const res = await axios.post("/api/token/refresh", null, {withCredentials: true});
                const newAccessToken = res.data.accessToken;
                localStorage.setItem("token", newAccessToken);

                console.log("Refresh Success", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return refreshApi(originalRequest); // 🔁 재요청
            } catch (e) {
                // refresh 실패 → 로그아웃
                localStorage.setItem("redirectAfterLogin", window.location.pathname);

                localStorage.removeItem("token");

                window.location.href = "/login";
                return new Promise(() => {});
            }
        }
    }
)


export default refreshApi;
