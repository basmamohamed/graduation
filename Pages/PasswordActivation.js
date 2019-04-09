import React, { Component } from 'react';
import { View, Button, Item } from 'native-base';
import { Text, TextInput, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import WhiteHeader from '../Components/WhiteHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../NavigationService';
import Toast from 'react-native-easy-toast';
import strings from '../Localization'

export default class PasswordActivation extends Component {
    height = Dimensions.get('window').height;
    width = Dimensions.get('window').width;
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor:'#f8f8f8',
            sms_activation: '',
            Resp: 0
        };
    }
    updateValue(text, field) {
        if (field == 'sms_activation') {
            this.setState({
                sms_activation: text,
                backgroundColor: "#fff"
            })
        }
    }
    ///////////////////////Form Submtion////////////////////////
    submit() {
        let formData = {}
        formData.sms_activation = this.state.sms_activation
        // console.warn(formData);
        if (formData.sms_activation == "") {
            this.refs.toast.show(strings.WriteActivationCode, DURATION.LENGTH_LONG);
            this.setState({ backgroundColor: "#FFA5A5" })
        } else {
            var url = 'http://ecres248.servconfig.com/~easyoneclick/api/index.php/User/active_account';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    this.setState({
                        Resp: response.message
                    });
                    if (this.state.Resp == 0) {
                        this.refs.toast.show(strings.insertVALIDactivationcode, DURATION.LENGTH_LONG);
                    } else if (this.state.Resp == 1) {
                        NavigationService.navigate('NewPassword', { sms_activation: this.state.sms_activation })
                    }
                })
                .catch();
        }
    }
    ////////////////////////////////////////////////////////////
    render() {
        return (
            <ImageBackground resizeMode='stretch' source={require('../bg.png')} style={{ width: '100%', height: '100%' }}>
                <WhiteHeader header={strings.activation} />
                {/* /////////////////////////////////////////////////// */}
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
                {/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
                <View style={{ alignItems: 'center', marginTop: Dimensions.get('window').height * 0.01 }}>
                    <Image source={require('../images/slogo.png')}
                        style={{
                            width: '40%', height: '30%', marginBottom: Dimensions.get('window').height * 0.04,
                            marginTop: Dimensions.get('window').height * 0.01
                        }} />
                    <Text style={{
                        fontSize: Dimensions.get('window').width * 0.06, color: '#000',
                        marginBottom: Dimensions.get('window').height * 0.02
                    }}>{strings.activationCode} </Text>

                    <Text style={{
                        fontSize: Dimensions.get('window').width * 0.04,
                        marginBottom: Dimensions.get('window').height * 0.04
                    }}>
                        {strings.enterCode}
                        </Text>
                    <Item rounded style={{ backgroundColor:this.state.backgroundColor,width: '80%', marginBottom: Dimensions.get('window').height * 0.04 }}>
                        <Icon name='lock' size={Dimensions.get('window').width * 0.06}
                            style={{ marginLeft: Dimensions.get('window').width * 0.08 }} />
                        <TextInput keyboardType='numeric' multiline={false} placeholder='- - - - -'
                            style={{
                                textAlign: 'center', marginLeft: Dimensions.get('window').width * 0.2,
                                marginRight: Dimensions.get('window').width * 0.08, fontSize: Dimensions.get('window').width * 0.06
                            }}
                            onChangeText={(text) => this.updateValue(text, 'sms_activation')} />

                    </Item>
                    <Text style={{ fontSize: Dimensions.get('window').width * 0.04 }}>
                        {strings.ActivationCodeDuration}
                    </Text>
                    <TouchableOpacity onPress={() => this.RessendActivationCode()}>
                        <Text style={{ fontSize: Dimensions.get('window').width * 0.04, marginTop: Dimensions.get('window').width * 0.01, color: '#1473e7' }}>
                            {strings.resendActivationCode}
                    </Text>
                    </TouchableOpacity>
                    <Button rounded style={{
                        alignSelf: 'center', marginTop: 5, backgroundColor: '#1473e7',
                        alignItems: 'center', justifyContent: 'center', width: '80%',
                        marginTop: Dimensions.get('window').width * 0.05
                    }} onPress={() => this.submit()}>
                        <Text style={{ color: 'white' }}>{strings.confermation}</Text>
                    </Button>
                </View>
            </ImageBackground>
        );
    }
}