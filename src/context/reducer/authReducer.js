export const authReducer = (state, action) => {

    switch (action.type) {
        case "AUTH_LOADED_SUCCESS":
            return {
                ...state,
                authLoading: false,
                ...action.payload,
            };

        default:
            return state;
    }
};
