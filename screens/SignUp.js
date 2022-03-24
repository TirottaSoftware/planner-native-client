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
import * as yup from "yup";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import uuid from "react-native-uuid";

const Signup = ({ navigation }) => {
  const signupSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter your email.")
      .required("Email address is required."),
    username: yup
      .string()
      .required("Please enter a valid username")
      .min(6, () => "Username must be at least 6 characters long."),
    password: yup
      .string()
      // .matches(
      //   /\w*[a-z]\w*/,
      //   "Password must contain at least one lower character"
      // )
      // .matches(
      //   /\w*[A-Z]\w*/,
      //   "Password must contain at least one upper character"
      // )
      // .matches(/\d/, "Password must contain a digit")
      // .matches(
      //   /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      //   "Password must contain at least one special character"
      // )
      .min(8, ({ min }) => `Password must be at least ${min} characters long`)
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Please confirm your password"),
  });

  const createUser = (values) => {
    console.log(values);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (cred) => {
        updateProfile(cred.user, { displayName: values.username });
        navigation.navigate("Home");

        await setDoc(doc(db, "todos", cred.user.uid), {
          todos: [
            {
              completed: false,
              deleted: false,
              id: uuid.v4(),
              task: "Start Adding Todos",
              time: new Date(),
            },
          ],
        });
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
          validationSchema={signupSchema}
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => createUser(values)}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
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
              {errors.confirmPassword && (
                <Text
                  style={{ fontSize: 16, textAlign: "center", color: "red" }}
                >
                  {errors.confirmPassword}
                </Text>
              )}
              {errors.username && (
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: "center",
                    color: "red",
                    marginBottom: 10,
                  }}
                >
                  {errors.username}
                </Text>
              )}
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
              <Pressable
                disabled={!isValid}
                onPress={handleSubmit}
                style={isValid ? styles.button : styles.disabledButton}
              >
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
  disabledButton: {
    borderRadius: 5,
    marginVertical: 5,
    textAlign: "center",
    fontSize: 16,
    color: "white",
    backgroundColor: "grey",
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
