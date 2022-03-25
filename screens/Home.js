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
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  orderBy,
} from "firebase/firestore";
import Todo from "../components/Todo";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const isFocused = useIsFocused();

  const completeTask = async (todo) => {
    const todosRef = doc(db, "todos", auth.currentUser.uid);
    await updateDoc(todosRef, {
      todos: arrayRemove(todo),
    });
    const updatedTodo = Object.assign(todo, { completed: !todo.completed });
    await updateDoc(todosRef, {
      todos: arrayUnion(updatedTodo),
    });
    queryCollection().catch((err) => console.log(err));
  };

  const queryCollection = async () => {
    if (isFocused) {
      const todosRef = collection(db, "todos");
      const q = await query(
        todosRef,
        where("__name__", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      await querySnapshot.forEach((doc) => {
        setTodos(doc.data().todos);
      });
    }
  };

  useEffect(() => {
    queryCollection().catch((err) => console.log(err));
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.todosHeading}>My Todos</Text>
        {todos?.map((todo) => {
          if (!todo.completed) {
            return (
              <Todo
                completeTask={() => completeTask(todo)}
                key={todo.id}
                todo={todo}
              />
            );
          }
        })}
        {todos?.map((todo) => {
          if (todo.completed) {
            return (
              <Todo
                completeTask={() => completeTask(todo)}
                key={todo.id}
                todo={todo}
              />
            );
          }
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
