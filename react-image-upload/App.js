import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import RNFS from 'react-native-fs';
import imgA from './img/A.png';
import { HttpHandler } from './httpHandler';

export default class App extends React.Component {
  state = {
    displayImage: imgA,
  };

  handleChoosePhoto = async () => {
    let imageResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(imageResult.uri);
      
      //Base64 datasource format
      //data:image/png;base64
      //let base64Image = await RNFS.readFile(result.uri, 'base64');
      //let uri = `data:image/${extension};base64,${base64Image}`;

      let splitDataSource = imageResult.uri.split(';');console.log(splitDataSource);
      let type = splitDataSource[0].split(':').pop();
      let base64 = splitDataSource[splitDataSource.length-1].split(',').pop();
      
      if (!imageResult.cancelled) {
        this.setState({ displayImage: { uri: imageResult.uri }  });
      }

      let data = {
        name: 'uploadFileName',
        type: type,
        base64Image: base64
      }
      console.log(data);
      await new HttpHandler().PostRequest('WeatherForecast', data);
};

  render(){
    return (
      <View style={localStyles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Image source={this.state.displayImage} style={localStyles.myPic} resizeMode="contain" />
        <TouchableOpacity
            style = {localStyles.photoButton}
            onPress={this.handleChoosePhoto} >
            <Text style = {localStyles.photoButtonText}>Choose Photo</Text>
        </TouchableOpacity>
        <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='}} style={{ flex: 0.2,width:55, height:55, resizeMode: 'contain' }} />
      </View>
    );
  }
  
}

const localStyles = StyleSheet.create({
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
photoButton: {
  backgroundColor: '#ccccff',
  borderColor: '#5453A6',
  borderWidth: 2,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  width: (Dimensions.get('window').width / 10) * 9,
  borderRadius: 10,
},
photoButtonText:{
 color: '#5453A6',
},
});
