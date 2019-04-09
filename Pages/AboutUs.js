import React, { Component } from 'react'
import { View, Text, Image, ImageBackground, Dimensions, StatusBar } from 'react-native';
import { Left, Body, Right, Title, Icon } from 'native-base';
import strings from '../Localization'

export default class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about: [],
            load: 0
        }
    }
    componentDidMount() {
        fetch('http://172.16.4.183/wasly_m3ak/api/index.php/Contact/about_us_data?language=en')
            .then(res => res.json())
            .then(response => {
                this.setState({
                    about: response,
                    load: 1
                });
            })
            .catch(error => {
            })
    }

    aboutUs() {
        if (this.state.load === 1) {
            return (this.state.about.data.map((aboutus,key) => {
                return (
                    <Text key={key} style={{
                        fontSize: Dimensions.get('window').width * 0.05, textAlign: 'center',
                        marginRight: Dimensions.get('window').width * 0.08, marginLeft: Dimensions.get('window').width * 0.08 ,color:"#545454"
                    }}>
                        {aboutus.value}
                    </Text>
                )
            }
            )
            )
        }
    }
    render() {
        return (
            <ImageBackground resizeMode='stretch' source={require('../bg.png')} style={{ width: '100%', height: '100%' }}>
                <ImageBackground source={require('../headerBackground.png')} 
            style={{height:Dimensions.get('window').width * 0.2, width:'100%', flexDirection:'row'}}>
            <StatusBar backgroundColor='#1473e6' ></StatusBar>
                    <Left style={{ flex: 1 }}>
                    <Icon onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={require('../android/drawable-hdpi/menu.png')}/>
                        </Icon>
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>{strings.AboutUs}</Title>
                    </Body>
                    <Right style={{flex:1}}/>
            </ImageBackground>
                <StatusBar backgroundColor='#1473e6'></StatusBar>
                <View style={{ marginTop: Dimensions.get('window').height * 0.02, alignItems: 'center' }}>
                    <Image source={require('../images/slogo.png')}
                        style={{ width: '30%', height: '20%', marginBottom: Dimensions.get('window').height * 0.01 }} />
                    <Text style={{
                        fontSize: Dimensions.get('window').width * 0.07, color: '#000',
                        marginBottom: Dimensions.get('window').height * 0.02 , color:"#212121"
                    }}>
                        247 Shipping   
                    </Text >
                    {this.aboutUs()}
                </View>

            </ImageBackground>
        )
    }
}