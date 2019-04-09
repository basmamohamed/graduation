import React, { Component } from 'react';
import { Container, Content, Form, Item, Picker, Button, Text, View,Left, Body, Right, Title, Icon } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { TextInput, Dimensions, AsyncStorage,ImageBackground,Image,StatusBar } from 'react-native'
import Toast from 'react-native-easy-toast';
import NavigationService from '../NavigationService';
import strings from '../Localization'

export default class Post extends Component {
    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            points: [],
            load_cat: 0,
            selected_cat: '',
            selected_from: '',
            selected_to: '',
            date: "",
            time: '',
            load_point: 0,
            title: '',
            description: '',
            weight: '',
            Resp: 0,
            member_id: null,
            backgroundColorFromCity: '#f8f8f8',
            backgroundColorToCity: '#f8f8f8',
            backgroundColorTime: '#f8f8f8',
            backgroundColorDate: '#f8f8f8',
            backgroundColorWeight: '#f8f8f8',
            backgroundColorCategoryId: '#f8f8f8',
            backgroundColorTitle: '#f8f8f8',
            backgroundColorDescription: '#f8f8f8',

        };
    }
    onValueChange_category(value) {
        this.setState({
            selected_cat: value,
            backgroundColorCategoryId: '#f8f8f8'
        });
    }
    onValueChange_from(value) {
        this.setState({
            selected_from: value,
            backgroundColorFromCity: '#f8f8f8'
        });
    }
    onValueChange_to(value) {
        this.setState({
            selected_to: value,
            backgroundColorToCity: '#f8f8f8'
        });
    }
    updateValue(text, field) {
        if (field == 'title') {
            this.setState({
                title: text,
            })
        } else if (field == 'weight') {
            this.setState({
                weight: text,
            })
        } else if (field == 'description') {
            this.setState({
                description: text,
            })
        }
    }
    componentDidMount() {
        { this.LoadInitialState() }
        fetch('http://ecres248.servconfig.com/~easyoneclick/api/index.php/Posts/points?language=en')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    points: responseJson,
                    load_point: 1
                });
            })
            .catch((error) => {
                // console.warn(error)
            })
        fetch('http://ecres248.servconfig.com/~easyoneclick/api/index.php/Posts/categories?language=en')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson,
                    load_cat: 1
                });
            })
            .catch((error) => {
                // console.warn(error)
            })
    }
    categoriesGet() {
        if (this.state.load_cat === 1) {
            return (this.state.data.data.map((cat, key) => {
                return (
                    <Picker.Item key={key} label={cat.category_name} value={cat.category_id} />
                )
            }
            )
            )
        }
    }
    pointsGet() {
        if (this.state.load_point === 1) {
            return (this.state.points.data.map((point, key) => {
                return (
                    <Picker.Item key={key} label={point.point_name} value={point.point_id} />
                )
            }
            )
            )
        }
    }
    LoadInitialState = async () => {
        var value = await AsyncStorage.getItem('userId');
        if (value == null) {
            this.setState({ member_id: null })
        }
        else {
            this.setState({ member_id: value })
        }

    }
    ///////////////////////////////////////////////////////////////////////////////////
    submit() {
        let formData = {}
        formData.member_id = 18,
            formData.from_city = this.state.selected_from,
            formData.to_city = this.state.selected_to,
            formData.travel_date = this.state.date,
            formData.travel_time = this.state.time,
            formData.weight = this.state.weight,
            formData.title = this.state.title,
            formData.category_id = this.state.selected_cat,
            formData.description = this.state.description

        if (formData.from_city == '' || formData.to_city == '' || formData.travel_date == '' || formData.travel_time == '' || formData.weight == '' || formData.title == '' || formData.category_id == '' || formData.description == '') {
            this.refs.toast.show(strings.CompleteTheForm, DURATION.LENGTH_LONG);
            if (formData.from_city == "") { this.setState({ backgroundColorFromCity: "#FFA5A5" }) }
            if (formData.to_city == "") { this.setState({ backgroundColorToCity: "#FFA5A5" }) }
            if (formData.travel_date == "") { this.setState({ backgroundColorDate: "#FFA5A5" }) }
            if (formData.travel_time == "") { this.setState({ backgroundColorTime: "#FFA5A5" }) }
            if (formData.weight == "") { this.setState({ backgroundColorWeight: "#FFA5A5" }) }
            if (formData.title == "") { this.setState({ backgroundColorTitle: "#FFA5A5" }) }
            if (formData.category_id == "") { this.setState({ backgroundColorCategoryId: "#FFA5A5" }) }
            if (formData.description == "") { this.setState({ backgroundColorDescription: "#FFA5A5" }) }
        } else {
            var url = 'http://ecres248.servconfig.com/~easyoneclick/api/index.php/Posts/createPost';
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(formData), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    //  console.warn(response);
                    this.setState({
                        Resp: response.message
                    });
                    if (this.state.Resp === 0) {
                        this.refs.toast.show(strings.FullAllData, DURATION.LENGTH_LONG);
                    } else if (this.state.Resp === 1) {
                        this.refs.toast.show(strings.DataInsertedSuccessfuly, DURATION.LENGTH_LONG);
                        NavigationService.navigate('Homeclient')
                    }

                })
                .catch(error => {
                    //  console.warn('error');
                });
        }



    }

    render() {
        return (
            <Container>
                <ImageBackground source={require('../headerBackground.png')}
                    style={{ height: Dimensions.get('window').width * 0.2, width: '100%', flexDirection: 'row' }}>
                    <StatusBar backgroundColor='#1473e6' ></StatusBar>
                    <Left style={{ flex: 1 }}>
                        <Icon onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image source={require('../android/drawable-hdpi/menu.png')} />
                        </Icon>
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>{strings.postPage}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </ImageBackground>
                {/* //////////////////////////// */}
                <Toast
                    ref="toast"
                    style={{ marginTop: 2, backgroundColor: '#1473e6' }}
                    position='bottom'
                    positionValue={75}
                    fadeInDuration={800}
                    fadeOutDuration={7000}
                    opacity={0.8}
                    textStyle={{ color: '#fff', fontWeight: 'bold', fontSize: this.width * 0.045 }}
                />
                {/* ///////////////////////////// */}
                <Content style={{ marginLeft: this.height * 0.02, marginRight: this.height * 0.02 }}>
                    <Form style={{ flexDirection: 'row', justifyContent: 'space-between', margin: this.height * 0.02 }}>
                        <Item picker rounded style={{ width: '45%', height: this.height * 0.06, backgroundColor: this.state.backgroundColorFromCity }}>
                            <Text style={{
                                fontSize: this.width * 0.04, color: '#424242', marginLeft: this.height * 0.02,
                                marginTop: this.height * 0.001
                            }}>{strings.from}</Text>
                            <Picker
                                mode="dropdown"
                                style={{
                                    scaleX: 0.8, scaleY: 0.8, color: '#A9A9A9',
                                    margin: this.width * 0.01
                                }}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected_from}
                                onValueChange={this.onValueChange_from.bind(this)}>
                                {this.pointsGet()}
                            </Picker>
                        </Item>
                        <Item picker rounded style={{ width: '45%', height: this.height * 0.06, backgroundColor: this.state.backgroundColorToCity }}>
                            <Text style={{
                                fontSize: this.width * 0.04, color: '#424242', marginLeft: this.height * 0.02,
                                marginTop: this.height * 0.001
                            }}>{strings.to}</Text>
                            <Picker
                                mode="dropdown"
                                style={{ scaleX: 0.8, scaleY: 0.8, color: '#A9A9A9', margin: this.width * 0.01 }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected_to}
                                onValueChange={this.onValueChange_to.bind(this)}>
                                {this.pointsGet()}
                            </Picker>
                        </Item>
                    </Form>
                    <Text style={{ fontSize: this.width * 0.04, margin: this.height * 0.02, color: '#1473e6' }}>{strings.category}</Text>
                    <Item picker rounded style={{
                        height: this.height * 0.06,
                        marginLeft: this.height * 0.02, marginRight: this.height * 0.02,
                        borderTopLeftRadius: 0, borderTopRightRadius: 30,
                        borderBottomRightRadius: 30, borderBottomLeftRadius: 30,
                        backgroundColor: this.state.backgroundColorCategoryId
                    }}>
                        <Picker
                            mode="dropdown"
                            style={{ scaleX: 0.8, scaleY: 0.8, color: '#A9A9A9', margin: this.width * 0.25 }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected_cat}
                            onValueChange={this.onValueChange_category.bind(this)}>
                            {this.categoriesGet()}
                        </Picker>
                    </Item>
                    <Text style={{ color: '#424242', fontSize: this.width * 0.04, margin: this.height * 0.01 }}>{strings.title}</Text>
                    <TextInput placeholder='Enter Title'
                        style={{
                            height: this.height * 0.06, fontSize: this.width * 0.03,
                            textAlign: 'center', marginLeft: this.height * 0.02,
                            marginRight: this.height * 0.02, backgroundColor: this.state.backgroundColorTitle,
                            borderTopLeftRadius: 0, borderTopRightRadius: 30,
                            borderBottomRightRadius: 30, borderBottomLeftRadius: 30
                        }} onChangeText={(text) => {
                            this.updateValue(text, 'title')
                            this.setState({ backgroundColorTitle: '#f8f8f8' })
                        }} />
                    <View style={{ flexDirection: 'row', margin: this.height * 0.02, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: '#424242', fontSize: this.width * 0.04 }} >{strings.date}</Text>
                            <DatePicker
                                style={{ width: 90, backgroundColor: this.state.backgroundColorDate }}
                                date={this.state.date}
                                mode="date"
                                fontSize='fontSize: this.width * 0.03'
                                placeholder={strings.selectDate}
                                format="YYYY-MM-DD"
                                minDate="2018-03-01"
                                maxDate="2030-12-01"
                                confirmBtnText={strings.confirm}
                                cancelBtnText={strings.cancel}
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 2,
                                        height: this.height * 0.04,
                                        width: this.width * 0.04,
                                        borderTopLeftRadius: 0,
                                    },
                                    dateInput: {
                                        marginLeft: this.width * 0.01,
                                        height: this.height * 0.06, fontSize: this.width * 0.03,
                                        borderColor: '#424242', marginBottom: this.height * 0.01,
                                        borderTopRightRadius: 30, borderBottomRightRadius: 30,
                                        borderBottomLeftRadius: 30
                                    },
                                    dateText: {
                                        color: '#A9A9A9',
                                        fontSize: this.width * 0.03
                                    }

                                }}
                                onDateChange={(date) => { this.setState({ date: date, backgroundColorDate: '#f8f8f8' }) }}
                            />
                        </View>
                        <View style={{ flexDirection: 'column', }}>
                            <Text style={{ color: '#424242', fontSize: this.width * 0.04 }}>{strings.time}</Text>
                            <DatePicker
                                style={{ width: 80, backgroundColor: this.state.backgroundColorTime }}
                                date={this.state.time}
                                mode="time"
                                format="hh:mm:ss"
                                confirmBtnText={strings.confirm}
                                cancelBtnText={strings.cancel}
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 2,
                                        height: this.height * 0.04,
                                        width: this.width * 0.04,
                                        borderTopLeftRadius: 0,
                                    },
                                    dateInput: {
                                        marginLeft: this.width * 0.01,
                                        height: this.height * 0.06, fontSize: this.width * 0.03,
                                        borderColor: '#424242', marginBottom: this.height * 0.01,
                                        borderTopRightRadius: 30, borderBottomRightRadius: 30,
                                        borderBottomLeftRadius: 30
                                    },
                                    dateText: {
                                        color: '#A9A9A9',
                                        fontSize: this.width * 0.03
                                    }
                                }}
                                onDateChange={(time) => { this.setState({ time: time, backgroundColorTime: '#f8f8f8' }) }}
                            />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: '#424242', fontSize: this.width * 0.04 }}>{strings.Weight}</Text>
                            <TextInput placeholder='weight' style={{
                                height: this.height * 0.06,
                                width: this.width * 0.2,
                                textAlign: 'center', backgroundColor: this.state.backgroundColorWeight,
                                borderColor: '#424242', fontSize: this.width * 0.03,
                                borderTopLeftRadius: 0, borderTopRightRadius: 30,
                                borderBottomRightRadius: 30,
                                borderBottomLeftRadius: 30, borderWidth: this.width * 0.003
                            }} keyboardType='numeric' onChangeText={
                                (text) => {
                                    this.updateValue(text, 'weight')
                                    this.setState({ backgroundColorWeight: '#f8f8f8' })
                                }} />
                        </View>
                    </View>
                    <Text style={{
                        fontSize: this.width * 0.04, color: '#424242', marginLeft: this.height * 0.02,
                        marginTop: this.height * 0.001
                    }}>{strings.Description}</Text>
                    <View style={{}}>
                        <Item rounded style={{
                            backgroundColor: this.state.backgroundColorDescription, marginRight: this.height * 0.02,
                            marginLeft: this.height * 0.02, marginTop: this.height * 0.001
                        }}>
                            <TextInput style={{
                                width: '100%',
                                fontSize: this.width * 0.03
                            }}
                                placeholder={strings.writeDescription}
                                placeholderTextColor={"#a9a9a9"}
                                numberOfLines={4}
                                multiline={true}
                                onChangeText={(text) => {
                                    this.updateValue(text, 'description')
                                    this.setState({ backgroundColorDescription: '#f8f8f8' })
                                }} />
                        </Item>
                    </View>
                    <Button rounded style={{
                        alignSelf: 'center', margin: this.height * 0.01, backgroundColor: '#1473e7',
                        alignItems: 'center', justifyContent: 'center', width: '90%', height: this.height * 0.06,
                    }} onPress={() => this.submit()} >
                        <Text style={{ fontSize: this.width * 0.03, color: 'white' }}>{strings.post}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}