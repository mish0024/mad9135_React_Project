import React, { useContext, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import {
  FlatList,
  View,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PeopleContext from "../PeopleContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function PeopleScreen({ navigation }) {
  const { people, deletePerson } = useContext(PeopleContext);
  const [idDelete, setIdDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const renderRightActions = (item) => (
    <TouchableOpacity
      onPress={() => {
        setIdDelete(item.id);
        setModalMessage(`Are you sure that you want to delete ${item.name}?`);
        setShowModal(true);
      }}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  // Render each item in the list and attach a swipeable component
  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDob}>{item.dob}</Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("IdeaScreen", { id: item.id, name: item.name })
          }
          style={styles.ideaButton}
        >
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </Swipeable>
  );

  // return the JSX for the PeopleScreen component
  return (
    <View style={{ padding: 10, flex: 1 }}>
      {people && people.length === 0 && (
        <View style={styles.emptyState}>
          <AntDesign name="inbox" size={80} color="black" />
          <Text style={styles.emptyText}>No people found</Text>
          <Text style={styles.addPrompt}>Add one</Text>
        </View>
      )}


      {people && people.length > 0 && (
        <View>
          <Text style={styles.title}>People List</Text>
          <FlatList
            contentContainerStyle={{ gap: 10 }}
            data={people}
            style={{ marginTop: 10, height: "100%" }}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      )}

      {/* Custom inline modal for deletion confirmation */}
      {showModal && (
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Delete Confirmation</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => {
                  deletePerson(idDelete);
                  setShowModal(false);
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.modalButtonCancel}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
{/* Add a floating action button to add a new person */}
      {Platform.OS === "android" && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            navigation.navigate("AddPersonScreen");
          }}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#2196F3",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 5,
    height: "100%",
  },
  deleteText: {
    color: "white",
  },
  itemContainer: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "lightgrey",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 18,
  },
  itemDob: {
    fontSize: 16,
    color: "darkgrey",
  },
  ideaButton: {
    justifyContent: "center",
  },
  emptyState: {
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "darkgrey",
  },
  addPrompt: {
    fontSize: 20,
    color: "darkgrey",
  },
  title: {
    fontSize: 26,
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
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 10,
  },
  modalButtonCancel: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
  },
});
