import React, { Component } from 'react';
import { ListItem, Radio, Item, Button , Header, Body, Title, Left,Right } from 'native-base';
import { Image, Text, TextInput, ImageBackground, ScrollView, View, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import WhiteHeader from '../Components/WhiteHeader';
import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationService from '../NavigationService';
import strings from '../Localization'

export default class SignUp extends Component {
    height = Dimensions.get('window').height;
    width = Dimensions.get('window').width;
    constructor(props) {
        super(props)
        this.state = {
            FullName: '',
            PhoneNumber: '',
            Password: '',
            ConfirmPassword: '',
            NationalIdPhotoURI: 'avatar.png',
            secureTextEntryone: true,
            secureTextEntrytwo: true,
            iconNameone: 'eye',
            itemSelected: '',
            Type: '',
            key: '+2',
            backgroundColorPhoto: '#f8f8f8',
            backgroundColorName: '#f8f8f8',
            backgroundColorPhone: '#f8f8f8',
            backgroundColorPassword: '#f8f8f8',
            backgroundColorConfirm: '#f8f8f8',

        }
        this.TypeValues = this.TypeValues.bind(this);
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


    signup = () => {

        const formData = {}
        formData.national_photo = this.state.NationalIdPhotoURI,
            formData.full_name = this.state.FullName,
            formData.phone = this.state.PhoneNumber,
            formData.password = this.state.Password,
            formData.type = this.state.Type
        if (formData.phone == "" || formData.password == "" || formData.national_photo == "" || formData.name == "" || this.state.ConfirmPassword == '') {
            this.refs.toast.show(strings.CompleteTheForm, DURATION.LENGTH_LONG);
            if (formData.phone == "") { this.setState({ backgroundColorPhone: "#FFA5A5" }) }
            if (formData.password == "") { this.setState({ backgroundColorPassword: "#FFA5A5" }) }
            if (formData.national_photo == "") { this.setState({ backgroundColorPhoto: "#FFA5A5" }) }
            if (formData.full_name == "") { this.setState({ backgroundColorName: "#FFA5A5" }) }
            if (this.state.ConfirmPassword == "") { this.setState({ backgroundColorConfirm: "#FFA5A5" }) }
        }
        if (formData.phone.length < 11) {
            this.refs.toast.show(strings.WriteCorrectPhoneNumber, DURATION.LENGTH_LONG);
            this.setState({ backgroundColorPhone: "#FFA5A5" })
        }
        if (formData.password != this.state.ConfirmPassword) {
            this.refs.toast.show(strings.PasswordNotMatched, DURATION.LENGTH_LONG);
            this.setState({ backgroundColorPassword: "#FFA5A5", backgroundColorConfirm: "#FFA5A5" })
        }
        else {
            fetch('http://ecres248.servconfig.com/~easyoneclick/api/index.php/User/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(
                    NavigationService.navigate('Activation', { phone: this.state.PhoneNumber })
                )
                .catch();
        };
    }

    render() {
        return (
            <ImageBackground resizeMode='stretch' source={require('../bg.png')} style={{ width: '100%', height: '100%' }}>
                <Header style={{ backgroundColor: 'white', shadowColor: 'black', shadowOpacity: 1, elevation: 4 }}
                    iosBarStyle="dark-content" androidStatusBarColor="white">
                    <Left style={{ flex: 1 }}><Icon name="chevron-circle-left" color="#1473e6" size={this.width * 0.07} onPress={() => NavigationService.navigate('SignIn')} > </Icon></Left>
                    <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Title style={{ color: '#000', fontSize: 15 }}>{strings.signUp}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
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
                <ScrollView style={{ width: '100%', height: '100%' }}>

                    <View style={{ alignItems: 'center' }}>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../images/avatar.png')}
                                style={{ marginTop: 20, width: 80, height: 80 }}
                            />
                        </View>
                        <Item rounded style={{
                            height: this.height * 0.08, justifyContent: 'space-around', width: '80%', backgroundColor: this.state.backgroundColorName,
                            marginTop: 5
                        }}>
                            <Icon name='user' style={{ marginLeft: this.width * 0.03 }}
                                size={this.width * 0.05} />
                            <TextInput placeholder={strings.yourName} onChangeText={(FullName) => this.setState({ FullName })}
                                style={{ textAlign: 'center', marginRight: this.width * 0.25 }} />
                        </Item>

                        <Item rounded style={{
                            height: this.height * 0.08, justifyContent: 'space-around', width: '80%',
                            backgroundColor: this.state.backgroundColorPhone, marginTop: 5
                        }}>
                            <Icon name='mobile' style={{ marginLeft: this.width * 0.03 }}
                                size={this.width * 0.07} />
                            <TextInput placeholder={strings.yourNumber} onChangeText={(PhoneNumber) => this.setState({ PhoneNumber: this.state.key + PhoneNumber })}
                                style={{ textAlign: 'center', marginRight: this.width * 0.08 }} />
                        </Item>

                        <Item rounded style={{
                            height: this.height * 0.08, justifyContent: 'space-around', width: '80%',
                            backgroundColor: this.state.backgroundColorPassword, marginTop: 5
                        }}>
                            <Icon name='lock' size={this.width * 0.06}
                                style={{ marginLeft: this.width * 0.08 }} />
                            <TextInput placeholder={strings.yourPassword} secureTextEntry={this.state.secureTextEntryone}
                                onChangeText={(Password) => this.setState({ Password })}
                                style={{
                                    textAlign: 'center', marginLeft: this.width * 0.08,
                                    marginRight: this.width * 0.13
                                }} />
                            <Icon name={this.state.iconNameone} size={this.width * 0.05}
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
                                onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })} />
                            <Icon name='eye' size={this.width * 0.05}
                                style={{ marginRight: this.width * 0.08 }}
                                onPress={() => this.showConfirm()} />
                        </Item>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'center' }}>
                        <ListItem>
                            <Radio selected={this.state.itemSelected == 'traveler'}
                                onPress={() =>
                                    this.setState({
                                        itemSelected: 'traveler',
                                        Type: '3'
                                    })
                                } />
                            <Text style={{ marginLeft: 5, fontSize: 12 }}>{strings.transporter}</Text>
                        </ListItem>
                        <ListItem>
                            <Radio selected={this.state.itemSelected == 'client'}
                                onPress={() =>
                                    this.setState({
                                        itemSelected: 'client',
                                        Type: '2'
                                    })
                                } />
                            <Text style={{ marginLeft: 5, fontSize: 12 }}>{strings.client}</Text>
                        </ListItem>
                        <ListItem>
                            <Radio selected={this.state.itemSelected == 'point'}
                                onPress={() =>
                                    this.setState({
                                        itemSelected: 'point',
                                        Type: '1'
                                    })

                                } />
                            <Text style={{ marginLeft: 5, fontSize: 12 }}>{strings.point}</Text>
                        </ListItem>
                    </View>

                    <Button rounded onPress={this.signup} style={{
                        alignSelf: 'center', marginTop: 5, backgroundColor: '#1473e7',
                        alignItems: 'center', height: this.height * 0.06, justifyContent: 'center', width: '80%'
                    }}>
                        <Text style={{ color: 'white' }}>{strings.signUp}</Text>
                    </Button>

                </ScrollView>
            </ImageBackground>
        );
    }
    TypeValues = () => {
        if (this.state.itemSelected == 'traveler') {
            this.setState({ Type: '1' })
        }
        else if (this.state.itemSelected == 'client') {
            this.setState({ Type: '2' })
        }
        else if (this.state.itemSelected == 'point') {
            this.setState({ Type: '3' })
        }
    }
}