import React, {useState, useEffect} from 'react'
import {View, Text, RecyclerViewBackedScrollViewBase,
     Image, ScrollView, FlatList, ImageBackground, RefreshControl} from 'react-native'
// import styles from './styles'
import { MaterialIcons } from '@expo/vector-icons';
import logo from "../../assets/9299.png"
import {StyleSheet,} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify'
import {getImageURLs, listNFTarts} from "../../src/graphql/queries"
import {updateNFTart} from "../../src/graphql/mutations"
import profilelogo from"../../assets/1946429.png"
import { AntDesign } from '@expo/vector-icons';
import logo2 from "../../assets/Logo.png"
import { Feather } from '@expo/vector-icons';
import {onCreateImageURLs} from "../../src/graphql/subscriptions"
// import { useWindowDimensions } from 'react-native';
// const {width, height} = useWindowDimensions();
{/* <ImageBackground source={img} resizeMode="cover" style={styles.image}>
        </ImageBackground> */}

// const Item = (props) => (
//     post = props.post

//     <View style={styles.post2}>
//         <Image source={{uri: image}} style={styles.image}/>
//       <Text style={styles.title}>{name}</Text>
//       <Text style={styles.title}>{name}</Text>
//       <Text style={styles.title}>{name}</Text>
//     </View>
//   );

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const addLike = async(post, like = true) => {
  try {
    console.log("inital: ", post)
      // const song = Posts[idx];
      if (like){
          post.likes += 1;
        }else{
          post.likes -= 1;
        }
      delete post.createdAt;
      delete post.updatedAt;
      console.log("final: ", post)
      const songData = await API.graphql(graphqlOperation(updateNFTart, { input: post }));
      // const songList = [...songs];
      post = songData.data.updateSong;
      console.log("new post after liking: ", post)
      // setSongs(songList);
      return post
  } catch (error) {
      console.log('error on adding Like to song', error);
  }
};
  

  const Post = (props) => {
    const [like, setLike] = useState(false)
    var post = props.post;
    const post_id = props.id;


    // flex: 1,
    //         justifyContent: "center",
    //         width: 295,
    //         height: 60,
    //         margin: 4,
    //         marginBottom: 10,
    //         borderRadius: 24,


    return (
        <View style={styles.post2}>
        {<Image source={{uri: post.image}} style={styles.image}/>}
        <Text style={styles.title}>{post.name}</Text>
        <View style={{width: 295, margin: 10, flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{flexDirection: "row"}}>
            <Image source={profilelogo} style={styles.imageprofile}/>
            <View style={{marginLeft: 10}}>
              <Text  numberOfLines={1} style={styles.owner}>{ ((post.creator).length > 13) ? 
    (((post.creator).substring(0,13-3)) + '...') : 
    post.creator }</Text>
              
              <Text style={{}}>Creator</Text>
            </View>
            </View>
            <View style={{flexDirection:"row"}}>
            <View style={{justifyContent: "center", flexWrap: 'wrap', textAlign: "right"}}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>{post.likes}</Text>
              </View>
              <View style={{justifyContent: "center", margin:10}}>
              {like ? <AntDesign onPress={async () => {console.log(like)
                  setLike(!like)
                  post = await addLike(post, false)}} style={{ }} name="heart" size={24} color="black" /> :
                  <AntDesign onPress={async () => {console.log(like)
                    setLike(!like)
                    post = await addLike(post, true)}} style={{ }} name="hearto" size={24} color="black" />}
              </View>
            </View>
        </View>
        <Text style={{padding: 5}} numberOfLines={2}>{post.description}</Text>

    </View>
    )
  }  

const HomeScreen = (props) => {
    const posts = [{"title": "1", img: "../../assets/9299.png"},
    {"title": "1adfas"},
    {"title": "1sadfsadf"},
    {"title": "1asdfa"},
    {"title": "1sdfafds"}]

    const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);

    const fetchPosts = async() => {
        try {
          const postsResults = await API.graphql(
            graphqlOperation(listNFTarts, {limit: 10}))
            setPosts(postsResults.data.listNFTarts.items)
            console.log("postsResults: ",  postsResults)
        }catch(errr) {
          console.log(errr)
      
        }
      }
    await fetchPosts() 
    wait(1000).then(() => setRefreshing(false));
  }, []);

    const [Posts, setPosts] = useState([])
  useEffect( () => {
    const fetchPosts = async() => {
      try {
        const postsResults = await API.graphql(
          graphqlOperation(listNFTarts, {limit: 10}))
          setPosts(postsResults.data.listNFTarts.items)
          console.log("postsResults: ",  postsResults)
      }catch(errr) {
        console.log(errr)
    
      }
    }
    fetchPosts() 
    // other code from this method omitted

//   const subscription = async() => {
//   await API.graphql(
//     graphqlOperation(onCreateImageURLs)
//   ).subscribe({
//     next: restaurantData => {
//       const restaurant = restaurantData.value.data.onCreateImageURLs
//     //   const restaurants = 
//     //   [
//     //     ...this.state.restaurants.filter(r => {
//     //       return (
//     //         r.name !== restaurant.name andand r.description !== restaurant.description
//     //       )
//     //     }),
//     //     restaurant
//     //   ]
//     //   this.setState({ restaurants })
//     console.log("restaurant: ", restaurant)
//     setPosts(restaurant)
//     }
//   })}

// subscription()
}, [])


    


  const renderItem = ({ item, key }) => (
    <Post post={item} id={key}/>
  );

    return (
        <View style={styles.container}>
            <View style={styles.header_view}>
              {/* <Image style={styles.logo} source={logo2}/> */}
              <Text></Text>
              <View style={{ flexDirection:"row", justifyContent:"right"}}>
              <Feather style={{ marginRight: 20}} name="search" size={24} color="black" />
              <Feather name="menu" size={24} color="black" />
              </View>
          </View>
            
            <View style={styles.blog_container}>
                

        <FlatList
                data={Posts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                }
            />
            </View>
        </View>

    )
}

export default HomeScreen

  
const styles = StyleSheet.create({
  container: {flex:1, flexDirection:"column",
// marginTop: 20,
margin: 20,
padding: 20,
// backgroundColor: "orange"
},
blog_container:{
    flex:2,
    // backgroundColor: "green",
//     margin: 20,
// padding: 20,
marginTop: 130,
flexDirection: "column"
},
post:{
    flex:2,
    // height:40,
    // backgroundColor: "yellow",
    margin: 20,
    textAlign: "center",
    justifyContent: "center"
},


  header_view: {
    flex: 2,
    flexDirection: "row",
    position: "absolute",
    width: 370,
    height: 55.83,
    left: 16,
    top: 10.48,
    textAlign: "right",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    // backgroundColor: "yellow",

        },
        item:{
            marginVertical:10
        },
        post2:{

// position: "absolute",
width: 320,
height: 525.71,
left: 0.67,
top: 0.14,
marginBottom: 10,
margin: 10,
padding: 10,

backgroundColor: "#FFFFFF",
borderRadius: 32,
        },
        post_image:{
            position: "absolute",
left: "3.49%",
right: "3.35%",
top: "2.03%",
bottom: "22.07%",
borderRadius: 24,
height: 100,
// backgroundColor: "pink"
        },
        image: {
            flex: 1,
            justifyContent: "center",
            width: 295,
            height: 60,
            margin: 4,
            marginBottom: 10,
            borderRadius: 24,
          },
          title:{
            /* Mobile/Display/Small_Bold */

// font-family: Epilogue;
fontStyle: "normal",
fontWeight: "bold",
fontSize: 24,
lineHeight: 32,
marginHorizontal: 13,
/* identical to box height, or 133% */

// letterSpacing: "0.01em",

/* GrayScale/Title Active */

color: "#222222",

        },
        imageprofile:{
            width:55, 
            height: 55
        },
        owner: {
            /* Desktop/Link/Medium_Bold */

// fontFamily: Epilogue;
fontStyle: "normal",
fontWeight: "bold",
fontSize: 18,
lineHeight: 28,
/* identical to box height, or 156% */

// letter-spacing: 0.75px;

/* GrayScale/Body */

color: "#333333",

        },
        logo:{
            width: 200,
             height: 50
          },
  
});





// {posts.map(post => {
//     return (
//         <View style={styles.post}>
//         </View>
//     )
// })}



// {like ? <Text>{post.likes}</Text>:
//                   <Text>{post.likes + 1}</Text>}