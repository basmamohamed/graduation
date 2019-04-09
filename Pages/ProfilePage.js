import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, TextInput, Modal, Dimensions, StatusBar, ScrollView } from 'react-native';
import { Button, Item } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";
import Toast, { DURATION } from 'react-native-easy-toast';
import strings from "../Localization"

export default class ProfilePage extends Component {
    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;
    constructor(props) {
        super(props);
        this.state = {
            secureTextEntryone: true,
            secureTextEntrytwo: true,
            secureTextEntryold:true,
            visible: false,
            phone: '',
            full_name: '',
            email: '',
            photo: '',
            password: '',
            national_photo:'',
            type:'',
            member_id: 15,
            dataSource: [],
            Resp:0,
            backgroundColorName: '#f8f8f8',
            backgroundColorPhone: '#f8f8f8',
            backgroundColorEmail: '#f8f8f8',
        };
    }
    showPassword = () => {
        this.setState({
            secureTextEntryone: !this.state.secureTextEntryone
        })
    };
    showOld = () => {
        this.setState({
            secureTextEntryold: !this.state.secureTextEntryold
        })
    };
    showConfirm = () => {
        if (secureTextEntrytwo = true) {
            this.setState({ secureTextEntrytwo: !this.state.secureTextEntrytwo })
        }
    };
    showDialog = () => {
        this.setState({ visible: true });
    };

    componentDidMount() {
        fetch('http://172.16.4.183/wasly_m3ak/api/index.php/User/user_to_settings?member_id=18')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.data,
                    full_name: responseJson.data[0].full_name,
                    email: responseJson.data[0].email,
                    photo: responseJson.data[0].photo,
                    national_photo: responseJson.data[0].national_photo,
                    phone: responseJson.data[0].phone,
                    password: responseJson.data[0].password,
                })
                // console.warn(this.state.phone);
            })
            .catch((error) => {
                // console.warn(error)
            })

    };
    save() {
        this.setState({ visible: false });       
    }
    submit() {
        let formData = {}
            formData.member_id = this.state.member_id,
            formData.full_name = this.state.full_name,
            formData.email = this.state.email,
            formData.photo = this.state.photo,
            formData.national_photo = this.state.national_photo,
            formData.phone = this.state.phone,
            formData.password = this.state.password
            if (formData.phone == "" || formData.full_name == "" || formData.email == '') {
                this.refs.toast.show(strings.CompleteTheForm, DURATION.LENGTH_LONG);
                if (formData.phone == "") { this.setState({ backgroundColorPhone: "#FFA5A5" }) }
                if (formData.full_name == "") { this.setState({ backgroundColorName: "#FFA5A5" }) }
                if (formData.email == "") { this.setState({ backgroundColorEmail: "#FFA5A5" }) }
            }
            if (formData.phone.length < 11) {
                this.refs.toast.show(strings.WriteCorrectPhoneNumber, DURATION.LENGTH_LONG);
                this.setState({ backgroundColorPhone: "#FFA5A5" })
            }
            else{
            var url = 'http://172.16.4.183/wasly_m3ak/api/index.php/User/editProfile';
            fetch(url, {
                method: 'POST',  
                body: JSON.stringify(formData),  
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    this.refs.toast.show(strings.DataUpdatedSuccessfuly, DURATION.LENGTH_LONG);
                })
                .catch(error => {
                    this.refs.toast.show(strings.pleaseTryAgain, DURATION.LENGTH_LONG);
                });
            
            }
    }

    render() {
       
        return (
            <View style={{ flexDirection: 'column' }}>
            <StatusBar backgroundColor='#1473e6'></StatusBar>
               {/* //////////////////////////// */}
                    <Toast
                        ref="toast"
                        style={{ marginTop:2,backgroundColor: '#1473e6' }}
                        position='bottom'
                        positionValue={75}
                        fadeInDuration={800}
                        fadeOutDuration={7000}
                        opacity={0.8}
                        textStyle={{ color: '#fff', fontWeight: 'bold', fontSize: this.width * 0.045 }}
                    />
                {/* ///////////////////////////// */}
                {this.state.dataSource.map((item, key) => (
                    
                    <View key={key}>
                    <ImageBackground source={require('../headerBackground.png')}
                        style={{ width: '100%', height: this.height * 0.22 }}
                    >
                        <Image source={require('../avatar.png')}
                            style={{ width: this.width * 0.25, height: this.width * 0.25, alignSelf: 'center', marginTop: '20%', borderRadius: 50 }}
                        >
                        </Image>
                        <Icon name='camera' size={this.width * 0.04}
                            style={{ alignSelf: 'center', position: 'absolute', marginTop: '43%' }} />
                        <Text style={{ textAlign: 'center', fontSize: this.width * 0.05, marginTop: this.width * 0.03 }}>{item.full_name}</Text>
                    </ImageBackground>

                </View>
                ))}
                

                {this.state.dataSource.map((item, key) => (
                    <ScrollView key={key} style={{ width: '100%', height: '100%' }}>

                        <View style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: this.height * 0.09 }}>
                            <Item rounded style={{ width: '80%', height: this.height * 0.08, backgroundColor: this.state.backgroundColorName, marginTop: this.width * 0.05, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Icon name='user' size={this.width * 0.06}
                                    style={{ marginLeft: this.width * 0.08 }} />
                                <TextInput onChangeText={(full_name) => this.setState({ full_name,backgroundColorName:'#f8f8f8' })} placeholder={strings.yourName}
                                    style={{
                                        fontSize: this.width * 0.035,
                                        textAlign: 'center', marginLeft: this.width * 0.08,
                                        marginRight: this.width * 0.08, marginTop: this.width * 0.02
                                    }} >{item.full_name}</TextInput>
                                <Icon name='edit' size={this.width * 0.06}
                                    style={{ marginRight: this.width * 0.08 }} />
                            </Item>
                            <Item rounded style={{ width: '80%', height: this.height * 0.08, backgroundColor: this.state.backgroundColorEmail, marginTop: this.width * 0.06, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Icon name='envelope' size={this.width * 0.06}
                                    style={{ marginLeft: this.width * 0.08 }} />
                                <TextInput onChangeText={(email) => this.setState({ email , backgroundColorEmail: '#f8f8f8' })} placeholder={strings.yourEmail}
                                    style={{
                                        fontSize: this.width * 0.035,
                                        textAlign: 'center', marginLeft: this.width * 0.08,
                                        marginRight: this.width * 0.08, marginTop: this.width * 0.02
                                    }} >{item.email}</TextInput>
                                <Icon name='edit' size={this.width * 0.06}
                                    style={{ marginRight: this.width * 0.08 }} />
                            </Item>
                            <Item rounded style={{
                                width: '80%', height: this.height * 0.08, backgroundColor: this.state.backgroundColorPhone,
                                marginTop: this.width * 0.06, justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <Icon name='mobile' size={this.width * 0.08}
                                    style={{ marginLeft: this.width * 0.08 }} />
                                <TextInput onChangeText={(phone) => this.setState({ phone , backgroundColorPhone: '#f8f8f8' })} placeholder={strings.yourNumber}
                                    style={{
                                        fontSize: this.width * 0.035,
                                        textAlign: 'center', marginLeft: this.width * 0.08,
                                        marginRight: this.width * 0.08, marginTop: this.width * 0.02
                                    }} >{item.phone}</TextInput>
                                <Icon name='edit' size={this.width * 0.06}
                                    style={{ marginRight: this.width * 0.08 }} />
                            </Item>
                        </View>

                        <View style={{ marginTop: this.height * 0.06, alignContent: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Button rounded style={{
                                alignSelf: 'center', backgroundColor: '#1473e7', height: this.height * 0.06,
                                alignItems: 'center', justifyContent: 'center', width: '80%'
                            }}
                                onPress={() =>this.showDialog()}
                            >

                                <Text style={{ color: 'white' }}>{strings.changePassword}</Text>
                            </Button>
                            <Button rounded style={{
                                alignSelf: 'center', marginTop: this.width * 0.03, backgroundColor: '#1473e7',
                                alignItems: 'center', justifyContent: 'center', width: '80%', height: this.height * 0.06
                            }}onPress={() => this.submit()}>
                                <Text style={{ color: 'white' }}>{strings.save}</Text>
                            </Button>
                        </View>
 
                    <Dialog.Container  visible={this.state.visible} >
                        <Text style={{ textAlign:'center' , fontSize:this.width * 0.06}}>{strings.changePassword}</Text>

                        <Item rounded style={{ width: this.width * 0.9, backgroundColor: '#f8f8f8', marginTop: 10 }}>
                            <Icon name='lock' size={Dimensions.get('window').width * 0.06}
                                style={{  marginLeft: Dimensions.get('window').width * 0.08 }} />
                            <TextInput onChangeText={(password) => this.setState({ password })} placeholder={strings.newPassword} secureTextEntry={this.state.secureTextEntryone}
                                style={{
                                    height: this.height * 0.08,
                                    fontSize:this.width * 0.04,
                                    textAlign: 'center', marginLeft: Dimensions.get('window').width * 0.08,
                                    marginRight: Dimensions.get('window').width * 0.13
                                }} />
                            <Icon name='eye' onPress={() => this.showPassword()} size={Dimensions.get('window').width * 0.05}
                                style={{ marginRight: Dimensions.get('window').width * 0.08 }} />
                        </Item>

                        <Item rounded style={{ width: this.width * 0.9, backgroundColor: '#f8f8f8', marginTop: 10 }}>
                            <Icon name='lock' size={Dimensions.get('window').width * 0.06}
                                style={{ marginLeft: Dimensions.get('window').width * 0.08 }} />
                            <TextInput  secureTextEntry={this.state.secureTextEntrytwo} placeholder={strings.confirmPassword}
                                style={{ height: this.height * 0.08,
                                    fontSize:this.width * 0.04,
                                    textAlign: 'center', marginLeft: Dimensions.get('window').width * 0.08,
                                    marginRight: Dimensions.get('window').width * 0.08
                                }} />
                            <Icon name='eye' onPress={() => this.showConfirm()} size={Dimensions.get('window').width * 0.05}
                                style={{ marginRight: Dimensions.get('window').width * 0.08 }} />
                        </Item>
                        
                        <Button rounded style={{
                         marginTop:this.height * 0.02,
                        alignSelf: 'center', backgroundColor: '#1473e7',height : this.height * 0.08,
                        alignItems: 'center', justifyContent: 'center', width : this.width * 0.9
                    }} onPress={() => this.save()} >
                        <Text style={{ alignSelf:'center',color: 'white' }}>{strings.save}</Text>
                    </Button>
                         
                    </Dialog.Container>  
                    
                    </ScrollView>
                ))}

            </View>
        );
    }
}