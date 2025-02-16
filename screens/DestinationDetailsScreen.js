import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlagImage } from "../components/FlageImage";
import { buttonStyles } from "../components/UI/OutlineButton";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemeManger";

function DestinationDetailsScreen({ route }) {
  const { colors } = useContext(ThemeContext);
  const detailsStyle = detailsStyles(colors);
  const buttonStyle = buttonStyles(colors);
  const { destination } = route.params;

  const navigate = useNavigation();
  return (
    <View style={detailsStyle.container}>
      <FlagImage
        source={{ uri: destination.countryImage.uri }}
        style={detailsStyle.detailsImage}
      />
      <Text style={detailsStyle.detailsTitle}>{destination.name.common}</Text>
      <Text style={detailsStyle.detailsText}>{destination.capital}</Text>
      <Text style={detailsStyle.detailsText}>
        📍 Location: {destination.region | 'Not have'}
      </Text>
      <TouchableOpacity
        style={[buttonStyle.primary, detailsStyle.backButton]}
        onPress={() => navigate.goBack()}
      >
        <Text style={buttonStyle.buttonText}>Back to Destinations</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DestinationDetailsScreen;

const detailsStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
    },
    detailsImage: {
      width: "100%",
      height: 300,
      borderRadius: 12,
      marginVertical: 20,
    },
    detailsTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 16,
      textAlign: "center",
    },
    detailsText: {
      fontSize: 16,
      color: colors.secondary,
      lineHeight: 24,
      marginBottom: 8,
    },
    backButton: {
      position: "absolute",
      bottom: 30,
      alignSelf: "center",
      width: "80%",
    },
    detailsImage: {
      width: "100%",
      height: 300,
      borderRadius: 12,
      marginVertical: 20,
      resizeMode: "contain", // or 'cover'
    },
  });
