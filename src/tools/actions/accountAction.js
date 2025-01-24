export const createAccount = (user) => {
    return {
        type: "CREATE_ACCOUNT",
        payload: user
    };
};

export const login = (credentials) => {
    return {
        type: "LOGIN",
        payload: credentials
    };
};

export const addToCart = (product) => {
    return {
        type: "ADD_TO_CART",
        payload: product
    };
};

export const incrementProductQuantity = (product) => {
    return {
        type: "INCREMENT_PRODUCT_QUANTITY",
        payload: product
    };
};

export const decrementProductQuantity = (product) => {
    return {
        type: "DECREMENT_PRODUCT_QUANTITY",
        payload: product
    };
};

export const changeProductQuantity = (product) => {
    return {
        type: "CHANGE_PRODUCT_QUANTITY",
        payload: product
    };
};

export const removeProduct = (product) => {
    return {
        type: "REMOVE_PRODUCT",
        payload: product
    };
};

export const logout = () => {
    return {
        type: "LOGOUT",
    };
};