import AppNavigator from "./AppNavigator";
import { SafeAreaProvider  } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { PeopleProvider } from "./PeopleContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <PeopleProvider>
        <AppNavigator />
      </PeopleProvider>
    </SafeAreaProvider>
  );
}