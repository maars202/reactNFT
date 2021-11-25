import React, {useState, useRef} from 'react'
import {View, Text, RecyclerViewBackedScrollViewBase, 
    TextInput, Picker, TouchableOpacity, TextField,
    Button, Image, Scrollable, Pressable, ScrollView,
    KeyboardAvoidingView,Platform, ImageBackground} from 'react-native'
import {StyleSheet,} from 'react-native';
// import styles from './styles'
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { Feather } from '@expo/vector-icons';
import logo from "../../assets/9299.png"
import logo2 from "../../assets/Logo.png"
import {
  useFonts,
  Epilogue_100Thin,
  Epilogue_200ExtraLight,
  Epilogue_300Light,
  Epilogue_400Regular,
  Epilogue_500Medium,
  Epilogue_600SemiBold,
  Epilogue_700Bold,
  Epilogue_800ExtraBold,
  Epilogue_900Black,
  Epilogue_100Thin_Italic,
  Epilogue_200ExtraLight_Italic,
  Epilogue_300Light_Italic,
  Epilogue_400Regular_Italic,
  Epilogue_500Medium_Italic,
  Epilogue_600SemiBold_Italic,
  Epilogue_700Bold_Italic,
  Epilogue_800ExtraBold_Italic,
  Epilogue_900Black_Italic,
} from '@expo-google-fonts/epilogue';
const HomeScreen = (props) => {
  let [fontsLoaded] = useFonts({
    Epilogue_100Thin,
    Epilogue_200ExtraLight,
    Epilogue_300Light,
    Epilogue_400Regular,
    Epilogue_500Medium,
    Epilogue_600SemiBold,
    Epilogue_700Bold,
    Epilogue_800ExtraBold,
    Epilogue_900Black,
    Epilogue_100Thin_Italic,
    Epilogue_200ExtraLight_Italic,
    Epilogue_300Light_Italic,
    Epilogue_400Regular_Italic,
    Epilogue_500Medium_Italic,
    Epilogue_600SemiBold_Italic,
    Epilogue_700Bold_Italic,
    Epilogue_800ExtraBold_Italic,
    Epilogue_900Black_Italic,
  });


      const [imageData, setImageData] = useState(null)
const [itemName, setItemName] = useState("")
const [tag, setTag] = useState("")
const [description, setDescription] = useState("")
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
         console.log(result);
    
        if (!result.cancelled) {
            setImageData(result.uri);
            // console.log("result. uri: ", result.uri)
        }
    }
    return (
        <ScrollView style={styles.container}>
        
          <View style={styles.header_view}>
              <Image style={styles.logo} source={logo2}/>
              <View style={{ flexDirection:"row"}}>
              <Feather style={{ marginRight: 20}} name="search" size={24} color="black" />
              <Feather name="menu" size={24} color="black" />
              </View>
          </View>

          <View style={{marginTop: 190, marginHorizontal:20}}>
              <Text style={styles.upload_art_text}>Upload Artwork</Text>
          </View>

          <Pressable style={styles.box_image}onPress={pickImage}>
             
              <Entypo name="folder-images" size={35} color="black" />
              <Text style={styles.header_text}>Drag and drop or browse a file</Text>
<Text style={styles.mini_image_text}>PNG, GIF, WEBP, MP4 or MP3. (Max 1Gb)</Text>
             {<Image source={{ uri: imageData }} style={{ width: 240, height: 150 }} />}
          
          </Pressable>


<KeyboardAvoidingView
behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
          <View style={styles.Forminputs}>
          <Text style={styles.information}>Information</Text>
          <TextInput
        style={styles.input}
        onChangeText={setTag}
        value={tag}
        placeholder="Item Name"
      />


          <TextInput style={styles.tag_input}
          placeholder="Tag" 
          value={itemName}
          onChangeText={setItemName}
          />

          <TextInput style={styles.description_input}
          placeholder="Description" 
          value={itemName}
          onChangeText={setItemName}
          />

          




          </View>
          </KeyboardAvoidingView>

          

            
        </ScrollView>
    )
}

export default HomeScreen
  
const styles = StyleSheet.create({
  container: {flex:1, 
  flexDirection:"column",
  backgroundColor:"white",},

  header_view: {
        flex: 2,
        flexDirection: "row",
        position: "absolute",
        width: 370,
        height: 55.83,
        left: 16,
        top: 10.48,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 40

        },
      header_text:{
        fontFamily: "Epilogue",
fontStyle: "normal",
fontWeight: "bold",
fontSize: 20,
lineHeight: 28,
      },
  box_image:{
    width: 360,
    height: 260,
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor:"#F8F8F8",
    borderRadius: 32,
    justifyContent:"center",
    alignItems:"center"
  },
  upload_art_text:{
    fontFamily: "Epilogue",
fontStyle: "normal",
fontWeight: "bold",
fontSize: 24,
lineHeight: 32,
/* identical to box height, or 133% */
// letterSpacing: "0.01em"
  },
  logo:{
    width: 200,
     height: 50
  },

  mini_image_text: {
/* Mobile/Text/Small_Regular */

fontFamily: "Epilogue",
fontStyle: "normal",
fontWeight: "500",
fontSize: 13,
lineHeight: 20,
/* identical to box height, or 154% */

display: "flex",
alignItems: "center",
textAlign: "center",

/* GrayScale/Placehoder */

color: "#888888",
},
 Inputfields: {
        fontWeight: "bold",
        fontSize: 30,
        
    },
    Forminputs: {
        flex: 1,
        justifyContent: "space-between",
        marginVertical: 20,
        marginHorizontal: 20
    },
    input: {
    height: 56,
    width: 330,
    marginLeft:22,
    margin: 13,
    borderWidth: 1,
    padding: 10,
    borderRadius:8
  },
  information: {
    /* Mobile/Link/Small_Bold */

fontFamily: "",
fontStyle: "normal",
fontWeight: "bold",
fontSize: 20,
lineHeight: 20,


display: "flex",
alignItems: "center",

/* GrayScale/Body */

color: "#333333",
  },
  tag_input:{
    textAlign:"center",
width: 339.96,
height: 56.62,
marginHorizontal:20,
backgroundColor: "#F0F0F0",
borderRadius: 8,
fontFamily:"Epilogue",
fontSize: 20,
marginBottom: 10
  }, description_input:{
    textAlign:"center",
width: 339.96,
height: 154.53,
marginHorizontal:20,
backgroundColor: "#F0F0F0",
borderRadius: 8,
fontFamily:"Epilogue",
fontSize: 20,
  },
  image:{
    // width: 240, 
    // height: 150 
  },

// <Text style={{marginLeft:22, marginTop:10}}>Item Name:</Text>
  
});

// <ImageBackground style={styles.box_image} source={{ uri:imageData }} resizeMode="cover"></ImageBackground>
//  {<Image source={{ uri: imageData }} style={{ width: 240, height: 150 }} />}


