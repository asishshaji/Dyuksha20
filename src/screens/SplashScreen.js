import React, { Component } from "react";
import {
    ImageBackground, View, Text
} from "react-native";

import firebase, { firestore } from 'react-native-firebase';

import SvgUri from 'react-native-svg-uri';

import { StackActions, NavigationActions } from 'react-navigation';




class SplashScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor() {
        super();
        this.bannerRef = firestore().collection('Banner');
        this.primeEvents = firestore().collection('PrimeEvents');
        this.events = firestore().collection('Event');

        this.state = {
            bannerList: [],
            primeEventsList: []

        }

    }

    componentDidMount() {
        firebase.auth()
            .signInAnonymously()
            .then(credential => {
                if (credential) {

                }
            });



        this.bannerRef.onSnapshot(querySnapshot => {
            this.setState({
                bannerList: []
            });
            querySnapshot.forEach(doc => {
                this.setState({
                    bannerList: this.state.bannerList.concat(doc.data())
                });
            });
        });


        this.events.limit(5).onSnapshot(querySnapshot => {
            this.setState({
                primeEventsList: []
            });

            querySnapshot.forEach(doc => {
                this.setState({
                    primeEventsList: this.state.primeEventsList.concat(doc.data())
                });
            });
        });



        {/* nav.navigate('Home', { bannerList: this.state.bannerList, primeEventsList: this.state.primeEventsList }) */ }
        setTimeout(() => {
            if (this.state.bannerList.length !== 0 && this.state.primeEventsList.length !== 0) {
                this.props.navigation.replace('Home', { bannerList: this.state.bannerList, primeEventsList: this.state.primeEventsList })
            }
        }, 2000)



    }


    render() {
        return (
            <View style={{ flex: 1 }}>

                <ImageBackground source={require('../../assets/logo.png')} style={{ flex: 1 ,backgroundColor:'#222222'}} resizeMode="center" />
            </View>)


    }
}
export default SplashScreen;
