import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { buttonStyles } from "./OutlineButton";
import { FlagImage } from "../FlageImage";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../ThemeManger";

function Card({ place, handelDetails }) {

  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  /// Animated
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const { colors } = useContext(ThemeContext);
  const cardStyle = cardStyles(colors);
  const buttonStyle = buttonStyles(colors);
  const { name, capital, region, countryImage } = place;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
    <View style={cardStyle.container}>
      <FlagImage source={{ uri: countryImage.uri }} style={cardStyle.image} />
      <View style={cardStyle.textContainer}>
        <Text style={cardStyle.cardTitle}>{name.common}</Text>
        <Text style={cardStyle.description}>{capital}</Text>
        <Text style={cardStyle.description}> 📍 Location: {region}</Text>
      </View>
      <View style={cardStyle.buttonContainer}>
        <TouchableOpacity
          style={buttonStyle.primary}
          onPress={() => handelDetails(place)}
        >
          <Text style={buttonStyle.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Animated.View>
  );
}

export default Card;

export const cardStyles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderRadius: 12,
      marginBottom: 16,
      ...Platform.select({
        ios: {
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    image: {
      width: "100%",
      height: 180,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    textContainer: {
      padding: 16,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.primary,
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: colors.secondary,
      lineHeight: 20,
    },
    buttonContainer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
  });
