import 'react-native-gesture-handler';

import { Animated, BackHandler, Dimensions, Easing, Text, View } from 'react-native'
import { StackViewTransitionConfigs, createStackNavigator } from 'react-navigation-stack';

import About from './src/screens/DrawerScreens/About'
import Contact from './src/screens/DrawerScreens/Contact'
import Detail from './src/screens/DetailScreen';
import Feed from './src/screens/LiveScreens/Feed';
import Home from './src/screens/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import Live from './src/screens/Live';
import LiveNow from './src/screens/LiveScreens/LiveNow';
import MapScreen from './src/screens/MapScreens/MapScreen';
import Notifications from './src/screens/Notifications';
import ProShow from './src/screens/ProShowScreen'
import React from 'react'
import SelectScreen from './src/screens/ListScreen';
import SplashScreen from './src/screens/SplashScreen'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import firebase from 'react-native-firebase'

const { width } = Dimensions.get('window')
const barWidth = 230
const barSpacing = (width - barWidth) / 2


firebase.auth().signInAnonymously()
    .then((user) => {
    });


const AppNavigator = createStackNavigator({
    Discover: {
        screen: Home,

    },
    Detail: {
        screen: Detail

    },
    LiveNow: {
        screen: LiveNow,

    },
    Feed: {
        screen: Feed

    },
    Select: {
        screen: SelectScreen
    },

    SplashScreen: {
        screen: SplashScreen
    },
    About: {
        screen: About
    },
    Contact: {
        screen: Contact
    },
    Map: {
        screen: MapScreen
    },
    ProShow
}, {
    defaultNavigationOptions: {
        gesturesEnabled: true,

        gestureResponseDistance: { horizontal: 30 }
    },

    transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps
            const { index } = scene

            const height = layout.initHeight
            const translateY = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [height, 0, 0],
            })

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            })

            return { opacity, transform: [{ translateY }] }
        },
    }),

    initialRouteName: 'SplashScreen',

});


const ScheduleStack = createStackNavigator({
    Explore: {
        screen: Live,
    },
    Detail: {
        screen: Detail

    },

}, {
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },

    transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps
            const { index } = scene

            const height = layout.initHeight
            const translateY = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [height, 0, 0],
            })

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            })

            return { opacity, transform: [{ translateY }] }
        },
    }),

});

AppNavigator.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'Detail') {
        tabBarVisible = false
    }
    else if (routeName == 'Contact') {
        tabBarVisible = false
    }
    else if (routeName == 'About') {
        tabBarVisible = false
    }
    else if (routeName == 'Map') {
        tabBarVisible = false
    }

    else if (routeName === "SplashScreen") {
        tabBarVisible = false

    }
    else if (routeName == 'LiveNow') {
        tabBarVisible = false
    }
    else if (routeName == 'Feed') {
        tabBarVisible = false
    }
    else if (routeName === "Select") {
        tabBarVisible = false
    }
    else if (routeName === "Notifications") {
        tabBarVisible = false
    }
    else if (routeName === "ProShow") {
        tabBarVisible = false
    }
    return {
        tabBarVisible,
    }

}



ScheduleStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;
    let drawerLockMode = 'unlocked';
    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName === "Detail") {
        tabBarVisible = false
        drawerLockMode = 'locked-closed';

    }


    return {
        tabBarVisible,
        drawerLockMode
    }

}

const renderNav = (routeName, name, tintColor, focused) => (
    <View style={{
        height: 35, width: 35, alignItems: 'center',
        backgroundColor: focused ? "white" : 'white',
        borderRadius: 35 / 2, alignItems: 'center', justifyContent: 'center'
    }}>
        <Icon name={name} color={focused ? "tomato" : '#ccc'} size={26} style={{}} />
    </View>
)

const customTabs = ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        tintColor = "white"
        if (routeName === 'Discover') {
            return renderNav(routeName, 'ios-search', tintColor, focused);
        } else if (routeName === 'Schedule') {
            return renderNav(routeName, 'md-calendar', tintColor, focused);
        }
        // else if (routeName === 'Notifications') {
        //     return renderNav(routeName, 'ios-notifications', tintColor, focused);
        // }
        else if (routeName === 'Notification') {
            return renderNav(routeName, 'ios-notifications-outline', tintColor, focused);
        }
    }
});

const BottomNav = createBottomTabNavigator({
    Discover: {
        screen: AppNavigator,

    },
    Schedule: {
        screen: ScheduleStack,


    },

    Notification: {
        screen: Notifications
    }


}, {
    defaultNavigationOptions: customTabs,
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
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

        }, showLabel: true
    }

})



export default createAppContainer(BottomNav);