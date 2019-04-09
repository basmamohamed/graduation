import React from 'react';
import strings from '../Localization'
import {
	View,
	Text,
	Image,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
	Dimensions, 
	StatusBar
} from 'react-native';
import { Icon } from 'native-base';

export default class MenuDrawer extends React.Component {
	width=Dimensions.get('window').width
	navLink(nav, text) {
		return (
			<TouchableOpacity style={{ height: 50 }} onPress={() => this.props.navigation.navigate(nav)}>
				<Text style={{color:'black'}}>{text}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		return (

			<ImageBackground source={require('../bg.png')}
				style={{ width: '100%', height: '100%' }}>
				<ScrollView>
					<View>
						<ImageBackground source={require('../images/headerBackground.png')}
							style={{ justifyContent: 'center', alignItems: 'center', height: 100, width: '100%' }}>
							<Image source={require('../images/slogo.png')} style={{ height: '40%', width: '40%' }} />
							<Text style={{ fontSize:this.width * 0.06,fontWeight: 'bold', color:'white' }}>247 Shipping</Text>
						</ImageBackground>
					</View>
					<View style={{margin:this.width*0.07}}>
					<View style={{flexDirection:'row'}}>
						<Icon name="home" style={{marginRight:this.width*0.06}}>
							
						</Icon>
						{this.navLink('Homeclient', strings.home)}
						</View>
					<View style={{flexDirection:'row'}}>
						<Icon style={{marginRight:this.width*0.06}}>
							<Image source={require('../android/drawable-mdpi/blog.png')}/>
						</Icon>
						{this.navLink('Post', strings.Newpost)}
						</View >
						<View style={{flexDirection:'row'}}>
						<Icon style={{marginRight:this.width*0.07}}>
							<Image source={require('../android/drawable-mdpi/Info.png')}/>
						</Icon>
						{this.navLink('AboutUs', strings.AboutUs)}
						</View>
						<View style={{flexDirection:'row'}}>
						<Icon style={{marginRight:this.width*0.06}}>
							<Image source={require('../android/drawable-mdpi/contact-us.png')}/>
						</Icon>
						{this.navLink('ContactUs', strings.contactUs)}
						</View>
						 <View style={{flexDirection:'row'}}>
						<Icon style={{marginRight:this.width*0.06}}>
							<Image source={require('../android/drawable-mdpi/offers.png')}/>
						</Icon>
						{this.navLink('ProfilePage', strings.profilesettings)}
						</View> 
						<View style={{flexDirection:'row'}}>
						<Icon style={{marginRight:this.width*0.07}}>
							<Image source={require('../android/drawable-mdpi/padlock.png')}/>
						</Icon>
						{this.navLink('Agreement', strings.policy)}
						</View>
					</View>
				</ScrollView>
			</ImageBackground>


		)
	}
}

