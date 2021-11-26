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
import { LinearGradient } from 'expo-linear-gradient';
import { API, graphqlOperation } from 'aws-amplify'
import {createNFTart} from "../../src/graphql/mutations"
import { RNS3 } from 'react-native-s3-upload';
import {v4 as uuid} from "uuid"
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
import { isEmpty } from '@aws-amplify/core';
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
const initial_state = {"name": "",
                        "description": "",
                        "image": "",
                        "tag": "",
                        "owner": "maars505",
                        "creator":"Pearl Lam",
                        "likes": 2565
                        }
  // const [input, setInput]= useState(initial_state)
  const [formState, setFormState] = useState(initial_state)
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }
  const [Posted_Status, setPosted_status] = useState("No Actions")
const [errorMsg, setErrorMsg] = useState("")

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
         console.log(result);
    
        if (!result.cancelled) {
          setInput("image", result.uri);
            // console.log("result. uri: ", result.uri)
        }
    }


  const onUploadPost = async() => {
    // console.log("title: ", title, type, description, typeof(bed), bedroom, maxGuests, newPrice)
    // console.log("uploading: ", postData)
    
    

    // const {title, type, description, bed, bedroom, maxGuests, newPrice, newPrice} = postData

    // const { key } = await Storage.put(`${uuid()}.jpeg`,imageData, {contentType: 'image/jpeg'}).then(res => console.log("uploaded to : ", res))
    

    const file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: formState.image,
        name: `${uuid()}.png`,
        type: "image/png"
      }
       
      const options = {
        keyPrefix: "public/",
        // reactnft0c0ea1a253524e7999427c07e89a6e27105937-staging
        // reactnft0c0ea1a253524e7999427c07e89a6e27
        bucket: "reactnft0c0ea1a253524e7999427c07e89a6e27105937-staging",
        region: "ap-southeast-1",
        accessKey: "AKIAXMU5IF4C7HBRCNVP",
        secretKey: "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",
        successActionStatus: 201
      }

//           User name,Password,Access key ID,Secret access key,Console login link
// amplify-user,frxSm^|5LuW=y|P,AKIAXMU5IF4C6QZDILEJ,fTsJd7LSahhfBnpl6zJ8u34An3RWhcCSsgi7IErv,https://508209671941.signin.aws.amazon.com/console

       
      const imageresponse = await RNS3.put(file, options).then(async(response) => {
        if (response.status !== 201){
          // throw new Error("Failed to upload image to S3");
          return [response.status]
        }
        console.log(typeof(response.body.postResponse.location));
        console.log("posting", formState["creator"], formState)
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          await sleep(5000)
        // const createPostInput = postData
        const createdNFT = await API.graphql(graphqlOperation(createNFTart ,{
          input: {id: uuid(), 
            image: response.body.postResponse.location,
            name: formState.name,
            tag: formState.tag,
            description: formState.description,
            owner: formState.owner,
          likes: formState.likes,
          creator: formState.creator
         } }))
        //         console.log("Post created: ", Object.keys(createdNFT))
        // if (Object.keys(createdPost).length > 0){
        //     setPosted_status("Successful")
        //     setFormState(initial_state)
        // }else{
        //     setPosted_status("Unsuccessful")
        // }


        // type NFTart @model {
        //   id: ID!
        //   name: String!
        //   tag: String!
        //   description: String!
        //   image: String!
        //   creator: String!
        //   owner: String!
        //   likes: Int!
        // }
        

        

        return [response.body, createdNFT]
    })

    
    
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

          
          <View style={{marginTop: 120, marginHorizontal:20, 
            flexDirection: 'column', justifyContent: "right", textAlign: "right"}}>
              <Text style={styles.status_msg}>Status:</Text>
              <Text style={styles.status_msg}>{Posted_Status}</Text>
          </View>

          <View style={{marginTop: 30, marginHorizontal:20, 
            flexDirection: 'row', justifyContent: "space-between"}}>
              <Text style={styles.upload_art_text}>Upload Artwork</Text>
          </View>

          <Pressable style={styles.box_image}onPress={pickImage}>
             
              <Entypo name="folder-images" size={35} color="black" />
              <Text style={styles.header_text}>Drag and drop or browse a file</Text>
<Text style={styles.mini_image_text}>PNG, GIF, WEBP, MP4 or MP3. (Max 1Gb)</Text>
             { formState.image.length > 0 ? <Image source={{ uri: formState.image }} style={{ width: 240, height: 150 }} /> : <Text>No Images Selected</Text>}
          
          </Pressable>


<KeyboardAvoidingView
behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.error}>{errorMsg}</Text>
          <View style={styles.Forminputs}>
          <Text style={styles.information}>Information</Text>
          <TextInput
        style={styles.input}
        onChangeText={val => setInput('name', val)}
        value={formState.name}
        placeholder="Item Name"
      />


          <TextInput style={styles.tag_input}
          placeholder="Tag" 
          value={formState.tag}
          onChangeText={val => setInput('tag', val)}
          />

          <TextInput style={styles.description_input}
          placeholder="Description" 
          value={formState.description}
          onChangeText={val => setInput('description', val)}
          />
        <Pressable onPress={async() => {
          setPosted_status("Loading...")
          var message = "Please enter: "
          const items_missing = []
          for (const [key, value] of Object.entries(formState)){
            console.log(value)
            if (value.length == 0 || value == null){
              items_missing += [key]
              console.log(key)
            }
          }
          if (items_missing.length == 0){
            // const item = {image:imageData, Name:itemName, tag:tag, description:description}
              // console.log("uploading: ", formState)
              setErrorMsg("")
              await onUploadPost().then(response => {
                console.log("response: ", response)
                // if (response.length == 1){
                //         setPosted_status("Unsuccessful")
                //       }else{
                      setPosted_status("Successful")
                      setFormState(initial_state)
                  
              }).catch(err => {
                setPosted_status("Unsuccessful")
                console.log("errr", err)
              })
              
          }else{
            console.log(items_missing)
            message += items_missing.join(', ')
            setErrorMsg(message)
          }
        //   if (!isEmpty(imageData) &&  !isEmpty(itemName) 
        //   && !isEmpty(tag) && !isEmpty(description)){
        //   const item = {image:imageData, Name:itemName, tag:tag, description:description}
        //   console.log("uploading: ", item)
        // }else{
          // var message = "Please enter: "
          // const items_missing = []
          // if (isEmpty(imageData)){
          //   items_missing += ["image"]
          // }
          // if (isEmpty(itemName)){
          //   items_missing += ["name"]
          // }
          // if (isEmpty(tag)){
          //   items_missing += ["tag"]
          // }
          // if (isEmpty(description)){
          //   items_missing += ["description"]
          // }


          
          // }
          


          // console.log(items_missing)
          // message += items_missing.join(', ')
          // setErrorMsg(message)

        // }
          }}>
        <LinearGradient
        // Button Linear Gradient
        colors={['#0038F5', '#0038F5', '#9F03FF']}
        style={styles.button} start={{ x: 0.05, y: 0.05 }} >
          <Feather name="upload" size={24} color="white" style={{marginRight: 10}}/>
        <Text style={styles.text}>Upload</Text>
      </LinearGradient>
      </Pressable>




          </View>
          </KeyboardAvoidingView>

          

            
        </ScrollView>
    )
}

// linear-gradient(114.44deg, #0038F5 0%, #9F03FF 100%)

export default HomeScreen
  
const styles = StyleSheet.create({
  container: {
    flex:1, 
  flexDirection:"column",
  backgroundColor:"white",},
  error:{color:"red"},
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 25,
    fontWeight: "bold",
    color: '#fff',
  },

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
        // fontFamily: "Epilogue",
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
    // fontFamily: "Epilogue",
fontStyle: "normal",
fontWeight: "bold",
fontSize: 24,
lineHeight: 32,
/* identical to box height, or 133% */
// letterSpacing: "0.01em"
  },
  status_msg: {
    // fontFamily: "Epilogue",
fontStyle: "normal",
fontWeight: "bold",
fontSize: 24,
lineHeight: 32,
color: "lightgrey",
textAlign: "right"
/* identical to box height, or 133% */
// letterSpacing: "0.01em"
  },
  logo:{
    width: 200,
     height: 50
  },

  mini_image_text: {
/* Mobile/Text/Small_Regular */

// fontFamily: "",
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

// fontFamily: "",
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
// fontFamily:"Epilogue",
fontSize: 20,
marginBottom: 10
  }, description_input:{
    textAlign:"center",
width: 339.96,
height: 154.53,
marginHorizontal:20,
backgroundColor: "#F0F0F0",
borderRadius: 8,
// fontFamily:"Epilogue",
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


// "Successful!" == Posted_Status ? "lightgreen" : "red" 