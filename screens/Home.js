import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
  ScrollView,
  ActivityIndicator,
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

const Home = ({ route, navigation }) => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState();
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  const updatedTodo = route.params?.updatedTodo;

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

  const handleTodoEdit = async () => {
    setLoading(true);
    const todosRef = doc(db, "todos", auth.currentUser.uid);
    await updateDoc(todosRef, {
      todos: arrayRemove(editTodo),
    });
    await updateDoc(todosRef, {
      todos: arrayUnion(updatedTodo),
    });
    queryCollection()
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  const queryCollection = async () => {
    if (isFocused) {
      setLoading(true);
      const todosRef = collection(db, "todos");
      const q = await query(
        todosRef,
        where("__name__", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      await querySnapshot.forEach((doc) => {
        setTodos(doc.data().todos);
      });
      setLoading(false);
    }
  };

  const deleteTodo = async (todo) => {
    console.log(todo);
    const todosRef = doc(db, "todos", auth.currentUser.uid);
    await updateDoc(todosRef, {
      todos: arrayRemove(todo),
    });
    queryCollection().catch((err) => console.log(err));
  };

  useEffect(() => {
    if (updatedTodo) handleTodoEdit();
  }, [route?.params]);

  useEffect(() => {
    queryCollection().catch((err) => console.log(err));
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.todosHeading}>My Todos</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#198CFF" />
        ) : (
          todos?.map((todo) => {
            if (!todo.completed) {
              return (
                <Todo
                  editTodo={() => {
                    setEditTodo(todo);

                    navigation.push("EditTodo", {
                      todo: {
                        id: todo.id,
                        task: todo.task,
                        description: todo.description,
                        time: todo.time,
                        completed: todo.completed,
                      },
                    });
                  }}
                  deleteTodo={() => deleteTodo(todo)}
                  completeTask={() => completeTask(todo)}
                  key={todo.id}
                  todo={todo}
                />
              );
            }
          })
        )}
        {todos?.map((todo) => {
          if (todo.completed) {
            return (
              <Todo
                editTodo={() => {
                  setEditTodo(todo);

                  navigation.push("EditTodo", {
                    todo: {
                      id: todo.id,
                      task: todo.task,
                      description: todo.description,
                      time: todo.time,
                      completed: todo.completed,
                    },
                  });
                }}
                deleteTodo={() => deleteTodo(todo)}
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
