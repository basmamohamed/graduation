import React, { Component } from 'react';
import { Text, View, ImageBackground, Dimensions, StatusBar , AsyncStorage} from 'react-native';
import { Button, Container } from 'native-base';
import strings from '../Localization';
import NavigationService from '../NavigationService';

export default class FirstOnboard extends Component {
  
  saveData(){
    let user = '1'
    AsyncStorage.setItem('user' , user);
    NavigationService.navigate('SecondOnboard', { userName: 'SecondOnboard' })
  }
  heigh = Dimensions.get('window').height;
  width = Dimensions.get('window').width;
  render() {
    return (
      // style={{ flexDirection: 'column' }}
      <View>
        <StatusBar backgroundColor='#1473e6'>
        </StatusBar>
        <View >
          <ImageBackground source={require('../firstonboarding.jpg')}
            style={{
              height: this.heigh,
              width: this.width
            }}>


            <View style={{ justifyContent: 'center', justifyContent: "flex-start" }}>
              <View style={{
                flexDirection: 'column', alignContent: 'center',
                marginTop: this.heigh * 0.6,
                justifyContent: 'center', alignItems: 'center'
              }}>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: this.width * 0.06, color: '#000' }}>Deliver My Goods</Text>
                  <Text style={{ fontSize: this.width * 0.05, margin: this.width * 0.05, textAlign: 'center' }}
                    note> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, dolore.</Text>
                </View>
              </View>
            </View>


            <View style={{
              flexDirection: 'row' ,marginTop: this.heigh * 0.05,
            }}>
              <View 
                style={{
                  marginLeft: this.width * 0.45,
                  marginTop: this.heigh * 0.03,
                  backgroundColor: '#fff',
                  width: this.width * 0.03,
                  height: this.width * 0.03,
                  borderRadius: this.width * 0.03,
                  borderWidth: this.width * 0.006,
                  borderColor:'#1473e6'
                }}
              />
              <View 
                style={{
                  marginLeft: this.width * 0.01,
                  marginTop: this.heigh * 0.03,
                  backgroundColor: '#a9a9a9',
                  width: this.width * 0.03,
                  height: this.width * 0.03,
                  borderRadius: this.width * 0.03,
                   
                }}
              />

              <View style={{
              }}>
                <Button style={{
                  marginLeft: this.width * 0.35
                }} transparent light  
                onPress={this.saveData}>
                  <Text style={{ color: '#000' }}>{strings.Next}</Text>
                </Button>

              </View>
            </View>


          </ImageBackground>
        </View>




      </View>
    );
  }
}

