import "moment/locale/nl-be"

import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import React, { Component } from "react";
import firebase, { firestore } from 'react-native-firebase';

import { BGCOLOR } from "../../Styles/Colors";
import EventCard from '../../components/CardHome'
import LottieView from 'lottie-react-native';
import moment from 'moment';

const { height, width } = Dimensions.get('window')


class Today extends Component {


    constructor(props) {
        super(props);
        this.events = firestore().collection('Common');
        this.state = {
            TodayList: [],
        };
    }

    componentDidMount() {
        moment.locale('nl-be');
        var date = moment().format('L');
        this.events.where("elabDate", "==", date).onSnapshot(querySnapshot => {
            this.setState({
                TodayList: []
            });

            querySnapshot.forEach(doc => {
                this.setState({
                    TodayList: this.state.TodayList.concat(doc.data())
                });
            });
        });
    }

    render() {
        const nav = this.props.navigation;


        return (
            <ScrollView style={{ backgroundColor: BGCOLOR, }} contentContainerStyle={{ alignItems: 'center' }} >

                <View style={{ justifyContent: 'center', }}>
                    {this.state.TodayList.length === 0 ?
                        <View style={{ flex: 1, justifyContent: 'center', height: height - 300 }}>
                            <View >
                                <LottieView source={require('../../../assets/today.json')}
                                    autoPlay loop
                                    style={{ justifyContent: 'center', height: 100, width: 100, alignSelf: 'center' }}
                                />
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 15, fontFamily: "Light" }}>Will be updated soon...</Text>
                            </View>
                        </View>

                        :
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={false}
                            numColumns={2}
                            data={this.state.TodayList}
                            renderItem={({ item, index }) => (
                                <View style={{}}>
                                    <EventCard
                                        nav={nav}
                                        height={100}
                                        width={width / 2 - 20}
                                        item={item}
                                    />
                                </View>
                            )}
                        />
                    }

                </View>
            </ScrollView>
        );
    }

    renderList(item, index) {

        return (
            <TouchableWithoutFeedback>
                <View style={{}}>
                    <EventCard
                        nav={navigate}
                        height={100}
                        width={width / 2 - 40}
                        item={item}
                    />

                </View>
            </TouchableWithoutFeedback>
        );
    }

}

export default Today;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    }
});