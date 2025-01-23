import { createContext, useEffect, useState } from "react";

export const ColorModeContext = createContext(["dark", () => {}]);

export const ColorModeProvider = ({ children }) => {

    const [colorMode, setColorMode] = useState("dark");

    useEffect(() => {
        const localStorageInfo = localStorage.getItem("colorMode");

        if (localStorageInfo !== null) {
            document.querySelector("html").setAttribute("data-bs-theme", localStorageInfo)
            setColorMode(localStorageInfo);
        } else {
            localStorage.setItem("colorMode", "dark");
        }

    }, [])

    function switchColorMode() {
        localStorage.setItem("colorMode", colorMode === "dark" ? "light" : "dark");
        document.querySelector("html").setAttribute("data-bs-theme", colorMode === "dark" ? "light" : "dark")
        setColorMode(colorMode === "dark" ? "light" : "dark");
    }

    return <ColorModeContext.Provider value={[colorMode, switchColorMode]}>{children}</ColorModeContext.Provider>
}