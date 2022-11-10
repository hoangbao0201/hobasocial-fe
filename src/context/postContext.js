import axios from "axios";
import { createContext } from "react";
import { apiUrl } from "./constant";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {

    const getMutiplePosts = async (page, perpage) => {
        try {
            const response = await axios.get(`${apiUrl}/api/post/all-post?page=${page}&perpage=${perpage}`);

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

    const getUserPost = async (page, perpage, id) => {
        try {
            const response = await axios.get(`${apiUrl}/api/post/user-post?page=${page}&perpage=${perpage}&id=${id}`);

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

    const createPost = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/api/post/create-post`, data);

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
    }

    const editPost = async (data, id) => {
        try {
            const response = await axios.patch(`${apiUrl}/api/post/edit-post/${id}`, data);

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
    }

    const likePost = async (data) => {
        try {
            const response = await axios.put(`${apiUrl}/api/post/like-post/${data}`)

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
    }

    const unlikePost = async (data) => {
        try {
            const response = await axios.put(`${apiUrl}/api/post/unlike-post/${data}`)

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
    }

    const deletePost = async (data) => {
        try {
            const response = await axios.delete(`${apiUrl}/api/post/delete-post/${data}`);

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
    }

    const uploadSingleImage = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/api/post/upload-single-image`, data)

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
    }

    const addComment = async (data, id) => {
        try {
            const response = await axios.put(`${apiUrl}/api/post/add-comment/${id}`, data);

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
    }

    const deleteComment = async (data, id) => {
        try {
            const response = await axios.put(`${apiUrl}/api/post/delete-comment/${id}`, data);

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
    }

    const dataPostContext = {
        getMutiplePosts,
        getUserPost,

        createPost,
        editPost,
        deletePost,

        likePost,
        unlikePost,

        addComment,
        deleteComment,
        
        uploadSingleImage
    };
    return (
        <PostContext.Provider value={dataPostContext}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
