/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';




type Props = {};

export default class App extends Component<Props> {



  takePic(){
    ImagePicker.showImagePicker({} , (response)=>{
        console.log(response);
        const file = {
          uri: response.uri,
          name: response.fileName ,
          type: 'image/png'
        }

        console.log(file);
        // const config = {
        //   keyPrefix: ,//s3 root name, '/s3',
        //   bucket: ,//bucket name, 'matthawscapstone'
        //   region: 'us-east-1',
        //   accessKey: ,
        //   secretKey: ,
        //   successActionStatus: 201
        //
        //
        // }

      })
  }

  render() {  
    fetch('https://z1wj4hjige.execute-api.us-west-2.amazonaws.com/Prod/invocations', {
      method: 'POST',
      body: JSON.stringify({
        url: 'https://d3volmxa3y6u91.cloudfront.net/test_images/allbirds_test1.jpg'
      })
      })
      .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.class);
      console.log(responseJson.confidence)
      return responseJson
    })
    .catch((error) => {
      console.error(error);
    });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to SneakerWiz!</Text>
        <TouchableOpacity onPress={this.takePic.bind(this)}>
          <Text>Take Picture</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
