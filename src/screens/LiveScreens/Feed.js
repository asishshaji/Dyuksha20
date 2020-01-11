import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Linking,
    StyleSheet,
    Text,
    View
} from "react-native";
import { BGCOLOR, FONTCOLOR, ICONCOLOR } from "../../Styles/Colors"
import React, { Component } from "react";
import firebase, { firestore } from 'react-native-firebase';

import Axios from 'axios';
import BackButton from '../../components/RoundedBackButton';
import CardLive from "../../components/CardLive";
import Icon from 'react-native-vector-icons/Ionicons';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get('window')


const openLink = async (url) => {
    try {
        if (await InAppBrowser.isAvailable()) {
            const result = await InAppBrowser.open(url, {
                // Android Properties
                showTitle: true,
                toolbarColor: BGCOLOR,
                secondaryToolbarColor: 'black',
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                },
                headers: {
                    'my-custom-header': 'my custom header value'
                }
            })
        }
        else Linking.openURL(url)
    } catch (error) {
    }
}


class Feed extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.events = firestore().collection('Live');
        this.state = {
            isLoading: true,
            LiveList: [],
            refreshing: false
        }
    }

    async instagramPhotos() {
        // It will contain our photos' links
        const res = []

        try {
            const userInfoSource1 = await Axios.get('https://www.instagram.com/dyuksha20/')
            const userInfoSource2 = await Axios.get('https://www.instagram.com/d20.mixtape/')
            // userInfoSource.data contains the HTML from Axios
            const jsonObject1 = userInfoSource1.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)
            const jsonObject2 = userInfoSource2.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)


            const userInfo1 = JSON.parse(jsonObject1)
            const userInfo2 = JSON.parse(jsonObject2)
            // Retrieve only the first 10 results
            const mediaArray1 = userInfo1.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 7).reverse()
            const mediaArray2 = userInfo2.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 15).reverse()

            for (let media1 of mediaArray1) {
                const node1 = media1.node
                // Process only if is an image
                // Push the thumbnail src in the array
                res.push(node1)
            }
            for (let media2 of mediaArray2) {
                const node2 = media2.node
                // Process only if is an image
                // Push the thumbnail src in the array
                res.push(node2)
            }
        } catch (e) {
            // console.error('Unable to retrieve photos. Reason: ' + e.toString())
        }

        this.setState({
            LiveList: res,
            isLoading: false,
            refreshing: false
        });
        return res
    }

    async componentDidMount() {
        //this.makeRequest();
        this.instagramPhotos();
    }

    async componentDidUpdate() {
        //this.makeRequest();
        this.instagramPhotos();
    }


    render() {

        const { navigation } = this.props;

        return (
            <View style={{ flex: 1, backgroundColor: BGCOLOR, }}>

                {this.state.LiveList.length === 0 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems:'center' }}>
                        <LottieView source={require('../../../assets/loading.json')}
                            autoPlay loop
                            style={{ height: 100, width: 100,  }}
                        />
                        <View>
                        <Text style={{alignSelf:'center', fontSize: 15, fontFamily: "Light" }}>   Will be updated soon...</Text>
                        </View>
                    </View>
                    :
                    <View style={{ flex: 1, }}>

                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ flexDirection: 'column-reverse', paddingBottom: 18, paddingTop: 15, }}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            numColumns={1}
                            data={this.state.LiveList}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => this.renderList(item, index)}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}

                            ListFooterComponent={
                                <View style={{ padding: 10, }}>
                                    <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: 'Black', color: ICONCOLOR, }}>
                                        Insta Posts
                                     </Text>

                                </View>
                            }

                            ListHeaderComponent={
                                <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <Icon name="logo-instagram" size={20} color={FONTCOLOR} style={{ padding: 5 }} onPress={() => Linking.openURL('https://www.instagram.com/d20.mixtape/')} />
                                        <Text style={{ color: FONTCOLOR, fontSize: 12, fontFamily: 'Light' }} onPress={() => Linking.openURL('https://www.instagram.com/d20.mixtape/')} >
                                            @dyuksha20
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <Icon name="logo-instagram" size={20} color={FONTCOLOR} style={{ padding: 5 }} onPress={() => Linking.openURL('https://www.instagram.com/d20.mixtape/')} />
                                        <Text style={{ color: FONTCOLOR, fontSize: 12, fontFamily: 'Light' }} onPress={() => Linking.openURL('https://www.instagram.com/d20.mixtape/')} >
                                            @d20.mixtape
                                        </Text>
                                    </View>
                                </View>
                            }
                        />
                    </View>
                }


                <View style={{ position: 'absolute', left: -10 }}>
                    <BackButton navigation={navigation} />
                </View>

            </View>
        );
    }

    renderList(item, index) {

        if (item.owner)
            return (
                <View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => openLink('https://www.instagram.com/p/' + item.shortcode)}>
                        <CardLive
                            width={width - 10}
                            cardTitle={item.owner.username}
                            imageUrl={item.display_url}
                            like={item.edge_liked_by.count}

                        />
                    </TouchableOpacity>
                    <View style={styles.cardFooter}>
                        <Text style={{ fontFamily: 'Black', paddingLeft: 5 }}>
                            {item.edge_liked_by.count} likes
                    </Text>

                    </View>

                </View>

            );
        else
            return null
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true,
        }, () => {
            this.instagramPhotos();
        })
    }


}
export default Feed;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: BGCOLOR
    },
    contentContainer: {
        marginTop: 15,
        flex: 1,
        backgroundColor: BGCOLOR, //'white',

    },
    headerBg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BGCOLOR,
        height: 50,
    },
    cardFooter: {
        paddingLeft: 10,
        flexDirection: 'row',

        elevation: 5,
        height: 30,
        width: width - 10
    },

});