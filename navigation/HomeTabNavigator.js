import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import ExploreNavigator from './ExploreNavigator';
// import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/Profile';
// import SearchPage from "../screens/DestinationSearch"
// import SearchResultsMapPage from "../screens/SearchResultsMap"
// import PostScreen from "../screens/PostScreen"
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Feather from 'react-native-vector-icons/Feather';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import ProfileScreen from "../screens/ProfileScreen";

import UploadImage from "../screens/UploadImage";
// new icons for expo:
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();

const HomeTabNavigator = (props) => {
  return (
    <Tab.Navigator
    screenOptions={{
    headerShown: false
  }}

      tabBarOptions={{
        activeTintColor: '#f15454',
      }}>
      <Tab.Screen
        name={'Explore'}
        // ExploreNavigator
        component={UploadImage}
        // options={{
        //   tabBarIcon: ({color}) => (
        //     <Fontisto name="search" size={25} color={color} />
        //   ),
        // }}
        options= {{
          tabBarIcon: ({color}) => (
            <Ionicons name="md-home" size={24} color="black" />
),
        }}
      />
      <Tab.Screen
        name={'Saved'}
        component={UploadImage}
        options={{
          tabBarIcon: ({color}) => (
        //     <FontAwesome name="heart-o" size={25} color={color} />
        <MaterialIcons name="favorite-border" size={24} color="black" />
          ),
        
        }}
      />
      
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;


// <Tab.Screen
//         name={'Airbnb'}
//         component={() => <UploadImage />}
//         options={{
//           tabBarIcon: ({color}) => (
//         //     <FontAwesome5 name="airbnb" size={25} color={color} />
//         <FontAwesome5 name="airbnb" size={24} color="black" />
//           ),
//         }}
//       />
//       {/* , {latitude: 28, longitude: -16.5} */}
//       <Tab.Screen
//         name={'Messages'}
//         component={UploadImage}
//         options={{
//           tabBarIcon: ({color}) => (
//         //     <Feather name="message-square" size={25} color={color} />
//         <Feather name="message-square" size={24} color="black" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name={'profile'}
//         component={UploadImage}
//         options={{
//           tabBarIcon: ({color}) => (
//         //     <EvilIcons name="user" size={25} color={color} />
//         <FontAwesome5 name="user-circle" size={24} color="black" />
//           ),
//         }}
//       />