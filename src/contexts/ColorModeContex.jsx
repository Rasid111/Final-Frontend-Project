import { createContext, useEffect, useState } from "react";

export const ColorModeContext = createContext(["light", () => { }]);

export const ColorModeProvider = ({ children }) => {

    const [colorMode, setColorMode] = useState("light");

    useEffect(() => {
        const localStorageInfo = localStorage.getItem("colorMode");

        if (localStorageInfo !== null) {
            const html = document.querySelector("html");
            html.setAttribute("data-bs-theme", localStorageInfo);
            html.classList = [localStorageInfo];
            setColorMode(localStorageInfo);
        } else {
            localStorage.setItem("colorMode", "light");
        }

    }, [])

    function switchColorMode() {
        localStorage.setItem("colorMode", colorMode === "dark" ? "light" : "dark");
        const html = document.querySelector("html");
        html.setAttribute("data-bs-theme", colorMode === "dark" ? "light" : "dark");
        html.classList = [colorMode === "dark" ? "light" : "dark"];
        setColorMode(colorMode === "dark" ? "light" : "dark");
    }

    return <ColorModeContext.Provider value={[colorMode, switchColorMode]}>{children}</ColorModeContext.Provider>
}