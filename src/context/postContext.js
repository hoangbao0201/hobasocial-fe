import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { apiUrl } from "./constant";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [state, setStateContext] = useState(null);

    const getMutiplePosts = async (page, perpage) => {
        try {
            const response = await axios.get(`${apiUrl}/api/post/all-post?page=${page}&perpage=${perpage}`);

            return response.data;
        } catch (error) {
            if(error.data.response) {
                return error.data.response;
            }
            else {
                return {
                    success: false,
                    msg: error.msg
                }
            }
        }
    };

    const createPost = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/api/post/create-post`, data);

            return response.data;
        } catch (error) {
            if(error.data.response) {
                return error.data.response;
            }
            else {
                return {
                    success: false,
                    msg: error.msg
                }
            }
        }
    }

    const likePost = async (data) => {
        try {
            const response = await axios.put(`${apiUrl}/api/post/like-post/${data}`)

            return response.data;
        } catch (error) {
            if(error.data.response) {
                return error.data.response;
            }
            else {
                return {
                    success: false,
                    msg: error.msg
                }
            }
        }
    }

    const unlikePost = async (data) => {
        try {
            const response = await axios.put(`${apiUrl}/api/post/unlike-post/${data}`)

            return response.data;
        } catch (error) {
            if(error.data.response) {
                return error.data.response;
            }
            else {
                return {
                    success: false,
                    msg: error.msg
                }
            }
        }
    }

    const uploadSingleImage = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/api/post/upload-single-image`, data)

            return response.data;
        } catch (error) {
            if(error.data.response) {
                return error.data.response;
            }
            else {
                return {
                    success: false,
                    msg: error.msg
                }
            }
        }
    }

    const dataPostContext = {
        state,
        getMutiplePosts,
        createPost,
        likePost,
        unlikePost,
        uploadSingleImage
    };
    return (
        <PostContext.Provider value={dataPostContext}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
