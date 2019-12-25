import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    SafeAreaView,
    Dimensions
} from "react-native";
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { BGCOLOR, FONTCOLOR } from "../Styles/Colors";


const { width } = Dimensions.get('window')

export default CustomDrawer = (props) => (
    <SafeAreaView style={{ opacity: 0.9, flex: 1, backgroundColor: BGCOLOR }}>
        <ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 250, borderBottomEndRadius: 100, backgroundColor: BGCOLOR }}>
                <Image source={require('../../assets/logo.png')} style={{ height: 80, width: 150, resizeMode: 'contain' }} />
            </View>
            <View style={styles.container}>
                <DrawerNavigatorItems {...props} />
            </View>

        </ScrollView>
        <View style={styles.footer} >
            <Text style={{ fontSize: 15, fontFamily: 'Light', color: FONTCOLOR, paddingTop: 5 }}>
                Visit Website
           </Text>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
        marginTop: 20,

    },
    footer: {

        alignItems: 'center',
        justifyContent: 'center',

        height: 40,
        backgroundColor: BGCOLOR,


    }
});