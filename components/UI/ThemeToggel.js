import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { ThemeContext } from "../ThemeManger";

export const ThemeToggel = () => {
  const { toggelTheme, theme } = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={toggelTheme}>
      <Ionicons
        name={theme === "dark" ? "moon" : "sunny"}
        size={24}
        color={theme === "dark" ? "#FFF" : "#000"}
      />
    </TouchableOpacity>
  );
};