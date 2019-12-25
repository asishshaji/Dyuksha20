import React from 'react'
import { Dimensions, View, Text, } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { BGCOLOR, FONTCOLOR } from './src/Styles/Colors';

import firebase from 'react-native-firebase'

import CustomDrawer from './src/components/CustomDrawer';

import BottomNav from './navigators/index'


import About from './src/screens/DrawerScreens/About';


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
      title: 'Home'
    }
  },

  About: {
    screen: About,
    navigationOptions: {
      title: 'About'
    }
  },
}
  ,
  {
    contentComponent: props => <CustomDrawer {...props} />,
    drawerWidth: width * 0.75,
    //  hideStatusBar: true,
    drawerType: 'slide',
    contentOptions: {
      activeBackgroundColor: BGCOLOR,
      activeTintColor: FONTCOLOR,
      inactiveTintColor: 'grey',
      itemContainerStyle: {
        // marginTop: 16,
        // marginHorizontal: 8
      },

      itemStyle: {
        borderRadius: 8
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


