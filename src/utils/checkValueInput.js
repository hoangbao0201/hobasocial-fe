export const checkDataRegister = (data) => {
    // check value
    if (!data.name && !data.username && !data.password && !data.rePassword) {
        return {
            success: false,
            warningField: ["name", "username", "password", "rePassword"],
            msg: "Bạn chưa điền đầy đủ thông tin",
        };
    }
    // Check name
    if (!data.name) {
        return {
            success: false,
            warningField: ["name"],
            msg: "Bạn chưa điền tên",
        };
    }
    if (data.name.length < 3) {
        return {
            success: false,
            warningField: ["name"],
            msg: "Tên quá ngắn",
        };
    }
    if (data.name.length > 20) {
        return {
            success: false,
            warningField: ["name"],
            msg: "Tên quá dài",
        };
    }
    // Check username
    if (!data.username) {
        return {
            success: false,
            warningField: ["username"],
            msg: "Bạn chưa điền tên",
        };
    }
    if (data.username.length < 3) {
        return {
            success: false,
            warningField: ["username"],
            msg: "Tài khoản quá ngắn",
        };
    }
    if (data.username.length > 20) {
        return {
            success: false,
            warningField: ["username"],
            msg: "Tài khoản quá dài",
        };
    }
    // Check password
    if (!data.password) {
        return {
            success: false,
            warningField: ["password"],
            msg: "Bạn chưa điền tên",
        };
    }
    if (data.password.length < 3) {
        return {
            success: false,
            warningField: ["password"],
            msg: "Mật khẩu quá ngắn",
        };
    }
    if (data.password.length > 20) {
        return {
            success: false,
            warningField: ["password"],
            msg: "Mật khẩu quá dài",
        };
    }
    if (data.password !== data.rePassword) {
        return {
            success: false,
            warningField: ["password", "rePassword"],
            msg: "Mật khẩu không giống nhau",
        };
    }

    return {
        success: true,
    };
};

export const checkDataLogin = (data) => {
    if (!data.username || !data.password) {
        return {
            success: false,
            warningField: ["username", "password"],
            msg: "Bạn chưa điền đầy đủ thông tin",
        };
    }
    // Check username
    if (data.username.length < 3) {
        return {
            success: false,
            warningField: ["username"],
            msg: "Tài khoản quá ngắn",
        };
    }
    if (data.username.length > 20) {
        return {
            success: false,
            warningField: ["username"],
            msg: "Tài khoản quá dài",
        };
    }
    // Check password
    if (data.password.length < 3) {
        return {
            success: false,
            warningField: ["password"],
            msg: "Mật khẩu quá ngắn",
        };
    }
    if (data.password.length > 20) {
        return {
            success: false,
            warningField: ["password"],
            msg: "Mật khẩu quá dài",
        };
    }

    return {
        success: true,
    };
};

export const checkDataUpdateUser = (data) => {
    const arrayListWarning = [];
    if (!data.name) {
        arrayListWarning.push("name");
    }
    if (!data.username) {
        arrayListWarning.push("username");
    }
    if (!data.oldPassword) {
        arrayListWarning.push("oldPassword");
    }
    if (!data.newPassword) {
        arrayListWarning.push("newPassword");
    }
    if (!data.reNewPassword) {
        arrayListWarning.push("reNewPassword");
    }
    if(arrayListWarning.length>0) {
        return {
            success: false,
            warningField: arrayListWarning,
            msg: "Bạn chưa điền thông tin"
        }
    }
    // Check name
    if (data.name.length < 3) {
        return {
            success: false,
            warningField: ["name"],
            msg: "Tên quá ngắn",
        };
    }
    if (data.name.length > 20) {
        return {
            success: false,
            warningField: ["name"],
            msg: "Tên quá dài",
        };
    }
    // Check username
    if (data.username.length < 3) {
        return {
            success: false,
            warningField: ["username"],
            msg: "Tài khoản quá ngắn",
        };
    }
    if (data.username.length > 20) {
        return {
            success: false,
            warningField: ["username"],
            msg: "Tài khoản quá dài",
        };
    }
    // Check password
    if (data.newPassword.length < 3) {
        return {
            success: false,
            warningField: ["newPassword"],
            msg: "Mật khẩu mới quá ngắn",
        };
    }
    if (data.newPassword.length > 20) {
        return {
            success: false,
            warningField: ["newPassword"],
            msg: "Mật khẩu mới quá dài",
        };
    }
    if (data.newPassword !== data.reNewPassword) {
        return {
            success: false,
            warningField: ["newPassword", "reNewPassword"],
            msg: "Mật khẩu mới không giống nhau",
        };
    }

    return {
        success: true,
        warningField: [],
    }
};
