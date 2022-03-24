import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import { auth } from "./firebase";
import AddTodo from "./screens/AddTodo";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const Stack = createNativeStackNavigator();

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {loggedIn ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddTodo" component={AddTodo} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
