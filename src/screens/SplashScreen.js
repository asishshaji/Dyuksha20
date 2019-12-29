import React, { Component } from "react";
import {
    ImageBackground, View, StatusBar, Alert, ToastAndroid
} from "react-native";

import firebase, { firestore } from 'react-native-firebase';

import { BGCOLOR } from '../Styles/Colors'
import LottieView from 'lottie-react-native';




class SplashScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor() {
        super();
        this.bannerRef = firestore().collection('Banner');
        this.workshops = firestore().collection('Workshop');
        this.events = firestore().collection('Event');
        this.live = firestore().collection('Live');

        this.state = {
            bannerList: [],
            primeEventsList: [],
            liveList: [],
            primeWorkshopList: [],

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

        this.workshops.limit(3).onSnapshot(querySnapshot => {
            this.setState({
                primeWorkshopList: []
            });

            querySnapshot.forEach(doc => {
                this.setState({
                    primeWorkshopList: this.state.primeWorkshopList.concat(doc.data())
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






    }


    render() {
        setTimeout(() => {
            if (this.state.bannerList.length !== 0 &&
                this.state.primeEventsList.length !== 0
                && this.state.primeWorkshopList.length !== 0 && this.state.LiveList.length !== 0) {
                this.props.navigation.replace('Home', {
                    bannerList: this.state.bannerList,
                    primeEventsList: this.state.primeEventsList,
                    LiveList: this.state.liveList,
                    primeWorkshopList: this.state.primeWorkshopList
                })
            }
        }, 300)
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor={BGCOLOR} barStyle="light-content" />
                <ImageBackground source={require('../../assets/logo.png')} style={{ flex: 1, backgroundColor: BGCOLOR }} resizeMode="center" />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView source={require('../../assets/loading.json')}
                        autoPlay loop
                        style={{ height: 100, width: 100, alignSelf: 'center' }}
                    />
                </View>
            </View>)


    }
}
export default SplashScreen;
