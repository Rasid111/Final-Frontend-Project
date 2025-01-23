export const getCart = (email) => ({
    type: "GET_CART", payload: {email: email}
});