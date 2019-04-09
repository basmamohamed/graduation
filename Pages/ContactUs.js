import React, { Component } from 'react';
import { Container, Item, Button,Left, Body, Right, Title } from 'native-base';
import { View, StatusBar, Dimensions, Text, TextInput, ScrollView ,ImageBackground,Image} from 'react-native'
import Icon from 'react-native-ionicons';
import Toast from 'react-native-easy-toast';
import strings from '../Localization'

export default class ContactUs extends Component {
    height = Dimensions.get('window').height;
    width = Dimensions.get('window').width;
    constructor(props){
        super(props);
    this.state = {
        message: '',
        backgroundColor: '#f8f8f8',
        backgroundColorPassword: '#f8f8f8',
        Resp: 0,
    };
}
updateValue(text, field) {
   
    if (field == 'message') {
        this.setState({
            message: text,
            backgroundColorPassword: '#f8f8f8'
        })
    }
}
submit() {
    let formData = {}
    formData.member_id = 18,
    formData.message = this.state.message
    var url = 'http://ecres248.servconfig.com/~easyoneclick/api/index.php/Contact/contact';
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(formData), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            // console.warn(response);
            
            this.setState({
                Resp: response.data
            });
        })
        .catch(error => {
            // console.warn('error')
        });
        if (this.state.Resp === 1) {
                this.refs.toast.show(strings.dataSaved, DURATION.LENGTH_LONG);
            } else{
                this.refs.toast.show(strings.pleaseTryAgain, DURATION.LENGTH_LONG);
            }
}
    render() {
        return (
            <Container backgroundColor='white'>
                <ImageBackground source={require('../headerBackground.png')} 
            style={{height:Dimensions.get('window').width * 0.2, width:'100%', flexDirection:'row'}}>
            <StatusBar backgroundColor='#1473e6' ></StatusBar>
                    <Left style={{ flex: 1 }}>
                    <Icon onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={require('../android/drawable-hdpi/menu.png')}/>
                        </Icon>
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>{strings.contactUs}</Title>
                    </Body>
                    <Right style={{flex:1}}/>
            </ImageBackground>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#1473e6' }}
                    position='top'
                    positionValue={75}
                    fadeInDuration={800}
                    fadeOutDuration={7000}
                    opacity={0.8}
                    textStyle={{ color: '#fff', fontWeight: 'bold', fontSize: this.width * 0.045 }}
                />
                <ScrollView style={{ width: '100%', height: '100%' }}>
                    <View style={{ marginLeft: Dimensions.get('window').width * 0.15 }}>
                        <View style={{ flexDirection: 'column', marginTop: 10 }}>
                            <Text style={{ color: 'blue', marginBottom: 8 }}>{strings.email}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{
                                    backgroundColor: '#1473e6', width: Dimensions.get('window').width * 0.09,
                                    height: Dimensions.get('window').width * 0.09, alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Icon name='md-mail' size={Dimensions.get('window').width * 0.05} color='white' />
                                </View>
                                <Text style={{ color: 'gray', marginLeft: Dimensions.get('window').width * 0.04 }}>basmamohamed525@gmail.com</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginTop: 10 }}>
                            <Text style={{ color: 'blue', marginBottom: 8 }}>{strings.phone}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{
                                    backgroundColor: '#1473e6', width: Dimensions.get('window').width * 0.09,
                                    height: Dimensions.get('window').width * 0.09, alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Icon name='md-phone-portrait' size={Dimensions.get('window').width * 0.08} style={{ backgroundColor: '#1473e6' }} color='white' />
                                </View>
                                <Text style={{ color: 'gray', marginRight: 40, marginLeft: Dimensions.get('window').width * 0.04 }}>01122556920</Text>
                                <Text style={{ color: 'gray' }}>01000966437</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginTop: 10 }}>
                            <Text style={{ color: 'blue', marginBottom: 8 }}>{strings.WebSite}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{
                                    backgroundColor: '#1473e6', width: Dimensions.get('window').width * 0.09,
                                    height: Dimensions.get('window').width * 0.09, alignItems: 'center', justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Icon name='ios-globe' size={Dimensions.get('window').width * 0.08} style={{ backgroundColor: '#1473e6' }} color='white' />
                                </View>
                                <Text style={{ color: 'gray', marginLeft: Dimensions.get('window').width * 0.04 }}>www.basma.com</Text>

                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: Dimensions.get('window').width * 0.04 }}>
                        <Icon name='logo-facebook' style={{ marginLeft: Dimensions.get('window').width * 0.08, color: '#1473e6' }}
                            size={Dimensions.get('window').width * 0.1} />
                        <Icon name='logo-youtube' style={{ marginLeft: Dimensions.get('window').width * 0.08, color: 'red' }}
                            size={Dimensions.get('window').width * 0.1} />
                        <Icon name='logo-twitter' style={{ marginLeft: Dimensions.get('window').width * 0.08, color: '#1DA1F2' }}
                            size={Dimensions.get('window').width * 0.1} />
                    </View>
                    
                    <Text style={{
                        color: '#000', marginLeft: Dimensions.get('window').width * 0.15,
                        marginBottom: 10, marginTop: 10
                    }}>
                        {strings.message}
                </Text>
                    <View style={{ alignItems: 'center' }}>

                        <Item rounded style={{ width: '80%', backgroundColor: 'white' }}>
                            <Icon name='md-mail' style={{
                                marginLeft: Dimensions.get('window').width * 0.05,
                                marginRight: Dimensions.get('window').width * 0.05
                            }}
                                size={Dimensions.get('window').width * 0.05} />
                            <TextInput
                                style={{ width: '70%' }}
                                underlineColorAndroid="transparent"
                                placeholder={strings.writeMessage}
                                placeholderTextColor={"#9E9E9E"}
                                numberOfLines={4}
                                multiline={true}
                                onChangeText={(text) => this.updateValue(text, 'message')}
                            />
                        </Item>
                    </View>
                    <Button rounded  onPress={() => this.submit()}  style={{
                        alignSelf: 'center', marginTop: 10, backgroundColor: '#1473e7',
                        alignItems: 'center', justifyContent: 'center', width: '80%'
                    }}>
                        <Text style={{ color: 'white' }}>{strings.send}</Text>
                    </Button>
                </ScrollView>
            </Container>
        )
    }
}