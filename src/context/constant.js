// export const apiUrl = "http://hoangbao-hobachat.herokuapp.com";
// export const apiUrl = "http://localhost:5000";

// export const apiUrl =
//     process.env.NODE_ENV !== "production"
//         ? "http://localhost:5000"
//         : process.env.URLAPI;

export const apiUrl =
    process.env.NODE_ENV == "production"
    ? process.env.URLAPI
    : "http://localhost:5000"

export const LOCAL_STORAGE_TOKEN_NAME = "TokenUser";
