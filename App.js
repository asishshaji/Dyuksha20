import React from 'react'
import { Dimensions, View, Text, } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { BGCOLOR, FONTCOLOR, ICONCOLOR } from './src/Styles/Colors';

import firebase from 'react-native-firebase'

import CustomDrawer from './src/components/CustomDrawer';

import BottomNav from './navigators/index'


import About from './src/screens/DrawerScreens/About';
import Contact from './src/screens/DrawerScreens/Contact';


const { width } = Dimensions.get('window')

const channel = new firebase.notifications.Android.Channel(
  "Dyuksha",
  "Notifications",
  firebase.notifications.Android.Importance.Max
).setDescription("Dyuksha");

// Create the channel
firebase.notifications().android.createChannel(channel);


const barWidth = 230
const barSpacing = (width - barWidth) / 2


const DrawerNavigator = createDrawerNavigator({

  Home: {
    screen: BottomNav,
    navigationOptions: {
      title: 'Home',
    }
  },

  About: {
    screen: About,
    navigationOptions: {
      title: 'About'
    }
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      title: 'Contact'
    }
  },

},
  {
    contentComponent: props => <CustomDrawer {...props}  />,
    drawerWidth: width * 0.75,
    drawerType: 'slide',

    contentOptions: {
      activeBackgroundColor: ICONCOLOR,
      activeTintColor: "white",
      inactiveTintColor: 'grey',
      itemContainerStyle: {
      
        // marginTop: 16,
        // marginHorizontal: 8
      },
      
      itemStyle: {
       // borderBottomColor: FONTCOLOR,
        
       // borderBottomWidth:2,
        borderRadius: 5
      }
    }
  }
);

DrawerNavigator.navigationOptions = ({ navigation }) => {


  let tabBarVisible = true;

  let isDrawerOpen = navigation.state.isDrawerOpen

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (isDrawerOpen) {
    tabBarVisible = false
  }
  // else if (routeName === "Map") {
  //   tabBarVisible = false

  // }

  return {
    tabBarVisible,
    isDrawerOpen
  }
}





export default createAppContainer(DrawerNavigator);


