import { StyleSheet, Text, View, Pressable } from "react-native";
import { PencilIcon, TrashIcon } from "react-native-heroicons/outline";
import React from "react";

const Todo = ({ todo, completeTask, deleteTodo }) => {
  return (
    <View style={styles.todo}>
      <View style={styles.todoDetails}>
        <Pressable
          style={
            todo.completed ? styles.solidCompleteButton : styles.completeButton
          }
          onPress={completeTask}
        />
        <Text style={todo.completed ? styles.completedTask : styles.task}>
          {todo.task.toString().slice(0, 20)}
          {todo.task.toString().length > 20 && `...`}
        </Text>
      </View>
      <View style={styles.todoButtons}>
        <Pressable style={styles.editButton}>
          <Text style={styles.icon}>
            <PencilIcon color={"white"} />
          </Text>
        </Pressable>
        <Pressable onPress={deleteTodo} style={styles.deleteButton}>
          <Text style={styles.icon}>
            <TrashIcon color={"white"} />
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  todo: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  todoButtons: {
    display: "flex",
    flexDirection: "row",
  },
  task: {
    fontSize: 20,
    color: "#707070",
    textAlign: "center",
  },
  completedTask: {
    textDecorationLine: "line-through",
    fontSize: 20,
    color: "#707070",
    textAlign: "center",
  },
  completeButton: {
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: "#198CFF",
    borderWidth: 1,
    width: 40,
    height: 40,
    marginHorizontal: 20,
  },
  solidCompleteButton: {
    borderRadius: 20,
    backgroundColor: "#198CFF",
    borderColor: "#198CFF",
    borderWidth: 1,
    width: 40,
    height: 40,
    marginHorizontal: 20,
  },
  editButton: {
    width: 50,
    height: 50,
    backgroundColor: "#FFD301",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
  },
  deleteButton: {
    width: 50,
    height: 50,
    backgroundColor: "#EE0000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
