import { createContext, useEffect, useState } from "react";

export const AccountContext = createContext([]);

export const AccountProvider = ({ children }) => {

    function ensureCreated() {
        const authInfo = localStorage.getItem("auth");
        if (authInfo === null) {
            localStorage.setItem("auth", JSON.stringify(0))
        }
        const accountsInfo = localStorage.getItem("accounts");
        if (accountsInfo === null) {
            localStorage.setItem("accounts", JSON.stringify([{
                id: 0,
                username: "guest",
                email: null,
                pass: null,
                cart: []
            }]))
        }
    }

    useEffect(() => {
        ensureCreated();
        const auth = JSON.parse(localStorage.getItem("auth"));
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        setAccount(accounts.find((account) => account.id === auth));
    }, [])

    const [account, setAccount] = useState();

    function login(email, pass) {
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        const result = accounts.find((account) => (account.email === email && account.pass === pass));
        if (result) {
            localStorage.setItem("auth", JSON.stringify(result.id));
            setAccount(result);
            return true;
        } else {
            setAccount(accounts[0]);
            return false;
        }
    }

    function register(username, email, pass) {
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        console.log(email)
        console.log(accounts);
        
        if (accounts.some(acc => acc.email === email)) {
            console.log("account with this email already exists");
            return false;
        }
        accounts.push({
            id: accounts[accounts.length - 1].id + 1,
            username: username,
            email: email,
            pass: pass,
            cart: []
        });
        localStorage.setItem("accounts", JSON.stringify(accounts));
        return true;
    }

    return <AccountContext.Provider value={{ account, setAccount, login, register}}>{children}</AccountContext.Provider>
}