import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./reducer/authReducer";
import axios from "axios";
import setAuthToken from "~/utils/setAuthToken";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constant";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    const autoFetch = axios.create({
        baseURL: "http://localhost:5000",
    });

    // // Add a response interceptors
    // autoFetch.interceptors.response.use(
    //     function (config) {},
    //     function (error) {
    //         localStorage.removeItem("TokenUser");
    //         return Promise.reject(error);
    //     }
    // );
    // // Add a response interceptors
    // autoFetch.interceptors.response.use(
    //     function (response) {
    //         return response;
    //     },
    //     function (error) {
    //         if (error.response.status === 400) {
    //             console.log(123);
    //         }
    //         localStorage.removeItem("TokenUser");
    //         return Promise.reject(error);
    //     }
    // );

    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const response = await axios.get(`${apiUrl}/api/auth/check-token`);
            if (response.data.success) {
                dispatch({
                    type: "AUTH_LOADED_SUCCESS",
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            dispatch({
                type: "AUTH_LOADED_SUCCESS",
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    // Login user
    const loginUser = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/login`, data);
            if (response.data.success) {
                localStorage.setItem("TokenUser", response.data.accessToken);
            }

            await loadUser();

            return response.data;
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return {
                    success: false,
                    msg: error.msg,
                };
            }
        }
    };

    const registerUser = async (data) => {
        try {
            const response = await autoFetch.post(
                `${apiUrl}/api/auth/register`,
                data
            );

            return response.data;
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return {
                    success: false,
                    msg: error.msg,
                };
            }
        }
    };

    const updateUser = async (data) => {
        try {
            const response = await axios.patch("/api/update-user");

            return response.data;
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            }
            else {
                return {
                    success: false,
                    msg: error.msg
                }
            }
        }
    }

    const logoutUser = async () => {
        localStorage.removeItem("TokenUser");
        dispatch({
            type: "AUTH_LOADED_SUCCESS",
            payload: {
                isAuthenticated: false,
                user: null
            }
        })
    }

    const dataAuthContext = {
        state,
        autoFetch,
        loginUser,
        registerUser,
        updateUser,
        logoutUser
    };
    return (
        <AuthContext.Provider value={dataAuthContext}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
