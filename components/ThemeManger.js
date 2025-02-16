import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { darkColors, lightColors } from "../util/Colors";
import { getData, storeData } from "../util/AsyncStorage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("");

  function toggelTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  useLayoutEffect(() => {
    const fetchStorge = async () => {
      const storedData = await getData("theme");
      if (storedData) {
        setTheme(storedData);
      }
    };
    fetchStorge();
  }, []);


  useEffect(()=>{
    const saveValues = async () => {
      await storeData("theme", theme);
    };
    saveValues();
   
  },[theme])

  const colors = theme === "dark" ? darkColors : lightColors;
  return (
    <ThemeContext.Provider value={{ theme, colors, toggelTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
