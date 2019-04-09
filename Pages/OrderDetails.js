import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, Dimensions } from 'react-native';
import { Button, Container, Title,} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../NavigationService';
import strings from "../Localization"

export default class OrderDetails extends Component {
    heigh = Dimensions.get('window').height;
    width = Dimensions.get('window').width;

    ShowButton(){
        if(this.props.navigation.getParam('type') == 1){
            return(
                <Button style={{
                    marginLeft: this.width * 0.04,
                    width: this.width * 0.80, borderRadius: 10,
                    height: this.heigh * 0.05, backgroundColor: "#1473e6",
                    justifyContent: 'center'
                }}>
                    <Text uppercase={false} style={{
                        color: '#fff',
                        fontWeight: 'bold', fontSize: this.width * 0.04,
                        fontFamily: 'Cochin'
                    }}>{strings.Request}</Text>
                </Button>
            )
        }
    }
    render() {
        let data = this.props.navigation.getParam('details');
        return (
            <Container style={{ alignItems: 'center' }}>
                <ImageBackground source={require('../images/headerBackground.png')}
                    style={{
                        height: this.heigh * 0.2,
                        width: '100%', alignItems: 'center'
                    }}>
                    <View style={{flexDirection:'row'}}>
                    <Icon style={{flex:1 , marginLeft:8}} name="chevron-circle-left" color="white" size={this.width * 0.07} onPress={() => NavigationService.navigate('Homeclient')} ></Icon>
                        <Title style={{
                            flex:1,
                            textAlign: 'center', fontWeight: 'bold',
                            fontSize: 12
                        }}>{strings.Details}</Title>
                        <View style={{flex:1}}></View>
                    </View>
                </ImageBackground>

                <View style={{ position: 'absolute', marginTop: this.heigh * 0.10 }}>
                    <Image source={require('../images/avatar.png')}
                        style={{
                            marginLeft: this.width * 0.05,
                            height: this.heigh * 0.15
                            , width: this.width * 0.8,
                            borderRadius: this.width * 0.04
                        }}>
                    </Image>
                </View>
                <Text style={{
                    marginLeft: this.width * 0.02, marginTop: this.heigh * 0.06,
                    fontSize: this.heigh * 0.03, fontFamily: 'Cochin', color: '#000'}}>
                   {data.title}
                </Text>
                <View style={{ flexDirection: 'row', marginTop: this.heigh * 0.008 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{
                            marginLeft: this.width * 0.05,
                            fontSize: this.heigh * 0.03,
                            color: '#A9A9A9',
                            fontFamily: 'Cochin'
                        }}>{data.from_city.substring(0, 5)}</Text>
                        <View
                            style={{
                                marginLeft: this.width * 0.15,
                                backgroundColor: '#1473e6',
                                width: this.width * 0.03,
                                height: this.width * 0.03,
                                borderRadius: this.width * 0.03
                            }}
                        />

                    </View>
                    <View style={{ marginTop: this.heigh * 0.04, flexDirection: 'column' }}>

                        <View style={{

                            backgroundColor: '#A9A9A9',
                            borderRadius: this.width * 0.03,
                            marginTop: this.heigh * 0.01,
                            width: this.width * 0.6,
                            height: this.heigh * 0.001,
                            margin: this.width * 0.01
                        }}>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{
                            // marginLeft: this.width * 0.15,
                            fontSize: this.heigh * 0.03,
                            color: '#A9A9A9',
                            fontFamily: 'Cochin'
                        }}>{data.to_city.substring(0, 5)}</Text>

                        <View
                            style={{
                                backgroundColor: '#fff',
                                width: this.width * 0.03,
                                height: this.width * 0.03,
                                borderRadius: this.width * 0.03,
                                borderWidth: this.width * 0.002
                            }}
                        />
                    </View>

                </View>
                {/* ////////////////////////tabel/////////// */}

                <View style={{ flexDirection: 'row', marginTop: this.heigh * 0.05 }}>
                    <View style={{ marginLeft: this.width * 0.04, flexDirection: 'column' }}>
                        <View style={{
                            backgroundColor: '#d4d4d4',
                            height: this.heigh * 0.04,
                            width: this.width * 0.3,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#000'
                            }}>
                                {strings.firstPoint}
                            </Text>
                        </View>
                        {/* //////////////////////////// */}
                        <View style={{
                            backgroundColor: '#fff',
                            height: this.heigh * 0.04,
                            width: this.width * 0.3,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#000'
                            }}>
                               {strings.EndPoint}
                            </Text>
                        </View>
                        {/* ////////////////////////////////////// */}
                        <View style={{
                            backgroundColor: '#d4d4d4',
                            height: this.heigh * 0.04,
                            width: this.width * 0.3,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#000'
                            }}>
                                {strings.ArrivalDate}
                            </Text>
                        </View>
                        {/* //////////////////////////////////////////////// */}
                        <View style={{
                            backgroundColor: '#fff',
                            height: this.heigh * 0.04,
                            width: this.width * 0.3,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#000'
                            }}>
                                {strings.ArrivalTime}
                            </Text>
                        </View>
                        {/* ///////////////////////////////////////////////////// */}
                        <View style={{
                            backgroundColor: '#d4d4d4',
                            height: this.heigh * 0.04,
                            width: this.width * 0.3,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#000'
                            }}>
                                {strings.Weight}
                            </Text>
                        </View>
                        {/* ///////////////////////////////////////////////////// */}
                        <View style={{
                            backgroundColor: '##fff',
                            height: this.heigh * 0.04,
                            width: this.width * 0.3,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#000'
                            }}>
                                {strings.category}
                            </Text>
                        </View>
                        {/* ///////////////////////////////////////////////////// */}
                        <View style={{
                            backgroundColor: '#d4d4d4',

                            width: this.width * 0.3,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01,
                            height: this.heigh * 0.14,
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#000'
                            }}>
                                {strings.Description}
                            </Text>
                        </View>
                        {/* ///////////////////////////////////////;////////////////// */}

                    </View>

                    <View style={{ marginLeft: this.width * 0.01, flexDirection: 'column' }}>
                        <View style={{
                            backgroundColor: '#d4d4d4',
                            height: this.heigh * 0.04,
                            width: this.width * 0.5,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#3f3f3f',
                                fontSize: this.width * 0.04
                            }}>
                                {data.from_city}
                            </Text>
                        </View>
                        {/* //////////////////////////// */}
                        <View style={{
                            backgroundColor: '#fff',
                            height: this.heigh * 0.04,
                            width: this.width * 0.5,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#3f3f3f',
                                fontSize: this.width * 0.04
                            }}>
                                {data.to_city}
                            </Text>
                        </View>
                        {/* ////////////////////////////////////// */}
                        <View style={{
                            backgroundColor: '#d4d4d4',
                            height: this.heigh * 0.04,
                            width: this.width * 0.5
                            , justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#3f3f3f',
                                fontSize: this.width * 0.04
                            }}>
                                {data.travel_date}
                            </Text>
                        </View>
                        {/* //////////////////////////////////////////////// */}
                        <View style={{
                            backgroundColor: '#fff',
                            height: this.heigh * 0.04,
                            width: this.width * 0.5,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#3f3f3f',
                                fontSize: this.width * 0.04
                            }}>
                                {data.travel_time}
                            </Text>
                        </View>
                        {/* ///////////////////////////////////////////////////// */}
                        <View style={{
                            backgroundColor: '#d4d4d4',
                            height: this.heigh * 0.04,
                            width: this.width * 0.5,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#3f3f3f',
                                fontSize: this.width * 0.04
                            }}>
                               {data.weight}KG
                            </Text>
                        </View>
                        {/* ///////////////////////////////////////////////////// */}
                        <View style={{
                            backgroundColor: '#fff',
                            height: this.heigh * 0.04,
                            width: this.width * 0.5,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#3f3f3f',
                                fontSize: this.width * 0.04
                            }}>
                                {data.category_id}
                            </Text>
                        </View>
                        {/* ///////////////////////////////////////////////////// */}
                        <View style={{
                            backgroundColor: '#d4d4d4',
                            height: this.heigh * 0.14,
                            width: this.width * 0.5,
                            justifyContent: 'center',
                            marginBottom: this.heigh * 0.01
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#3f3f3f',
                                fontSize: this.width * 0.04,
                                margin: '10%'
                            }}>
                                {data.description}
                            </Text>
                        </View>

                    </View>
                </View>
                <View style={{ marginTop: this.heigh * 0.01, alignItems: 'center' }}>
                   {this.ShowButton()}
                </View>

            </Container>
        );
    }
}

