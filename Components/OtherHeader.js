import React, { Component } from 'react';
import {Header, Body, Title, Left,Right } from 'native-base';
import Icon from 'react-native-ionicons';
export default class OtherHeader extends Component {
  render() {
    return (
      <Header style={{ backgroundColor: 'white', shadowColor: 'black', shadowOpacity: 1, elevation: 4}}
       iosBarStyle="dark-content" androidStatusBarColor="white">
        <Body  style={{ justifyContent: 'center',alignItems:'center'}}>
          <Title style={{ color: '#000', fontSize: 15 }}>{this.props.header}</Title>
        </Body>
      </Header>
    );
  }
}