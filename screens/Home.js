import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Todo from "../components/Todo";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(async () => {
    if (isFocused) {
      const query = await getDocs(collection(db, "todos"));
      await query.forEach((doc) => {
        setTodos(doc.data().todos);
      });
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.todosHeading}>My Todos</Text>
        {todos?.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.push("AddTodo")}>
        <View style={styles.addTodoButton}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
            + Add Todo
          </Text>
        </View>
      </TouchableOpacity>
      <Button onPress={() => auth.signOut()} title="Logout" />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: "30%",
  },
  todosHeading: {
    fontWeight: "bold",
    color: "#198CFF",
    textAlign: "center",
    fontSize: 40,
    marginVertical: 20,
  },
  addTodoButton: {
    width: "40%",
    marginVertical: 20,
    marginHorizontal: "30%",
    color: "white",
    backgroundColor: "#198CFF",
    padding: 15,
    borderRadius: 25,
  },
});
