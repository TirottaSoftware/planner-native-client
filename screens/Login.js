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
import { signInWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";

const Login = ({ navigation }) => {
  const signIn = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((user) => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err.message);
        return;
      });
  };

  const loginSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={require("../assets/TP_logo.png")} />
        <Text style={styles.heading}>Log In</Text>
        <Formik
          validationSchema={loginSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => signIn(values)}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.form}>
              {errors.email && (
                <Text
                  style={{ fontSize: 16, textAlign: "center", color: "red" }}
                >
                  {errors.email}
                </Text>
              )}
              {errors.password && (
                <Text
                  style={{ fontSize: 16, textAlign: "center", color: "red" }}
                >
                  {errors.password}
                </Text>
              )}
              <TextInput
                onChangeText={handleChange("email")}
                placeholder="Email"
                textContentType="emailAddress"
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
              <Pressable onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
              </Pressable>

              <Text style={styles.link}>
                Don't have an account?
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("Signup")}
                >
                  <Text style={styles.linkText}>{`\t`}Sign Up</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100,
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
