import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db, auth } from "../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import * as yup from "yup";
import uuid from "react-native-uuid";

const AddTodo = ({ navigation }) => {
  const [date, setDate] = useState(new Date());

  const todoSchema = yup.object().shape({
    title: yup.string().required("Please enter a valid title for your task"),
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const addTodo = async (values) => {
    const todosRef = doc(db, "todos", auth.currentUser.uid);

    const newTodo = {
      task: values.title,
      description: values.description,
      time: date.toISOString(),
      id: uuid.v4(),
      completed: false,
      deleted: false,
    };

    await updateDoc(todosRef, {
      todos: arrayUnion(newTodo),
    });
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Add Todo</Text>
      <Formik
        validationSchema={todoSchema}
        initialValues={{ title: "", description: "" }}
        onSubmit={(values) => addTodo(values)}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={styles.form}>
            {errors.title && (
              <Text style={{ fontSize: 16, textAlign: "center", color: "red" }}>
                {errors.title}
              </Text>
            )}
            <TextInput
              onChangeText={handleChange("title")}
              placeholder="Title"
              value={values.title}
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("description")}
              placeholder="Description"
              multiline={true}
              numberOfLines={4}
              value={values.description}
              style={styles.input}
            />
            <View style={styles.buttonsContainer}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.cancelButton}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <DateTimePicker
                style={styles.dtp}
                testID="dateTimePicker"
                value={date}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
              <Pressable onPress={handleSubmit} style={styles.addButton}>
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  input: {
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#9F9F9F",
    fontSize: 22,
    borderRadius: 5,
    backgroundColor: "white",
  },
  container: {
    width: "90%",
    margin: "5%",
  },
  heading: {
    fontWeight: "bold",
    color: "#198CFF",
    textAlign: "center",
    fontSize: 40,
    marginVertical: 20,
  },
  buttonsContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelButton: {
    maxWidth: "30%",
    backgroundColor: "#FFD301",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
  },
  addButton: {
    maxWidth: "30%",
    backgroundColor: "#198CFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  dtp: {
    width: "20%",
  },
});
