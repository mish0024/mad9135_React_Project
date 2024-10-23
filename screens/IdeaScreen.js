import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import PeopleContext from "../PeopleContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function IdeaScreen({ navigation, route }) {
  const { id, name } = route.params;
  const [modalMessage, setModalMessage] = useState("");
  const { getIdeas, deleteIdea } = useContext(PeopleContext);
  const [showModal, setShowModal] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  const confirmDeleteIdea = () => {
    deleteIdea(id, idDelete);
    setShowModal(false);
  };

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <Text style={{ fontSize: 26 }}>{`${name}'s Ideas`}</Text>

      {getIdeas(id).length === 0 && (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="power-plug-off-outline"
            size={80}
            color="black"
          />
          <Text style={styles.emptyText}>No ideas found</Text>
          <Text style={styles.addPrompt}>Add one</Text>
        </View>
      )}
{/* Add the following code to the end of the file */}
      <FlatList
        data={getIdeas(id)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ideaContainer}>
            <View>
              <Image
                source={{ uri: item.img }}
                style={{ width: item.width, height: item.height }}
              />
            </View>
            {/* Display the idea text and delete button */}
            <View style={styles.ideaDetails}>
              <Text style={{ fontSize: 18 }}>{item.text}</Text>
              <TouchableOpacity
                onPress={() => {
                  setIdDelete(item.id);
                  setModalMessage(
                    `Are you sure you want to delete this idea (${item.text})?`
                  );
                  setShowModal(true);
                }}
                style={styles.deleteButton}
              >
                <Text style={{ fontSize: 18, color: "white" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Custom inline modal for delete confirmation */}
      {showModal && (
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Delete Idea</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmDeleteIdea}
              >
                <Text style={styles.confirmText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddIdea", { id })}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Add Idea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 22,
    marginTop: 20,
  },
  addPrompt: {
    fontSize: 18,
    marginTop: 5,
    color: "gray",
  },
  ideaContainer: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
  },
  ideaDetails: {
    flex: 1,
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    alignSelf: "flex-end",
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  confirmText: {
    color: "white",
    fontSize: 16,
  },
  cancelText: {
    color: "white",
    fontSize: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
});
