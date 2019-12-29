import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    SafeAreaView,
    Dimensions,
    Linking
} from "react-native";
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { BGCOLOR, FONTCOLOR } from "../Styles/Colors";


const { width } = Dimensions.get('window')

<<<<<<< HEAD
export default CustomDrawer = (props) => (
    <SafeAreaView style={{ opacity: 1, flex: 1, backgroundColor: BGCOLOR }}>
        <ScrollView>
            <View style={{
                elevation: 15, alignItems: 'center',
                justifyContent: 'center', height: 250, borderBottomEndRadius: 50,
                backgroundColor: '#1f1e1e'
            }}>
                <Image source={require('../../assets/logo.png')}
                    style={{ height: 80, width: 150, resizeMode: 'contain' }} />
            </View>
            <View style={styles.container}>
                <DrawerNavigatorItems {...props} />
            </View>

        </ScrollView>
        <View style={styles.footer} >
            <Text
                onPress={() => Linking.openURL('https://www.dyuksha.org/')}
                style={{ fontSize: 15, fontFamily: 'Light', color: FONTCOLOR, paddingTop: 5 }}>
                Visit Website
=======
export default CustomDrawer = (props) => {
    return (
        <SafeAreaView style={{ opacity: 1, flex: 1, backgroundColor: BGCOLOR }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    elevation: 15, alignItems: 'center',
                    justifyContent: 'center', height: 250, borderBottomEndRadius: 50,
                    backgroundColor: '#1f1e1e'
                }}>
                    <Image source={require('../../assets/logo.png')}
                        style={{ height: 80, width: 150, resizeMode: 'contain' }} />
                </View>
                <View style={styles.container}>
                    <DrawerNavigatorItems {...props} />
                </View>

            </ScrollView>
            <View style={styles.footer} >
                <Text
                    onPress={() => Linking.openURL('https://www.dyuksha.org/')}
                    style={{ fontSize: 15, fontFamily: 'Black', color: BGCOLOR, paddingTop: 5 }}>
                    Visit Website
>>>>>>> 55c293ed20366f9f4d59be8447ecc5b2b5159037
           </Text>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 30,
    },
    footer: {

        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
        height: 40,
        backgroundColor: BGCOLOR,


    }
});