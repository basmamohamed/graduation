import React, { Component } from 'react';
import { Image, ImageBackground, Dimensions, TouchableOpacity, TextInput, View, AsyncStorage } from 'react-native';
import { Text, Item, Button } from 'native-base';
import OtherHeader from '../Components/OtherHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../NavigationService';
import Toast from 'react-native-easy-toast';
import strings from '../Localization'

export default class SignIn extends Component {
    height = Dimensions.get('window').height;
    width = Dimensions.get('window').width;
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#f8f8f8',
            backgroundColorPassword: '#f8f8f8',
            secureTextEntry: true,
            c_active: 1,
            t_active: 0,
            key: '+2',
            phone: '',
            password: '',
            type: 2,
            data: '',
            Resp: 0,
            memberId:''
        };
    }
    
    changeClientButton = () => {
        this.setState({ c_active: 1, t_active: 0, type: 2 });
    };
    changeTransorterButton = () => {
        this.setState({ t_active: 1, c_active: 0, type: 1 });
    };
    showPassword = () => {
        if (secureTextEntry = true) {
            this.setState({ secureTextEntry: !this.state.secureTextEntry })
        }
    };

    updateValue(text, field) {
        if (field == 'phone') {
            this.setState({
                phone: text,
                backgroundColor: '#f8f8f8'
            })
        } else if (field == 'password') {
            this.setState({
                password: text,
                backgroundColorPassword: '#f8f8f8'
            })
        }
    }
    ///////////////////////Form Submtion////////////////////////
    submit() {
        let userId = this.state.memberId
        AsyncStorage.setItem( userId , userId);
            let formData = {}
            formData.type = this.state.type,
            formData.phone = this.state.phone,
            formData.password = this.state.password
            // console.warn(formData);
        if (formData.phone == "" && formData.password == "" || formData.phone.length < 11) {
            this.refs.toast.show(strings.WriteYourPhoneAndPassword, DURATION.LENGTH_LONG);
            this.setState({backgroundColorPassword:"#FFA5A5",backgroundColor:"#FFA5A5"})
        } else {
            var url = 'http://ecres248.servconfig.com/~easyoneclick/api/index.php/User/login';
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
                        memberId : JSON.stringify(response.data),
                        Resp: response.message
                    });
                    if (this.state.Resp == 0) {
                        this.refs.toast.show(strings.insertCorrectPhoneAndPassword, DURATION.LENGTH_LONG);
                    } else if (this.state.Resp == 1) {
                        NavigationService.navigate('DrawerNavigator',{type:this.state.type})
                    }
                })
                .catch(error => {
                    //  console.warn('error');
                });
        }
    }
    /////////////////////////////////////////////////////////////////////

    render() {
        return (
            <ImageBackground resizeMode='stretch' source={require('../bg.png')} style={{ width: '100%', height: '100%' }}>
                <OtherHeader header={strings.signIn} />
                {/* //////////////////////////// */}
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#1473e6' }}
                    position='bottom'
                    positionValue={75}
                    fadeInDuration={800}
                    fadeOutDuration={7000}
                    opacity={0.8}
                    textStyle={{ color: '#fff', fontWeight: 'bold', fontSize: this.width * 0.045 }}
                />
                {/* ///////////////////////////// */}
                <Text>{this.state.data}</Text>
                <Image source={require('../images/slogo.png')}
                    style={{
                        height: '20%', width: '30%', marginBottom: this.height * 0.02,
                        marginTop: this.height * 0.002, alignSelf: 'center'
                    }} />
                <View style={{ alignItems: 'center' }}>
                    <Item rounded style={{ width: '85%', height: this.height * 0.08, flexDirection: 'row' }}>
                        <Button rounded style={{
                            margin: this.width * 0.02, justifyContent: 'center',
                            width: this.width * 0.37, borderRadius: 30, height: this.height * 0.05,
                            backgroundColor: this.state.c_active == 1 ? '#1473e6' : '#fff'
                        }}
                            onPress={this.changeClientButton}
                        >
                            <Text style={{
                                color: this.state.c_active == 1 ? '#fff' : '#000'
                                , fontWeight: 'bold', fontSize: this.width * 0.035
                            }}>{strings.client}</Text>
                        </Button>
                        <Button rounded style={{
                            width: this.width * 0.37, borderRadius: 30, margin: this.width * 0.02,
                            height: this.height * 0.05, justifyContent: 'center',
                            backgroundColor: this.state.t_active == 1 ? '#1473e6' : '#fff'
                        }}
                            onPress={this.changeTransorterButton}>
                            <Text style={{
                                color: this.state.t_active == 1 ? '#fff' : '#000', alignSelf: 'center', fontWeight: 'bold',
                                fontSize: this.width * 0.035
                            }}>{strings.transporter}</Text>
                        </Button>
                    </Item>
                    <Item rounded style={{
                        justifyContent: 'space-around', width: '80%', backgroundColor: this.state.backgroundColor,
                        marginTop: this.height * 0.02
                    }}>
                        <Icon name='mobile' style={{ marginLeft: this.width * 0.04 }}
                            size={Dimensions.get('window').width * 0.07} />
                        <TextInput maxLength={11} keyboardType='numeric' multiline={false} placeholder={strings.yourNumber}
                            style={{ textAlign: 'center', marginRight: this.width * 0.09 }}
                            onChangeText={(text) => this.updateValue(text = this.state.key + text, 'phone')} />
                    </Item>
                    <Item rounded style={{
                        justifyContent: 'space-around', width: '80%',
                        backgroundColor: this.state.backgroundColorPassword, marginTop: 10
                    }}>
                        <Icon name='lock' size={Dimensions.get('window').width * 0.06}
                            style={{ marginLeft: Dimensions.get('window').width * 0.08 }} />
                        <TextInput multiline={false} secureTextEntry={this.state.secureTextEntry}
                         placeholder={strings.yourPassword}
                            style={{
                                textAlign: 'center', marginLeft: Dimensions.get('window').width * 0.08,
                                marginRight: Dimensions.get('window').width * 0.13
                            }}
                            onChangeText={(text) => this.updateValue(text, 'password')} />
                        <Icon name='eye' size={Dimensions.get('window').width * 0.05}
                            style={{ marginRight: Dimensions.get('window').width * 0.08 }}
                            onPress={() => this.showPassword()} />
                    </Item>
                </View>

                <TouchableOpacity onPress={() => NavigationService.navigate('EnterPhone')} >
                    <Text style={{
                        color: '#1473e7', marginTop: this.height * 0.01, alignSelf: 'center', color: 'gray',
                        fontSize: this.width * 0.035
                    }}>{strings.forgetPassword}</Text>
                </TouchableOpacity>

                <Button rounded style={{
                    alignSelf: 'center',height:this.height * 0.07, marginBottom: this.width * 0.03, marginTop: this.width * 0.05, backgroundColor: '#1473e7',
                    alignItems: 'center', justifyContent: 'center', width: '80%'
                }} onPress={() => this.submit()} >
                    <Text style={{ color: 'white' }}>{strings.signIn}</Text>
                </Button>
                <View style={{ alignItems: 'center', flexDirection: 'row', alignSelf: 'center' }}>
                    <Text style={{ color: 'gray', fontSize: this.width * 0.035 }}>{strings.noAccount}</Text>
                    <TouchableOpacity onPress={() => NavigationService.navigate('SignUp')} >
                        <Text style={{ color: '#1473e7', fontSize: this.width * 0.035 }}>{strings.createAccount}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        )
    }
}
