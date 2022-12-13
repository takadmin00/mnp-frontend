import React from "react";
import { StatusBar } from "expo-status-bar";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import currentList from "./reducers/currentList";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({ user, currentList });
const persistConfig = { key: "monnouveaupanier", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WelcomeScreen from "./screens/connection/WelcomeScreen";
import GuidesScreen from "./screens/guides/GuidesScreen";
import BookmarksScreen from "./screens/bookmarks/BookmarksScreen";
import OffersScreen from "./screens/offers/OffersScreen";
import ListsScreen from "./screens/lists/ListsScreen";
import SectionsScreen from "./screens/lists/SectionsScreen";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            if (route.name === "MNP") {
              iconName = "map-pin";
            } else if (route.name === "Favoris") {
              iconName = "map-pin";
            } else if (route.name === "Offres") {
              iconName = "map-pin";
            } else if (route.name === "Listes") {
              iconName = "map-pin";
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "grey",
          headerShown: true,
        })}
      >
        <Tab.Screen name="MNP" component={GuidesScreen} />
        <Tab.Screen name="Favoris" component={BookmarksScreen} />
        <Tab.Screen name="Offres" component={OffersScreen} />
        <Tab.Screen name="Listes" component={ListsScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Bienvenue" component={WelcomeScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="Sections" component={SectionsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
