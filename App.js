import React, { Component } from 'react';
import Activation from './Pages/Activation';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import NavigationService from './NavigationService';
import Post from './Pages/Post';
import ContactUs from './Pages/ContactUs';
import FirstOnboard from './Pages/FirstOnboard'
import Agreement from './Pages/Agreement';
import AboutUs from './Pages/AboutUs';
import ProfilePage from './Pages/ProfilePage';
import SecondOnboard from './Pages/SecoundOnboard'
import SignUp from './Pages/SignUp';
import EnterPhone from './Pages/EnterPhone';
import Splash from './Pages/Splash';
import Homeclient from './Pages/Homeclient';
import Offers from './Pages/Offers';
import SignIn from './Pages/SignIn';
import NewPassword from './Pages/NewPassword';
import OrderDetails  from './Pages/OrderDetails';
import DrawerNavigator from './Navigation/NavigationDrawer'
import PasswordActivation from './Pages/PasswordActivation';

const TopLevelNavigator = createStackNavigator({ 
  Splash:{screen: Splash},
  SignIn: { screen: SignIn },
  PasswordActivation: { screen: PasswordActivation },
  NewPassword: { screen: NewPassword },
  DrawerNavigator: {screen:DrawerNavigator},
  Homeclient: { screen: Homeclient },
  AboutUs: { screen: AboutUs },
  SignUp: { screen: SignUp },
  Activation: { screen: Activation } ,
  OrderDetails:{screen:OrderDetails},
  SignUp: { screen: SignUp },
  EnterPhone:{  screen: EnterPhone },
  Post: { screen: Post },
  Activation: { screen: Activation },
  Agreement: { screen: Agreement },
  ContactUs: { screen: ContactUs },
  FirstOnboard: { screen: FirstOnboard },
  Offers: { screen: Offers },
  profilePage: { screen: ProfilePage },
  SecondOnboard: { screen: SecondOnboard },
  

},
{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
})
const AppContainer = createAppContainer(TopLevelNavigator);


export default class App extends Component {
  render() {
    return (
      <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
    );
  }
}