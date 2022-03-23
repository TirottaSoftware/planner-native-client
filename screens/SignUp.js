import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup = ({ navigation }) => {
  const createUser = (values) => {
    console.log(values);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((cred) => {
        updateProfile(cred.user, { displayName: values.username });
        navigation.navigate("Home");
        console.log(cred);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={require("../assets/TP_logo.png")} />
        <Text style={styles.heading}>Sign Up</Text>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => createUser(values)}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.form}>
              <TextInput
                onChangeText={handleChange("username")}
                placeholder="Username"
                value={values.username}
                style={styles.input}
              />
              <TextInput
                onChangeText={handleChange("email")}
                placeholder="Email"
                value={values.email}
                style={styles.input}
              />
              <TextInput
                onChangeText={handleChange("password")}
                placeholder="Password"
                textContentType="password"
                secureTextEntry
                value={values.password}
                style={styles.input}
              />
              <TextInput
                onChangeText={handleChange("confirmPassword")}
                placeholder="Confirm Password"
                textContentType="password"
                secureTextEntry
                value={values.confirmPassword}
                style={styles.input}
              />
              <Pressable onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </Pressable>

              <Text style={styles.link}>
                Already a user?
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.linkText}>{`\t`}Log In</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#9F9F9F",
    fontSize: 22,
    borderRadius: 5,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#198CFF",
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    paddingVertical: 10,
  },
  form: {
    width: "90%",
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  heading: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#198CFF",
    marginVertical: 20,
  },
  link: {
    textAlign: "center",
    fontSize: 16,
    margin: 10,
    color: "grey",
  },
  linkText: {
    textAlign: "center",
    fontSize: 16,
    color: "#FFD301",
  },
});
