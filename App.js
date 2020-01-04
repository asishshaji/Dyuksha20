import React from 'react'
import { Dimensions, View, Text, BackHandler, Animated, Easing } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import 'react-native-gesture-handler';
import Home from './src/screens/Home';

import Detail from './src/screens/DetailScreen';
import Live from './src/screens/Live';
import Notifications from './src/screens/Notifications';
import SplashScreen from './src/screens/SplashScreen'

import Icon from 'react-native-vector-icons/Ionicons';
import SelectScreen from './src/screens/ListScreen';
import LiveNow from './src/screens/LiveScreens/LiveNow';
import About from './src/screens/DrawerScreens/About'
import Contact from './src/screens/DrawerScreens/Contact'


const { width } = Dimensions.get('window')
const barWidth = 230
const barSpacing = (width - barWidth) / 2


const AppNavigator = createStackNavigator({
    Discover: {
        screen: Home,

    },
    Detail: {
        screen: Detail

    },
    LiveNow: {
        screen: LiveNow
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
    }
}, {
    defaultNavigationOptions: {
        gesturesEnabled: true,
        gestureResponseDistance: { horizontal: 25 }
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

const LiveStack = createStackNavigator({
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
    else if (routeName === "Select") {
        tabBarVisible = false
    }
    else if (routeName === "Notifications") {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
    }

}



LiveStack.navigationOptions = ({ navigation }) => {

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
        screen: LiveStack,


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