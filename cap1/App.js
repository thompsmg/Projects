/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground, TextInput} from 'react-native';
import ImagePicker from 'react-native-image-picker';




type Props = {};
const bgImage = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg';

export default class App extends Component<Props> {

  // constructor(props) {
  //   super(props);
  //   this.state = { text: 'Results displayed here' };
  // }

  constructor(props) {
    super(props);
    this.state = { text: 'sup',
                    shoePrediction: null,
                  shoeConfidence: null,
                isLoading: false,
              showText: false};
  }

  clearText(){
    this.state = {
      shoePrediction:null,
      shoeConfidence:null
    }
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
      // const shoeFile = {
      //   shoeName: responseJson.class,
      //   analysisLevel: responseJson.confidence
      // }
      this.setState({
        isLoading: false,
        shoePrediction: ('your shoe is the ' + (responseJson.class)),
        shoeConfidence: (' we are ' + (responseJson.confidence * 100).toFixed(2) + '% confident')
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

      let pic = {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      };


  }

  render() {
    const resizeMode = 'repeat';

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



//       <Image source={uri:''} style={{width: '100%', height: '100%'}}>
// </Image>
// <ImageBackground source={pic} style={{width: '100%', height: '100%'}}>
//  </ImageBackground>



      <View style={styles.container}>
      <Image
        style={{
          position: 'absolute',
          flex: 1,
          resizeMode,
        }}
        source={require('./assets/sneakerBG2.png')}
      />
            <Text style={styles.welcome}>Welcome to SneakerWiz!</Text>
        <TouchableOpacity onPress={this.takePic.bind(this)} >
          <Text style={styles.makeCenter}>Take Picture</Text>
          <Text style={styles.makeCenter} >{this.state.shoePrediction} {this.state.shoeConfidence}
          </Text>
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
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'yellow',
    fontWeight: 'bold',
    textShadowColor: 'black',
    margin: 10,
    textDecorationStyle: 'double'

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  makeCenter: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  }
});
