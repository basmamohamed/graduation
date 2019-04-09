import React, { Component } from 'react';
import { Item, Button, Header, Body, Title } from 'native-base';
import { Image, Text, TextInput, ImageBackground, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-easy-toast';
import NavigationService from '../NavigationService';
import strings from '../Localization'

export default class NewPassword extends Component {
    height = Dimensions.get('window').height;
    width = Dimensions.get('window').width;
    constructor(props) {
        super(props)
        this.state = {
            Password: '',
            ConfirmPassword: '',
            secureTextEntryone: true,
            secureTextEntrytwo: true,
            backgroundColorPassword: '#f8f8f8',
            backgroundColorConfirm: '#f8f8f8',
            Resp: 0
        }
    }
    showPassword = () => {
        this.setState({
            secureTextEntryone: !this.state.secureTextEntryone
        })
    };
    showConfirm = () => {
        if (secureTextEntrytwo = true) {
            this.setState({ secureTextEntrytwo: !this.state.secureTextEntrytwo })
        }
    };
    submit() {
        const sms_activation = this.props.navigation.getParam('sms_activation');
        const formData = {}
        formData.password = this.state.Password,
            formData.sms_activation = sms_activation
        if (formData.password == "" || this.state.ConfirmPassword == '' || formData.sms_activation == '') {
            this.refs.toast.show(strings.CompleteTheForm, DURATION.LENGTH_LONG);
            if (formData.password == "") { this.setState({ backgroundColorPassword: "#FFA5A5" }) }
            if (this.state.ConfirmPassword == "") { this.setState({ backgroundColorConfirm: "#FFA5A5" }) }
        }
        if (formData.password != this.state.ConfirmPassword) {
            this.refs.toast.show(strings.PasswordNotMatched, DURATION.LENGTH_LONG);
            this.setState({ backgroundColorPassword: "#FFA5A5", backgroundColorConfirm: "#FFA5A5" })
        }
        else {
            fetch('http://ecres248.servconfig.com/~easyoneclick/api/index.php/User/updatePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(response => {
                    this.setState({
                        Resp: response.message
                    });
                    if (this.state.Resp == 0) {
                        this.refs.toast.show(strings.insertCorrectPhoneAndPassword, DURATION.LENGTH_LONG);
                    } else if (this.state.Resp == 1) {
                        NavigationService.navigate('SignIn')
                    }
                }
                )
                .catch();
        };
    }
    
    render() {
        return (
            <ImageBackground resizeMode='stretch' source={require('../bg.png')} style={{ width: '100%', height: '100%' }}>

                <Header style={{ backgroundColor: 'white', shadowColor: 'black', shadowOpacity: 1, elevation: 4 }}
                    iosBarStyle="dark-content" androidStatusBarColor="white">
                    {/* <Left style={{ flex: 1 }}><Icon name="chevron-circle-left" color="#1473e6" size={this.width * 0.07} onPress={() => NavigationService.navigate('SignIn')} > </Icon></Left> */}
                    <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Title style={{ color: '#000', fontSize: 15 }}>{strings.newPassword}</Title>
                    </Body>
                    {/* <Right style={{ flex: 1 }} /> */}
                </Header>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#1473e6' }}
                    position='bottom'
                    positionValue={75}
                    fadeInDuration={800}
                    fadeOutDuration={7000}
                    opacity={0.8}
                    textStyle={{ color: '#fff', fontWeight: 'bold', fontSize: this.width * 0.045 }} />

                {/* <ScrollView style={{ width: '100%', height: '100%' }}> */}
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../images/slogo.png')}
                        style={{
                            height: '35%', width: '35%', marginBottom: this.height * 0.02,
                            marginTop: this.height * 0.002, alignSelf: 'center'
                        }} />

                    <Item rounded style={{
                        height: this.height * 0.08, justifyContent: 'space-around', width: '80%',
                        backgroundColor: this.state.backgroundColorPassword, marginTop: 5
                    }}>
                        <Icon name='lock' size={this.width * 0.06}
                            style={{ marginLeft: this.width * 0.08 }} />
                        <TextInput placeholder={strings.yourPassword} secureTextEntry={this.state.secureTextEntryone}
                            onChangeText={(Password) => this.setState({ Password, backgroundColorPassword: '#f8f8f8' })}
                            style={{
                                textAlign: 'center', marginLeft: this.width * 0.08,
                                marginRight: this.width * 0.13
                            }} />
                        <Icon name='eye' size={this.width * 0.05}
                            style={{ marginRight: this.width * 0.08 }}
                            onPress={() => this.showPassword()} />
                    </Item>
                    <Item rounded style={{
                        height: this.height * 0.08, justifyContent: 'space-around',
                        width: '80%', backgroundColor: this.state.backgroundColorConfirm, marginTop: 5
                    }}>
                        <Icon name='lock' size={this.width * 0.06}
                            style={{ marginLeft: this.width * 0.08 }} />
                        <TextInput placeholder={strings.confirmPassword} secureTextEntry={this.state.secureTextEntrytwo}
                            style={{
                                textAlign: 'center', marginLeft: this.width * 0.08,
                                marginRight: this.width * 0.13
                            }}
                            onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword, backgroundColorConfirm: '#f8f8f8' })} />
                        <Icon name='eye' size={this.width * 0.05}
                            style={{ marginRight: this.width * 0.08 }}
                            onPress={() => this.showConfirm()} />
                    </Item>

                    <Button rounded onPress={() => this.submit()} style={{
                        alignSelf: 'center', marginTop: 10, backgroundColor: '#1473e7',
                        alignItems: 'center', height: this.height * 0.06, justifyContent: 'center', width: '80%'
                    }}>
                        <Text style={{ color: 'white' }}>{strings.send}</Text>
                    </Button>
                </View>



                {/* </ScrollView> */}
            </ImageBackground>
        );
    }

}