import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';

// You can import from local files
// import AssetExample from './screens/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { StatusBar, } from 'react-native';

import Router from './navigation/Router';
// import Amplify from 'aws-amplify'
// import { withAuthenticator } from 'aws-amplify-react-native'
// Amplify.configure(config)

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.paragraph}>
    //     ChangzXLKCLfkjze code in the editor and watch it change on your phone! Save to get a shareable url.
    //   </Text>
    //   <Card>
    //     <AssetExample />
    //   </Card>
    // </View>
    // <View style={styles.container}>
    //   <GuestScreen />
    // </View>

    <>
      <StatusBar barStyle="dark-content" />
      <Router />
    </>
  );
}
// <Card>
//         <AssetExample />
//       </Card>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
