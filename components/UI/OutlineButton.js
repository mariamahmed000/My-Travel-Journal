import { Pressable, StyleSheet, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../ThemeManger";

function OutlineButton({ onPress, children }) {
  const { colors } = useContext(ThemeContext);
  const buttonStyle = buttonStyles(colors);
  return (
    <Pressable
      style={(pressed) => [buttonStyle.primary, pressed && buttonStyle.primary]}
      onPress={onPress}
    >
      <Text style={buttonStyle.buttonText}>{children}</Text>
    </Pressable>
  );
}

export default OutlineButton;

export const buttonStyles = (colors) =>
  StyleSheet.create({
    primary: {
      backgroundColor: colors.accent,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "600",
    },
    outline: {
      borderWidth: 2,
      borderColor: colors.accent,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    outlineText: {
      color: colors.accent,
      fontSize: 16,
      fontWeight: "600",
    },
  });
