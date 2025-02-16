import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "./../components/UI/Card";
import ErrorScreen from "./ErrorScreen";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../components/ThemeManger";
import { GetAllCountries, getAllCountries } from "../store/redux/Destination";
import { Ionicons } from "@expo/vector-icons";

function HomeScreen({ navigation }) {
  const { colors } = useContext(ThemeContext);
  const homeStyle = homeStyles(colors);
  const country = useSelector((state) => state.destination.country);
  const loading = useSelector((state) => state.destination.loading);
  const error = useSelector((state) => state.destination.error);

  const dispatch = useDispatch();

  function AddDestHandle() {
    navigation.navigate("AddDestination");
  }

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => {
  //       return <Button title="add" onPress={AddDestHandle} />;
  //     },
  //   });
  // }, []);

  
  useEffect(() => {
    dispatch(GetAllCountries());
  }, []);

  if (error) {
    return <ErrorScreen />;
  }
  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  function navigateToDetailsDes(item) {
    navigation.navigate("TravelDetails", { destination: item });
  }

  return (
    <View style={homeStyle.container}>
      <Text style={homeStyle.title}>My Travel Journal</Text>

      <FlatList
        data={country}
        renderItem={({ item }) => (
          <Card place={item} handelDetails={navigateToDetailsDes} />
        )}
        keyExtractor={(item) => item.countryCode}
        contentContainerStyle={homeStyle.listContainer}
      />
       <TouchableOpacity 
        style={homeStyle.fab} 
        onPress={AddDestHandle}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;

const homeStyles = (colors) =>
  StyleSheet.create({
    fab: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.accent,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.primary,
      textAlign: "center",
      marginVertical: 20,
    },
    listContainer: {
      paddingBottom: 20,
    },
  });
