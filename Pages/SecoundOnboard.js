import React, { Component } from 'react';
import { Text, View, ImageBackground, Dimensions, StatusBar } from 'react-native';
import { Button, Container } from 'native-base';
import strings from '../Localization';
import NavigationService from '../NavigationService';

export default class SecoundOnboard extends Component {
  heigh = Dimensions.get('window').height;
  width = Dimensions.get('window').width;
  render() {
    return (
      <View>
        <StatusBar backgroundColor='#1473e6'>
        </StatusBar>
        <View >
          <ImageBackground source={require('../secoundonborad.jpg')}
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
              flexDirection: 'row' , marginTop: this.heigh * 0.05,
            }}>
              <View style={{
                
              }}>
                <Button style={{
                  marginLeft: this.width * 0.05
                }} transparent light 
                onPress={() => NavigationService.navigate('FirstOnboard', { userName: 'FirstOnboard' })}>
                  <Text style={{ color: '#000' }}>{strings.Prev}</Text>
                </Button>
              </View>
              
              <View 
                style={{
                  marginLeft: this.width * 0.35,
                  marginTop: this.heigh * 0.04,
                  backgroundColor: '#a9a9a9',
                  width: this.width * 0.03,
                  height: this.width * 0.03,
                  borderRadius: this.width * 0.03,
                  
                }}
              />
              <View 
                style={{
                  marginLeft: this.width * 0.01,
                  marginTop: this.heigh * 0.04,
                  backgroundColor: '#fff',
                  width: this.width * 0.03,
                  height: this.width * 0.03,
                  borderRadius: this.width * 0.03,
                  borderWidth: this.width * 0.006,
                  borderColor:'#1473e6'
                  
                }}
              />

              <View style={{
                
              }}>
                <Button style={{
                  marginLeft: this.width * 0.3
                }} transparent light 
                onPress={() => NavigationService.navigate('SignIn', { userName: 'SignIn' })}>
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

