import React from 'react'
import {View, Text, RecyclerViewBackedScrollViewBase, Image, ScrollView} from 'react-native'
// import styles from './styles'
import { MaterialIcons } from '@expo/vector-icons';
import logo from "../../assets/9299.png"
import {StyleSheet,} from 'react-native';
const HomeScreen = (props) => {
    return (
        <View style={styles.container}>
        <View sytle={styles.header_view}>
            
            <MaterialIcons name="menu" size={24} color="black" />
            <MaterialIcons name="menu" size={24} color="black" />
        </View>
        </View>

    )
}

export default HomeScreen

  
const styles = StyleSheet.create({
  container: {flex:1, flexDirection:"column"},

  header_view: {
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        width: 343,
        height: 55.83,
        left: 16,
        top: 10.48,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50

        },
  
  
});



