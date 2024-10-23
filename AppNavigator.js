import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Button, Platform } from "react-native";
import PeopleScreen from "./screens/PeopleScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AddPersonScreen from "./screens/AddPersonScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen";
import IdeaScreen from "./screens/IdeaScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <View style={{ flex: 1, paddingBottom: insets.bottom }}>
        <Stack.Navigator initialRouteName="People">
          <Stack.Screen
            name="People"
            component={PeopleScreen}
            options={({ navigation }) => ({
              title: "People List",
              headerRight: () =>
                Platform.OS === 'ios' && (
                  <Button
                    title="Add Person"
                    onPress={() => navigation.navigate("AddPerson")}
                  />
                ),
            })}
          />
          <Stack.Screen 
            name="AddPerson" 
            component={AddPersonScreen} 
          />
          <Stack.Screen 
            name="Ideas" 
            component={IdeaScreen} 
            options={({ navigation, route }) => ({
              title: `${route.params.name}'s Ideas`,
              headerRight: () =>
                Platform.OS === 'ios' && (
                  <Button
                    title="Add Idea"
                    onPress={() => navigation.navigate("AddIdea", { id: route.params.id, name: route.params.name })}
                  />
                ),
            })}
          />
          <Stack.Screen 
            name="AddIdea" 
            component={AddIdeaScreen} 
            options={{ title: "Create New Idea" }} 
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppNavigator;
