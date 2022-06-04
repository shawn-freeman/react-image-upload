import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import amory_A from './img/amory_A.png';

export default function App() {
  return (
    <View style={localstyles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Image source={amory_A} style={localstyles.myPic} resizeMode="contain" />
      <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='}} style={{ flex: 0.2,width:55, height:55, resizeMode: 'contain' }} />
      <StatusBar style="auto" />
    </View>
  );
}

const localstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myPic: {
    flex: 1,
    maxWidth: Dimensions.get('window').width / 2,
    maxHeight: Dimensions.get('window').width / 2,
    borderRadius: Dimensions.get('window').height / 4,
    margin: 10,
    //backgroundColor: 'red',
    width: 200,
    height: 200,
},
});
