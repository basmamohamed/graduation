import React , {Component} from 'react';
import {Image , ImageBackground , View , Dimensions ,StatusBar,AsyncStorage} from 'react-native';
import NavigationService from '../NavigationService'
export default class Splash extends Component{
    componentDidMount () {
        setTimeout(() => {this.LoadInitialState()
        }, 3000)
      }
      
      LoadInitialState = async () => {
        var value = await AsyncStorage.getItem('user');
        if(value == null){
          NavigationService.navigate('FirstOnboard', { userName: 'FirstOnboard' })
        }
        else{
          NavigationService.navigate('SignIn', { userName: 'SignIn' })
        }
        
      }
    render(){
        height = Dimensions.get('window').height;
        width = Dimensions.get('window').width;
        return(
            <View>
                <StatusBar backgroundColor="#1473e6"/>
                <ImageBackground resizeMode='stretch' source={require('../splash.png')} 
                style={{ width:'100%' , height: '100%'
                ,alignItems:'center',justifyContent:'center' }}>
                 <Image source={require('../images/slogo.png')} style={{  width:'30%' ,height:'30%'  }}></Image> 
                </ImageBackground>
                {this.componentDidMount()}
            </View>
        )
    }
}