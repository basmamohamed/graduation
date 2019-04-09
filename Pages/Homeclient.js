import React, { Component } from 'react';
import { ImageBackground, Image, ActivityIndicator, Dimensions, View, ScrollView, StatusBar } from 'react-native';
import { Text, Left,Icon, Right,Body, Title, Button, Container } from 'native-base';
import NavigationService from '../NavigationService';
import StarRating from 'react-native-star-rating';
import strings from '../Localization'
export default class Homeclient extends Component {
    heigh = Dimensions.get('window').height;
    width = Dimensions.get('window').width;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            element: null,
            type: 0
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderFunction = this.renderFunction.bind(this);
    }
    componentDidMount() {
        const typeFormSignin = this.props.navigation.getParam('type');
        if (typeFormSignin === 1) {
            fetch('http://ecres248.servconfig.com/~easyoneclick/api/index.php/Home/home_posts?type=2')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        dataSource: responseJson,
                        isLoading: false
                    })
                })
                .catch((error) => {
                    // console.warn(error)
                })
        } else {
            fetch('http://ecres248.servconfig.com/~easyoneclick/api/index.php/Home/home_posts?type=1')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        dataSource: responseJson,
                        isLoading: false
                    })
                })
                .catch((error) => {
                    // console.warn(error)
                })
        }

    }
    rate() {
        const typeFormSignin2 = this.props.navigation.getParam('type');
        if (typeFormSignin2 === 2) {
            return (
                <View style={{ marginLeft: this.width * 0.08 }}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={4}
                        fullStarColor={'yellow'}
                        starSize={12}
                    />
                </View>
            )
        }
    }
    renderFunction() {
        const typeFormSignin3 = this.props.navigation.getParam('type');
        if (this.state.isLoading) {
            return (
                <ActivityIndicator style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }} />
            )
        }
        else {
            return (
                <ScrollView style={{ position: 'absolute', marginTop: this.heigh * 0.14, width: '100%', height: '100%' }}>
                    {this.state.dataSource.data.map((item, key) => (
                        <View key={key} transparent style={{
                            height: this.heigh * 0.13,
                            borderWidth: 2,
                            borderRadius: 2,
                            borderColor: '#ddd',
                            borderBottomWidth: 0,
                            margin: this.heigh * 0.02, width: this.width * 0.9, backgroundColor: "#fff"
                        }} >
                            <Body style={{ flexDirection: 'row' }}>
                                <Image source={require('../avatar.png')} style={{
                                    borderRadius: 10, height: this.heigh * 0.10
                                    , width: this.width * 0.15, borderColor: '#A9A9A9', borderWidth: 3
                                }}>
                                </Image>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{
                                            marginLeft: this.width * 0.02, marginTop: this.heigh * 0.02,
                                            fontSize: this.heigh * 0.02, fontFamily: 'Cochin'
                                        }}>
                                            {item.title}
                                        </Text>
                                    </View>
                                    <View style={{
                                        marginLeft: this.width * 0.02
                                    }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            {/* <View style={{ flexDirection: 'row' }}> */}
                                            <Text style={{
                                                marginLeft: this.width * 0.02,
                                                fontSize: this.heigh * 0.02,
                                                color: '#A9A9A9',
                                                fontFamily: 'Cochin'
                                            }}>{item.from_city.substring(0, 5)}</Text>

                                            <Text style={{
                                                marginLeft: this.width * 0.16,
                                                fontSize: this.heigh * 0.02,
                                                color: '#A9A9A9',
                                                fontFamily: 'Cochin'
                                            }}>{item.to_city.substring(0, 5)}</Text>
                                            {/* </View> */}

                                            {this.rate()}

                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginLeft: this.width * 0.04,
                                        }}>
                                            <View
                                                style={{
                                                    backgroundColor: '#1473e6',
                                                    width: this.width * 0.03,
                                                    height: this.width * 0.03,
                                                    borderRadius: this.width * 0.03
                                                }}
                                            />
                                            <View style={{
                                                backgroundColor: '#A9A9A9', borderRadius: this.width * 0.03,
                                                marginTop: this.heigh * 0.01,
                                                width: this.width * 0.2,
                                                height: this.heigh * 0.01,
                                                margin: this.width * 0.01
                                            }}>
                                            </View>
                                            <View
                                                style={{
                                                    backgroundColor: '#A9A9A9',
                                                    width: this.width * 0.03,
                                                    height: this.width * 0.03,
                                                    borderRadius: this.width * 0.03
                                                }}
                                            />
                                            {/* btn */}
                                            <Button rounded style={{
                                                width: this.width * 0.27, borderRadius: 30, marginLeft: this.heigh * 0.03,
                                                height: this.heigh * 0.04, backgroundColor: "#1473e6"
                                            }} onPress={() => NavigationService.navigate('OrderDetails', { details: item, type: typeFormSignin3 })} >
                                                <Text uppercase={false} style={{
                                                    color: '#fff', paddingLeft: this.width * 0.07,
                                                    fontWeight: 'bold', fontSize: 10, fontFamily: 'Cochin'
                                                }}>{strings.moreInfo}</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            </Body>

                        </View>
                    ))}
                </ScrollView>
            )
        }
    };
    render() {

        return (
            <Container style={{ alignItems: 'center' }}>
                <ImageBackground source={require('../headerBackground.png')}
                    style={{ height: Dimensions.get('window').width * 0.2, width: '100%', flexDirection: 'row' }}>
                    <StatusBar backgroundColor='#1473e6' ></StatusBar>
                    <Left style={{ flex: 1 }}>
                        <Icon onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={require('../android/drawable-hdpi/menu.png')} />
                        </Icon>
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>{strings.home}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </ImageBackground>
                {this.renderFunction()}
            </Container >
        )
    }
}