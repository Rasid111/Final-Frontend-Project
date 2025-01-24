import { useContext } from "react";
import Swal from "sweetalert2";
import { LangContext } from "../../contexts/LangContext";

let initialState = {
    auth: null,
    accounts: [
        {
            login: null,
            email: null,
            password: null,
            cart: []
        }
    ]
};

const accounts = localStorage.getItem("accounts");

if (accounts === null)
    localStorage.setItem("accounts", JSON.stringify(initialState));
else
    initialState = JSON.parse(accounts);

export const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_ACCOUNT":
            if (state.accounts.some((acc) => acc.email === action.payload.email)) {
                Swal.fire({
                    title: "Registration failed",
                    text: "Account with this email already exists",
                    icon: "error",
                    customClass: {
                        popup: 'swal2-dark',
                    }
                });
                return state;
            }
            Swal.fire({
                title: "Registration succeeded",
                icon: "success",
                customClass: {
                    popup: 'swal2-dark',
                }
            });
            let buffer = []
            if (state.auth === null) {
                buffer = state.accounts.find(account => account.email === null).cart;
            }
            return {
                ...state,
                accounts: [
                    ...state.accounts.map(account => {
                        console.log("in")
                        if (account.email === null && state.auth === null) {
                            return {
                                ...account,
                                cart: []
                            }
                        }
                        return account;
                    }),
                    {
                        login: action.payload.name,
                        email: action.payload.email,
                        password: action.payload.password,
                        cart: buffer
                    }
                ]
            };
        case "LOGIN":
            if (state.accounts.some(acc => (acc.email === action.payload.email && acc.password === action.payload.password))) {
                Swal.fire({
                    title: "Login succeeded",
                    icon: "success",
                    customClass: {
                        popup: 'swal2-dark',
                    }
                });
                return {
                    ...state,
                    auth: action.payload.email
                };
            }
            Swal.fire({
                title: "Login failed",
                text: "Incorrect email or password",
                icon: "error",
                customClass: {
                    popup: 'swal2-dark',
                }
            });
            return state;
        case "LOGOUT":
            return {
                ...state,
                auth: null
            };
        case "ADD_TO_CART":
            Swal.fire({
                title: "Product added",
                icon: "success",
                customClass: {
                    popup: 'swal2-dark',
                }
            });
            return {
                ...state,
                accounts: state.accounts.map((account) => {
                    if (account.email === state.auth) {
                        return {
                            ...account,
                            cart: account.cart.some(p => p.id === action.payload.id) ? account.cart.map(p => {
                                if (p.id === action.payload.id) {
                                    return {
                                        ...p,
                                        quantity: p.quantity + 1
                                    }
                                }
                                return p;
                            }) : [...account.cart, { ...action.payload, quantity: 1 }],
                        };
                    }
                    return account;
                }),
            };
        case "CHANGE_PRODUCT_QUANTITY":
            return {
                ...state,
                accounts: state.accounts.map((account) => {
                    if (account.email === state.auth) {
                        return {
                            ...account,
                            cart: account.cart.map(p => {
                                if (p.id === action.payload.id) {
                                    return {
                                        ...p,
                                        quantity: Number(action.payload.quantity)
                                    }
                                }
                                return p;
                            }).filter(p => p.quantity !== 0)
                        };
                    }
                    return account;
                }),
            };
        case "INCREMENT_PRODUCT_QUANTITY":
            return {
                ...state,
                accounts: state.accounts.map((account) => {
                    if (account.email === state.auth) {
                        return {
                            ...account,
                            cart: account.cart.map(p => {
                                if (p.id === action.payload) {
                                    return {
                                        ...p,
                                        quantity: Number(p.quantity) + 1
                                    }
                                }
                                return p;
                            }).filter(p => p.quantity !== 0)
                        };
                    }
                    return account;
                }),
            };
        case "DECREMENT_PRODUCT_QUANTITY":
            return {
                ...state,
                accounts: state.accounts.map((account) => {
                    if (account.email === state.auth) {
                        return {
                            ...account,
                            cart: account.cart.map(p => {
                                if (p.id === action.payload) {
                                    return {
                                        ...p,
                                        quantity: Number(p.quantity) - 1
                                    }
                                }
                                return p;
                            }).filter(p => p.quantity !== 0)
                        };
                    }
                    return account;
                }),
            };
        case "REMOVE_PRODUCT":
            return {
                ...state,
                accounts: state.accounts.map((account) => {
                    if (account.email === state.auth) {
                        return {
                            ...account,
                            cart: account.cart.filter(p => p.id != action.payload)
                        };
                    }
                    return account;
                }),
            };
        default:
            return state;
    }
}