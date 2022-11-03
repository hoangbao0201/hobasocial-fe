import axios from "axios";
import { createContext, useReducer } from "react";
import { apiUrl } from "./constant";

export const MessageContext = createContext();

const initState = {
    receiveUser: {
        _id: "",
        name: "",
        image: {
            url: "",
        },
    },
    allMessages: null,
    dataContentMessages: null,
    msgLoading: true,
    
    searchPeopleMesage: [],
    loadingSearchPeople: true,
};

const reducer = (state, action) => {
    
    // console.log(action.payload)

    switch (action.type) {
        case "GET_ALL_MESSAGE":
            return {
                ...state,
                allMessages: action.payload.messages,
                msgLoading: false
            }
        case "SEARCH_PEOPLE_MESSAGE":
            return {
                ...state,
                searchPeopleMesage: action.payload.messages,
                loadingSearchPeople: false
            }
        case "CHANGE_ALL_MESSAGES":
            return {
                ...state,
                allMessages: action.payload
            }
        case "CHANGE_DATACONTENT_MESSAGES":
            return {
                ...state,
                content: action.payload
            }
    
        default:
            return state;
    }
};

const MessageProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const getAllMsg = async (data) => {
        try {
            const response = await axios.put(
                `${apiUrl}/api/message/all-message`
            );

            if(response.data.success) {
                dispatch({
                    type: "GET_ALL_MESSAGE",
                    payload: response.data
                });
            }

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

    const userMessage = async (data) => {
        try {
            const response = await axios.put(`${apiUrl}/api/message/user-message/${data}`);

            // if(response.data.success) {
            //     dispatch({
            //         type: "SEARCH_PEOPLE_MESSAGE",
            //         payload: response.data
            //     });
            // }

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

    const sendMessage = async (data) => {
        try {
            const response = await axios.put(`${apiUrl}/api/message/send-message`, data);

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

    const changeAllMessages = async (data) => {
        dispatch({
            type: "CHANGE_ALL_MESSAGES",
            payload: data
        })
    }

    const changeDataContentMessages = async (data) => {
        dispatch({
            type: "CHANGE_DATACONTENT_MESSAGES",
            payload: data
        })
    }

    const dataMessageContext = {
        state,
        getAllMsg,
        userMessage,
        sendMessage,
        changeAllMessages,
        changeDataContentMessages,
    };
    return (
        <MessageContext.Provider value={dataMessageContext}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageProvider;
