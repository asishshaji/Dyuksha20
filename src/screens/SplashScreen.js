import React, { Component } from "react";
import {
    ImageBackground, View, Text
} from "react-native";

import firebase, { firestore } from 'react-native-firebase';

import { BGCOLOR } from '../Styles/Colors'




class SplashScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor() {
        super();
        this.bannerRef = firestore().collection('Banner');
        this.primeEvents = firestore().collection('PrimeEvents');
        this.events = firestore().collection('Event');
        this.live = firestore().collection('Live');

        this.state = {
            bannerList: [],
            primeEventsList: [],
            liveList: [],

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

        this.live.limit(2).onSnapshot(querySnapshot => {
            this.setState({
                LiveList: []
            });

            querySnapshot.forEach(doc => {
                this.setState({
                    LiveList: this.state.LiveList.concat(doc.data())
                });
            });
        });


        {/* nav.navigate('Home', { bannerList: this.state.bannerList, primeEventsList: this.state.primeEventsList }) */ }
        setTimeout(() => {
            if (this.state.bannerList.length !== 0 && this.state.primeEventsList.length !== 0) {
                this.props.navigation.replace('Home', {
                    bannerList: this.state.bannerList,
                    primeEventsList: this.state.primeEventsList,
                    LiveList:this.state.liveList
                })
            }
        }, 2000)



    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={require('../../assets/logo.png')} style={{ flex: 1, backgroundColor: BGCOLOR }} resizeMode="center" />
            </View>)


    }
}
export default SplashScreen;
