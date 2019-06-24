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

  // constructor(props) {
  //   super(props);
  //   this.state = { text: 'Results displayed here' };
  // }

  constructor(props) {
    super(props);
    this.state = { text: 'sup',
                    shoePrediction: null,
                  shoeConfidence: null};
  }

  runShoePredict(shoe){
      fetch('https://z1wj4hjige.execute-api.us-west-2.amazonaws.com/Prod/invocations', {
      method: 'POST',
      body: JSON.stringify({
        url: 'https://d3volmxa3y6u91.cloudfront.net/'+shoe
      })
      })
      .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson.class);
      //console.log(responseJson.confidence);
      const shoeFile = {
        shoeName: responseJson.class,
        analysisLevel: responseJson.confidence
      }
      this.setState({
        shoePrediction: responseJson.class,
        shoeConfidence: responseJson.confidence
        })
      //  const shoeResults = 'The shoes are: ' + responseJson.class;
      //  const confidenceLevel = 'The confidnce level is: ' + (responseJson.confidence * 100).toFixed(2) + '%';
      //
      // console.log(shoeResults);
      // console.log(confidenceLevel);
      return responseJson
    })
    .catch((error) => {
      console.error(error);
    });
  }

  takePic(){
    ImagePicker.showImagePicker({quality: 0.5} , (response)=>{
      console.log(response);
        const imgData = response.data
        const file = {
          uri: response.uri,
          name: response.fileName ,
          type: 'image/png'
        }

        // console.log(file);
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
        fetch('https://o1embtlbrb.execute-api.us-west-2.amazonaws.com/Dev/upload-sneaker',{
        method: 'POST',
        body: JSON.stringify({
          sneaker: String(imgData)
          })})
          .then((response) => response.json())
          .then(data => {
            this.runShoePredict(data.key);
            })
        // this.runShoePredict();
        console.log('prediction analysis was ran');
      })




  }

  render() {
    // fetch('https://z1wj4hjige.execute-api.us-west-2.amazonaws.com/Prod/invocations', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     url: 'https://d3volmxa3y6u91.cloudfront.net/test_images/allbirds_test1.jpg'
    //   })
    //   })
    //   .then((response) => response.json())
    // .then((responseJson) => {
    //   //console.log(responseJson.class);
    //   //console.log(responseJson.confidence);
    //   const shoeResults = 'The shoes are: ' + responseJson.class;
    //   const confidenceLevel = 'The confidnce level is: ' + (responseJson.confidence * 100).toFixed(2) + '%';
    //
    //   console.log(shoeResults);
    //   console.log(confidenceLevel);
    //   return responseJson
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

    return (


      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to SneakerWiz!</Text>
        <TouchableOpacity onPress={this.takePic.bind(this)} >
          <Text>Take Picture</Text>
        </TouchableOpacity>
        <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
          <Text>Your shoe is {this.state.shoePrediction} with a confidence of
            {this.state.shoeConfidence}
          </Text>

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
