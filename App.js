import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DestinationDetailsScreen from "./screens/DestinationDetailsScreen";
import AddDestination from "./screens/AddDestination";
import ErrorScreen from "./screens/ErrorScreen";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import { ThemeContext, ThemeProvider } from "./components/ThemeManger";
import { useContext } from "react";
import { ThemeToggel } from "./components/UI/ThemeToggel";


function MainNavigator() {
  const { colors } = useContext(ThemeContext);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <ThemeToggel />,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primary,
        contentStyle: {
          backgroundColor: colors.background,
        },
        headerStyleInterpolator: ({ current, next, layouts }) => ({
          headerStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        }),
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="TravelDetails"
        component={DestinationDetailsScreen}
        options={{ title: "" ,animation: "fade",
          animationDuration: 300,}}
      />
      <Stack.Screen
        name="AddDestination"
        component={AddDestination}
        options={{ title: "" }}
      />
      <Stack.Screen name="Error" component={ErrorScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
}
