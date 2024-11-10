import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function ViewTask({ task, onClose, onDelete }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>View Task</Text>

        {/* Display task details */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Task Name:</Text>
          <Text style={styles.detail}>{task?.name || "N/A"}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.detail}>{task?.description || "N/A"}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Frequency:</Text>
          <Text style={styles.detail}>{task?.frequency || "N/A"}</Text>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={onDelete}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  detailContainer: {
    marginBottom: 15,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  detail: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#f44336",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
