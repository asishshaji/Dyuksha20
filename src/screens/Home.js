import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { BGCOLOR, FONTCOLOR, ICONCOLOR, TITLECOLOR } from "../Styles/Colors"
import React, { Component } from "react";
import firebase, { Notification, RemoteMessage, firestore } from 'react-native-firebase'

import BannerCard from '../components/BannerCard'
import CardLive from "../components/CardLive";
import EventCard from '../components/CardHome';
import FloatingButton from "../components/FloatingButton";
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

const { height, width } = Dimensions.get('window')



class Home extends Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.live = firestore().collection('Live');
        this.state = {
            LiveList: [],
            roundClicked: false
        }
        this.animatedSlider = new Animated.Value(0);

    }

    async componentDidMount() {
        this.sliderAnim();
        firebase
            .messaging()
            .getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    firebase
                        .firestore()
                        .collection("FCMTOKENS")
                        .doc(fcmToken)
                        .set({
                            token: fcmToken
                        });
                } else {
                    // user doesn't have a device token yet
                }
            });
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
        } else {
            try {
                await firebase.messaging().requestPermission();
            } catch (error) {
            }
        }

        // messages are invoked when the app is in background or closed
        this.messageListener = firebase
            .messaging()
            .onMessage((message: RemoteMessage) => {
            });

        this.removeNotificationListener = firebase
            .notifications()
            .onNotification((notification: Notification) => {
                // Process your notification as required
                const localnotification = new firebase.notifications.Notification()
                    .setNotificationId(notification._notificationId)
                    .setTitle(notification._title)
                    .setBody(notification._body)
                    .android.setChannelId("Dyuksha").android.setSmallIcon('ic_launcher');
                firebase.notifications().displayNotification(localnotification);
            });

        this.live.limit(3).onSnapshot(querySnapshot => {
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
    componentWillUnmount() {
        // this.unsubscribe();
        this.messageListener();
        this.removeNotificationListener();

    }




    sliderAnim = () => {
        Animated.timing(this.animatedSlider, {
            toValue: 85, duration: 1000
        }).start()

        setTimeout(() => {
            Animated.timing(this.animatedSlider, {
                toValue: 0, duration: 500
            }).start()
        }, 4000)
    }
    render() {
        const sliderH = height * 0.39;
        const nav = this.props.navigation;
        const { navigate } = this.props.navigation;

        console.disableYellowBox = true;

        const primeEventsList = this.props.navigation.getParam('primeEventsList', {})
        const bannerList = this.props.navigation.getParam('bannerList', {})
        const primeWorkshopList = this.props.navigation.getParam('primeWorkshopList', {})



        return (

            <View style={{ flex: 1,  }}>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{marginTop:5, paddingBottom: 100 }}>

                    <StatusBar hidden backgroundColor="transparent" barStyle="light-content" />
                    <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <View style={{ width: 200, alignItems: 'center', flexDirection: 'row' }} >

                            <Text style={{ fontSize: 35, fontFamily: 'Black', color: ICONCOLOR }}>
                                Discover
                                </Text>
                        </View>
                    </View>

                    {/* Carousel */}
                    <View style={{ height: sliderH }}>
                        <Animated.View style={{
                            elevation: 5, position: 'absolute',
                            bottom: 45, right: -20, backgroundColor: '#fff', zIndex: 2000,
                            width: this.animatedSlider, height: 45,
                            borderRadius: 45 / 2, justifyContent: 'center', padding: 10
                        }}>
                            <Icon name="ios-arrow-back" size={30} color="#E55656" style={{ marginLeft: 5}} />

                        </Animated.View>
                        <FlatList style={{ flex: 1, width: width, }} contentContainerStyle={{

                        }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            keyExtractor={(item, index) => String(index)}
                            data={bannerList}
                            renderItem={({ item }) => (
                                <BannerCard
                                    imageUrl={item.imageUrl}
                                    width={width}
                                    title={item.title}
                                    sliderH={sliderH}
                                />
                            )} />
                    </View>



                    <View style={{ height: 270, marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginLeft: 10, fontSize: 24, fontFamily: 'Black', color: TITLECOLOR, }}>Main Events</Text>
                            <TouchableOpacity onPress={() => navigate('Select', {
                                'name': 'EVENTS',
                                'DB': 'DepEvents', 'DOCNAME': 'eventsDoc'
                            })} activeOpacity={1}>
                                <View style={{}}>
                                    <Text style={{
                                        paddingRight: 5, paddingTop: 6, fontFamily: "Black",
                                        fontSize: 16, color: ICONCOLOR,
                                    }} >See All</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            keyExtractor={(item, index) => String(index)}
                            data={primeEventsList}
                            renderItem={({ item }) => (
                                <EventCard
                                    nav={nav}
                                    height={200}
                                    width={width / 2 - 40}
                                    item={item}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.workshopContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ paddingLeft: 10, width: 230, fontSize: 24, fontFamily: 'Black', color: TITLECOLOR, }}>
                                Workshops
                        </Text>
                            <TouchableOpacity onPress={() => navigate('Select', {
                                'name': 'WORKSHOPS',
                                'DB': 'DepWorkshops', 'DOCNAME': 'workshopsDoc'
                            })} activeOpacity={1}>
                                <View style={{ flex: 1, paddingTop: 6 }}>
                                    <Text style={{ paddingRight: 5, fontFamily: "Black", fontSize: 16, color: ICONCOLOR, }} >See All</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            keyExtractor={(item, index) => String(index)}
                            data={primeWorkshopList}
                            renderItem={({ item }) => (
                                <EventCard
                                    nav={nav}
                                    height={200}
                                    width={width / 2 - 40}
                                    item={item}
                                />
                            )}
                        />

                    </View>

                    <View style={{ marginTop: 15, backgroundColor: BGCOLOR, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.TitleNow}>
                                <Text style={{ fontSize: 25, fontFamily: 'Black', color: FONTCOLOR }}>
                                    See what's happening now.
                            </Text>
                            </View>

                            <View style={{ backgroundColor: BGCOLOR, }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('LiveNow', {})} >
                                    <View style={{ paddingTop: 16, backgroundColor: BGCOLOR, }}>
                                        <Text style={{ color: ICONCOLOR, fontFamily: "Black", fontSize: 16, paddingRight: 5, }}>See All</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.nowCard}>
                            {this.state.LiveList.length === 0 ?
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <LottieView source={require('../../assets/now.json')}
                                        autoPlay loop
                                        style={{ height: 100, width: 100, alignSelf: 'center' }}
                                    />
                                </View>
                                :
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    numColumns={1}
                                    contentContainerStyle={{flexDirection:"row-reverse", paddingRight: 10 }}
                                    data={this.state.LiveList}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item, index }) => (
                                        <TouchableWithoutFeedback>
                                            <CardLive
                                                nav={nav}
                                                width={width - 50}
                                                cardTitle={item.title}
                                                imageUrl={item.imageUrl}
                                                time={item.time}
                                            />
                                        </TouchableWithoutFeedback>)}
                                />
                            }
                        </View>
                    </View>
                </ScrollView>

                <View style={{ position: "absolute", top: 10, right: 10 }}>
                    <FloatingButton style={{ alignItems: 'center', }} nav={nav} />
                </View>

            </View>

        );
    }
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BGCOLOR,

    }, TitleWorkshop: {
        backgroundColor: BGCOLOR,
        padding: 10
    }, workshopContainer: {
        flex: 1,
        flexDirection: 'column',
        width: width,
        // backgroundColor: BGCOLOR,
    },
    TitleNow: {
        paddingLeft: 10,
        paddingTop: 10,
        maxWidth: width - 80,
        borderBottomColor: 'white',
        // borderWidth:1,
        backgroundColor: BGCOLOR,

    },
    nowCard: {
        backgroundColor: BGCOLOR,
        minHeight: 300
        // paddingLeft: 5
    },
});