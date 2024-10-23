import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import PeopleContext from "../PeopleContext";

export default function AddPersonScreen({ navigation }) {
  const [name, setName] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const { addPerson } = useContext(PeopleContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [dob, setDob] = useState("");

  const handleAddPerson = () => {
    if (!name || !dob) {
      setModalMessage("Please fill in all fields");
      setShowSuccessModal(true);
      return;
    }
    addPerson({ name, dob });
    setModalMessage("Person added successfully!");
    setShowSuccessModal(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Person</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dob}
        onChangeText={setDob}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddPerson}>
        <Text style={styles.addButtonText}>Add Person</Text>
      </TouchableOpacity>

      {/* Custom inline modal for confirmation or validation messages */}
      {showSuccessModal && (
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowSuccessModal(false);
                if (modalMessage === "Person added successfully!") {
                  navigation.goBack();
                }
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    fontSize: 18,
    padding: 10,
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
  },
});
