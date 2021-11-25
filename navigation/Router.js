import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import DestinationSearchScreen from "../screens/DestinationSearch";
// import GuestsScreen from "../screens/Guests";
//  import HomeScreen from "../screens/HomeScreen";
import HomeTabNavigator from "./HomeTabNavigator";
// import ExploreNavigator from "./ExploreNavigator";
// import PostScreen from "../screens/PostScreen";
// import DetailedPost from "../screens/D";
// import SearchPage from "../screens/DestinationSearch"
// import GuestsScreen from "../screens/Guests"
// import AddLocationScreen from "../screens/AddLocation"
import UploadImagesScreen from "../screens/UploadImage"
import PreviewImage from "../screens/PreviewImage"
const Stack = createStackNavigator();

const Router = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name={"Home"}
          component={HomeTabNavigator}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={"UploadImage"}
          component={UploadImagesScreen}
          options={{
            title: "Search your destination"
          }}
        />

        <Stack.Screen
          name={"Preview"}
          component={PreviewImage}
          options={{
            title: "Search your destination"
          }}
        />
        

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;