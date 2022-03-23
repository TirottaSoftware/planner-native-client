import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import { auth } from "../firebase";

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Hello, {auth.currentUser.displayName}</Text>
      <Button onPress={() => auth.signOut()} title="Logout" />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
