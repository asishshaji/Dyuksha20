// import React from 'react'
// import { Dimensions, View, Text, } from 'react-native'
// import { createAppContainer } from 'react-navigation';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import { BGCOLOR, FONTCOLOR, ICONCOLOR } from './src/Styles/Colors';

// import firebase from 'react-native-firebase'

// import CustomDrawer from './src/components/CustomDrawer';

// import BottomNav from './navigators/index'


// import About from './src/screens/DrawerScreens/About';
// import Contact from './src/screens/DrawerScreens/Contact';


// const { width } = Dimensions.get('window')

// const channel = new firebase.notifications.Android.Channel(
//   "Dyuksha",
//   "Notifications",
//   firebase.notifications.Android.Importance.Max
// ).setDescription("Dyuksha");

// // Create the channel
// firebase.notifications().android.createChannel(channel);


// const barWidth = 230
// const barSpacing = (width - barWidth) / 2


// const DrawerNavigator = createDrawerNavigator({

//   Discover: {
//     screen: BottomNav,
//     navigationOptions: {
//       title: 'Discover',
//     }
//   },

//   About: {
//     screen: About,
//     navigationOptions: {
//       title: 'About'
//     }
//   },
//   Contact: {
//     screen: Contact,
//     navigationOptions: {
//       title: 'Contact'
//     }
//   },

// },
//   {
//     contentComponent: props => <CustomDrawer {...props} />,
//     drawerWidth: width * 0.75,
//     drawerType: 'front',

//     contentOptions: {
//       activeBackgroundColor: ICONCOLOR,
//       activeTintColor: "white",
//       inactiveTintColor: 'grey',
//       itemContainerStyle: {
//       },

//       itemStyle: {
//         borderRadius: 5
//       }
//     }
//   }
// );

// DrawerNavigator.navigationOptions = ({ navigation }) => {


//   let tabBarVisible = true;

//   let isDrawerOpen = navigation.state.isDrawerOpen

//   let routeName = navigation.state.routes[navigation.state.index].routeName

//   if (isDrawerOpen) {
//     tabBarVisible = false
//   }
//   // else if (routeName === "Map") {
//   //   tabBarVisible = false

//   // }

//   return {
//     tabBarVisible,
//     isDrawerOpen
//   }
// }





// export default createAppContainer(DrawerNavigator);







import React from 'react'
import { Dimensions, View, Text, BackHandler, Animated, Easing } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import 'react-native-gesture-handler';
import Home from './src/screens/Home';

import Detail from './src/screens/DetailScreen';
import Live from './src/screens/Live';
import MapScreen from './src/screens/MapScreen';
import Notifications from './src/screens/Notifications';
import SplashScreen from './src/screens/SplashScreen'

import Icon from 'react-native-vector-icons/Ionicons';
import SelectScreen from './src/screens/ListScreen';
import LiveNow from './src/screens/LiveScreens/LiveNow';


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
    Notifications: {
        screen: Notifications,
    },
    LiveNow: {
        screen: LiveNow
    },

    Select: {
        screen: SelectScreen
    },

    SplashScreen: {
        screen: SplashScreen
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
    } else if (routeName === "SplashScreen") {
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
        else if (routeName === 'Map') {
            return renderNav(routeName, 'ios-compass', tintColor, focused);
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

    Map: {
        screen: MapScreen
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