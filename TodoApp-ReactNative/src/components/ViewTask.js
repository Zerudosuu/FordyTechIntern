import { React, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import theme from "../Style/theme";

export default function ViewTask({ task, onClose, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(task.frequency === "Everyday");
  const [editableTask, setEditableTask] = useState(task);

  const handleSave = () => {
    setIsEditing(false);
    onSave(editableTask);
  };

  const handleToggleFrequency = () => {
    setIsChecked(!isChecked);
    setEditableTask((prevTask) => ({
      ...prevTask,
      frequency: !isChecked ? "Everyday" : "Once",
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>View Task</Text>
          <TouchableOpacity
            style={styles.Editbutton}
            onPress={() => {
              setIsEditing(true);
            }}
          >
            <Icon name="pencil" size={32} />
          </TouchableOpacity>
        </View>

        {/* Display task details */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Task Name:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={editableTask.name}
              onChangeText={(text) =>
                setEditableTask((prevTask) => ({
                  ...prevTask,
                  name: text,
                }))
              }
            />
          ) : (
            <Text style={styles.detail}>{task.name || "N/A"}</Text>
          )}
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Description:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={editableTask.description}
              onChangeText={(text) =>
                setEditableTask((prevTask) => ({
                  ...prevTask,
                  description: text,
                }))
              }
            />
          ) : (
            <Text style={styles.detail}>{task.description || "N/A"}</Text>
          )}
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Frequency:</Text>
          {isEditing ? (
            <View style={styles.checkbox}>
              <Checkbox
                status={isChecked ? "checked" : "unchecked"}
                onPress={handleToggleFrequency}
              />
              <Text style={styles.checkboxText}>
                {isChecked ? "Repeat Everyday" : "Once"}
              </Text>
            </View>
          ) : (
            <Text style={styles.detail}>{editableTask.frequency || "N/A"}</Text>
          )}
        </View>
      </ScrollView>

      {/* Action buttons */}
      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <>
            {/* Cancel Button: no background, only border */}
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: theme.colors.primary, // Border color set to primary
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
                width: "48%", // Match button size
              }}
              onPress={() => {
                setIsEditing(false);
                setEditableTask(task);
              }}
            >
              <Text style={{ color: theme.colors.primary }}>Cancel</Text>
            </TouchableOpacity>

            {/* Save Changes Button: background color from theme */}
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
                width: "48%", // Match button size
              }}
              onPress={handleSave}
            >
              <Text style={{ color: "#fff" }}>Save Changes</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={{
              // Example for a different button color
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              width: "100%",
              borderWidth: 1, // Full-width button
            }}
            onPress={onClose}
          >
            <Text style={{ color: "black" }}>Close</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    marginTop: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
  },

  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },

  Editbutton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    padding: 5,
  },

  detailContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },

  detail: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },

  input: {
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
    backgroundColor: "#f7f7f7",
  },

  checkboxText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
  },

  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  buttonClose: {
    paddingVertical: 12,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,

    borderWidth: 1,
  },

  deleteButton: {
    backgroundColor: "#f44336",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  checkbox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
