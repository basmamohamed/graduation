import React, { Component } from 'react';
import { View, Button, Item } from 'native-base';
import { Text, TextInput, Image, Dimensions, ImageBackground } from 'react-native'
import WhiteHeader from '../Components/WhiteHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../NavigationService';
import Toast, { DURATION } from 'react-native-easy-toast';
import strings from '../Localization'

export default class EnterPhone extends Component {
    height = Dimensions.get('window').height;
    width = Dimensions.get('window').width;
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#f8f8f8',
            key: '+2',
            phone: '',
        };
    }
    updateValue(text, field) {
        if (field == 'phone') {
            this.setState({
                phone: text,
                backgroundColor: '#f8f8f8'
            })
        }
    }
    ///////////////////////Form Submtion////////////////////////
    submit() {
        let formData = {}
        formData.phone = this.state.phone
        // console.warn(formData);
        if (formData.phone == "") {
            this.refs.toast.show(strings.WriteYourPhone, DURATION.LENGTH_LONG);
            this.setState({ backgroundColor: "#FFA5A5" })
        } else {
            var url = 'http://ecres248.servconfig.com/~easyoneclick/api/index.php/User/forgetPassword';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(NavigationService.navigate('PasswordActivation', { phone: this.state.phone })
                )
                .catch(error => console.warn('Error:', error));
        }
    }

    render() {
        return (
            <ImageBackground resizeMode='stretch' source={require('../bg.png')} style={{ width: '100%', height: '100%' }}>
                <WhiteHeader header={strings.forgetPass} />
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
                <View style={{ alignItems: 'center', marginTop: Dimensions.get('window').height * 0.05 }}>
                    <Image source={require('../images/slogo.png')}
                        style={{
                            width: '20%', height: '20%', marginBottom: Dimensions.get('window').height * 0.08,
                            marginTop: Dimensions.get('window').height * 0.03
                        }} />
                    <Text style={{
                        fontSize: Dimensions.get('window').width * 0.06, color: '#000',
                        marginBottom: Dimensions.get('window').height * 0.02
                    }}>{strings.yourNumber}</Text>

                    <Item rounded style={{ backgroundColor:this.state.backgroundColor,width: '80%', marginBottom: Dimensions.get('window').height * 0.04 }}>
                        <Icon name='mobile' size={Dimensions.get('window').width * 0.06}
                            style={{ marginLeft: Dimensions.get('window').width * 0.07 }} />
                        <TextInput  maxLength={11} keyboardType='numeric' multiline={false} placeholder='- - - - - - - - - - -'
                            style={{
                                textAlign: 'center', justifyContent: 'center', marginLeft: Dimensions.get('window').width * 0.15,
                                marginRight: Dimensions.get('window').width * 0.08, fontSize: Dimensions.get('window').width * 0.05
                            }} onChangeText={(text) => this.updateValue(text = this.state.key + text, 'phone')} />
                    </Item>
                    <Text style={{ fontSize: Dimensions.get('window').width * 0.04 }}>
                        {strings.note}
                    </Text>
                    <Button rounded style={{
                        alignSelf: 'center', marginTop: 10, backgroundColor: '#1473e7',
                        alignItems: 'center', justifyContent: 'center', width: '80%',
                        marginTop: Dimensions.get('window').width * 0.08
                    }} onPress={() => this.submit()}  >
                        <Text style={{ color: 'white' }}>{strings.send}</Text>
                    </Button>

                </View>
            </ImageBackground>
        );
    }
}