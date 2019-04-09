import React from "react";
import { Dimensions, Container } from "react-native";
import {
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import Post from '../Pages/Post';
import AboutUs from '../Pages/AboutUs';
import ContactUs from '../Pages/ContactUs';
import Offers from '../Pages/Offers';
import Agreement from '../Pages/Agreement';
import MenuDrawer from '../Components/MenuDrawer';
import Homeclient from "../Pages/Homeclient";
import ProfilePage from "../Pages/ProfilePage"

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
  contentComponent: ({ navigation }) => {
    return (
        <MenuDrawer navigation={navigation} />
    )
  }
}

const DrawerNavigator = createDrawerNavigator({
  Home:{
    screen: Homeclient
  },
  Post: {
    screen: Post
  },
  AboutUs: {
    screen: AboutUs
  },
  ContactUs: {
    screen: ContactUs
  },
  Offers: {
    screen: Offers
  },
  Agreement: {
    screen: Agreement
  },
  ProfilePage: {
    screen: ProfilePage
  }
}, DrawerConfig);

export default createAppContainer(DrawerNavigator)