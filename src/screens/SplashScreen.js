import {
    Alert,
    ImageBackground,
    PermissionsAndroid,
    StatusBar,
    ToastAndroid,
    View
} from "react-native";
import React, { Component } from "react";
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
        this.primeWorkshop = firestore().collection('PrimeWorkshops')
        this.live = firestore().collection('Live');
        this.primeEvents = firestore().collection('PrimeEvents')

        this.state = {
            bannerList: [],
            primeEventsList: [],
            liveList: [],
            primeWorkshopList: [],

        }

    }



    async componentDidMount() {

    

        firebase.auth()
            .signInAnonymously()
            .then(credential => {
                if (credential) {

                }
            });

        firebase.auth().signInAnonymously()
            .then((user) => {
            });

        this.primeEvents.onSnapshot(querySnapshot => {

            querySnapshot.forEach(doc => {
                doc.data().id.get().then((query) => {
                    this.setState({
                        primeEventsList:
                            this.state.primeEventsList.concat(query.data())
                    })
                })
            })

        })

        this.primeWorkshop.onSnapshot(querySnapshot => {

            querySnapshot.forEach(doc => {
                doc.data().id.get().then((query) => {
                    this.setState({
                        primeWorkshopList:
                            this.state.primeWorkshopList.concat(query.data())
                    })
                })
            })

        })



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
                this.props.navigation.replace('Discover', {
                    bannerList: this.state.bannerList,
                    primeEventsList: this.state.primeEventsList,
                    LiveList: this.state.liveList,
                    primeWorkshopList: this.state.primeWorkshopList,

                })

            }
        }, 300)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <StatusBar hidden backgroundColor="transparent" barStyle="light-content" />
                <ImageBackground source={require('../../assets/logo.png')} style={{ width: 250, flex: 1, backgroundColor: BGCOLOR }} resizeMode="center" />
                {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView source={require('../../assets/loading.json')}
                        autoPlay loop
                        style={{ height: 100, width: 100, alignSelf: 'center' }}
                    />
                </View> */}
            </View>)


    }
}
export default SplashScreen;
