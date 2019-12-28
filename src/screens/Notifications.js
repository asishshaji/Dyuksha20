import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList, ScrollView
} from "react-native";
import { BGCOLOR, FONTCOLOR, FONTCOLORWHITE } from "../Styles/Colors"
import LottieView from 'lottie-react-native';

import { firestore } from 'react-native-firebase';

class Notifications extends Component {

    constructor() {
        super();
        this.notRef = firestore().collection('Notification');
        this.state = {
            notList: []
        }
    }

    componentDidMount() {
        this.notRef.onSnapshot(q => {
            this.setState({
                notList: []
            })
            q.forEach(doc => {
                this.setState({
                    notList: this.state.notList.concat(doc.data())
                })
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, }}>
                    <View style={{ padding: 10, }}>
                        <Text style={{ fontFamily: 'Black', fontSize: 30, color: FONTCOLOR }}>Notifications</Text>
                    </View>

                    {this.state.notList.length === 0 ?
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <LottieView source={require('../../assets/loading.json')}
                                autoPlay loop
                                style={{ height: 100, width: 100, alignSelf: 'center' }}
                            />
                        </View>
                        :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            contentContainerStyle={{ paddingBottom: 90 }}
                            keyExtractor={(item, index) => String(index)}
                            data={this.state.notList}
                            renderItem={({ item }) => (
                                <View style={{ margin: 5, marginLeft: 10, marginRight: 10, backgroundColor: '#1f1e1e', borderRadius: 10, elevation: 10, minHeight: 100, padding: 12 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ color: FONTCOLOR, fontFamily: 'Black', fontSize: 26 }}>{item.Title}</Text>
                                        <Text style={{ color: FONTCOLOR, fontFamily: 'Black', fontSize: 16, alignSelf: 'center' }}>{item.date}</Text>
                                    </View>
                                    <View>

                                        <Text style={{ color: FONTCOLOR, fontFamily: 'Light', fontSize: 16 }}>{item.Body}</Text>
                                        <Text style={{ color: FONTCOLOR, fontFamily: 'Black', fontSize: 16, textAlign: 'right' }}>{item.time}</Text>
                                    </View>
                                </View>
                            )}
                        />}
                </View>
            </View>
        );
    }
}
export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BGCOLOR,

    }
});