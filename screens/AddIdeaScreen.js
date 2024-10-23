import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import PeopleContext from "../PeopleContext";

export default function AddIdeaScreen({ navigation, route }) {
  const { addIdea } = useContext(PeopleContext);
  const { id } = route.params;
  const [modalMessage, setModalMessage] = useState("");
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleAddIdea = () => {
    if (!text || !image) {
      setModalMessage("Please enter an idea and choose an image");
      setShowModal(true);
      return;
    }
    addIdea(id, { text, img: image, width: 100, height: 100 });
    setModalMessage("Idea added successfully!");
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add an Idea</Text>

      <TextInput
        style={styles.input}
        placeholder="Idea text"
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Pick an image</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddIdea}>
        <Text style={styles.addButtonText}>Add Idea</Text>
      </TouchableOpacity>

      {/* Custom inline modal for success or validation messages */}
      {showModal && (
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowModal(false);
                if (modalMessage === "Idea added successfully!") {
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
  imagePicker: {
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  imagePickerText: {
    color: "black",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
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
