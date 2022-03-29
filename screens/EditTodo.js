import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as yup from "yup";

const EditTodo = ({ route, navigation }) => {
  const { todo } = route.params;
  const [date, setDate] = useState(new Date(todo.time.seconds * 1000));

  const todoSchema = yup.object().shape({
    title: yup.string().required("Please enter a valid title for your task"),
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const handleTodoEdit = (values) => {
    navigation.navigate("Home", {
      updatedTodo: {
        id: todo.id,
        task: values.title,
        description: values.description,
        time: date,
        completed: todo.completed,
        deleted: false,
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Edit Todo</Text>
        <Formik
          validationSchema={todoSchema}
          initialValues={{ title: todo.task, description: todo.description }}
          onSubmit={(values) => handleTodoEdit(values)}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.form}>
              {errors.title && (
                <Text
                  style={{ fontSize: 16, textAlign: "center", color: "red" }}
                >
                  {errors.title}
                </Text>
              )}
              <TextInput
                onChangeText={handleChange("title")}
                placeholder={todo.task}
                value={values.title}
                style={styles.input}
              />
              <TextInput
                onChangeText={handleChange("description")}
                placeholder={todo.description}
                multiline={true}
                numberOfLines={4}
                value={values.description}
                style={styles.input}
              />
              <View style={styles.inputContainer}>
                <DateTimePicker
                  style={styles.dtp}
                  testID="dateTimePicker"
                  value={date}
                  mode={"time"}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
                <Pressable onPress={handleSubmit} style={styles.saveButton}>
                  <Text style={styles.buttonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default EditTodo;

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
    marginTop: "20%",
  },
  heading: {
    fontWeight: "bold",
    color: "#198CFF",
    textAlign: "center",
    fontSize: 40,
    marginVertical: 20,
  },
  dtp: {
    width: "20%",
  },
  inputContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    width: "60%",
    backgroundColor: "#198CFF",
    borderRadius: 25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
