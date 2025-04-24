import CurrencyAPI from "@everapi/currencyapi-js";
import { createContext, useEffect, useState } from "react";

export const CurrencyContext = createContext({ currency: "usd", switchCurrency: () => { }, rate: 0 });

export const CurrencyProvider = ({ children }) => {

    const [currency, setCurrency] = useState("usd");
    const [rate, setRate] = useState(0)

    useEffect(() => {
        const localStorageInfo = localStorage.getItem("currency");

        if (localStorageInfo !== null) {
            setCurrency(localStorageInfo);
        } else {
            localStorage.setItem('currency', 'usd');
        }

    }, [])

    useEffect(() => {
        const apiKey = "cur_live_wFeoVDQippnLsVZw27pMvmUFQJluzzfrE5edPeNT";
        const client = new CurrencyAPI(apiKey);
        client.latest({
            base_currency: 'AZN',
            currencies: 'USD'
        }).then(response => {
            setRate(response.data.USD.value);
        });
    }, [])

    function switchCurrency() {
        localStorage.setItem("currency", currency === "usd" ? "azn" : "usd");
        setCurrency(currency === "usd" ? "azn" : "usd");
    }

    return <CurrencyContext.Provider value={{ currency: currency, switchCurrency: switchCurrency, rate: rate }}>{children}</CurrencyContext.Provider>
}