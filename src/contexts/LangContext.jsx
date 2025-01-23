import { createContext, useEffect, useState } from "react";

export const LangContext = createContext("en");

export const LangProvider = ({ children }) => {
    
    const [lang, setLang] = useState("en");

    useEffect(() => {
        const localStorageInfo = localStorage.getItem("lang");

        if (localStorageInfo !== null) {
            setLang(localStorageInfo);
        } else {
            localStorage.setItem("lang", "en");
        }

    }, [])

    function switchLang() {
        localStorage.setItem("lang", lang === "en" ? "az" : "en");
        setLang(lang === "en" ? "az" : "en");
    }

    return <LangContext.Provider value={[lang, switchLang]}>{children}</LangContext.Provider>
}