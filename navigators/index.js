import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../src/screens/Home';

import Detail from '../src/screens/DetailScreen';
import Live from '../src/screens/Live';
import MapScreen from '../src/screens/MapScreen';
import Notifications from '../src/screens/Notifications';
import SplashScreen from '../src/screens/SplashScreen'

import Icon from 'react-native-vector-icons/Ionicons';


import { Dimensions, View, Text, } from 'react-native'
import SelectScreen from '../src/screens/SelectScreens/Select';
import LiveNow from '../src/screens/LiveScreens/LiveNow';
import EventDetailScreen from '../detailScreens/EventDetails';

const { width } = Dimensions.get('window')
const barWidth = 230
const barSpacing = (width - barWidth) / 2


const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,

    },
    Detail: {
        screen: Detail

    },
    Select: {
        screen: SelectScreen
    },

    SplashScreen: {
        screen: SplashScreen
    }

}, {
    initialRouteName: 'SplashScreen',
    // transitionConfig: navConfig
});

const LiveStack = createStackNavigator({
    Explore: {
        screen: Live,
    },
    EventDetail: {
        screen: EventDetailScreen

    },
    LiveNow: {
        screen: LiveNow
    },
});

AppNavigator.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'Detail') {
        tabBarVisible = false
    } else if (routeName === "SplashScreen") {
        tabBarVisible = false

    }

    return {
        tabBarVisible,
    }

}



LiveStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'LiveNow') {
        tabBarVisible = false
    } 
    else if (routeName === "EventDetail") {
        tabBarVisible = false

    }
    

    return {
        tabBarVisible,
    }

}

const renderNav = (routeName, name, tintColor, focused) => (
    <View style={{
        height: 35, width: 35, alignItems: 'center',
        backgroundColor: focused ? "#E55656" : '#f5f5f5',
        borderRadius: 35 / 2, alignItems: 'center', justifyContent: 'center'
    }}>
        <Icon name={name} color={focused ? "white" : '#ccc'} size={26} style={{}} />
    </View>
)

const customTabs = ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        tintColor = "white"
        if (routeName === 'Home') {
            return renderNav(routeName, 'ios-home', tintColor, focused);
        } else if (routeName === 'Live') {
            return renderNav(routeName, 'ios-search', tintColor, focused);
        }
        else if (routeName === 'Notifications') {
            return renderNav(routeName, 'ios-notifications', tintColor, focused);
        }
        else if (routeName === 'Map') {
            return renderNav(routeName, 'ios-compass', tintColor, focused);
        }
    }
});

 const BottomNav = createBottomTabNavigator({
    Home: {
        screen: AppNavigator,
    },
    Live: {
        screen: LiveStack,
    },
    Notifications: {
        screen: Notifications
    },

    Map: {
        screen: MapScreen
    }


}, {
    defaultNavigationOptions: customTabs,
    animationEnabled: true,
    swipeEnabled: true,
    // initialRouteName: 'Notifications',
    tabBarOptions: {
        style: {
            width: barWidth,
            backgroundColor: 'white',
            position: 'absolute',
            left: barSpacing,
            right: barSpacing,
            height: 60,
            elevation: 4,
            bottom: 15,
            borderRadius: 60 / 2,
            borderTopWidth: 0,
            padding: 5,
        }, showLabel: false
    }

})

export default createAppContainer(BottomNav);