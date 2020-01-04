import { BGCOLOR, FONTCOLOR, FONTCOLORWHITE, ICONCOLOR } from "../Styles/Colors"
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import React, { Component } from "react";

import LottieView from 'lottie-react-native';
import { firestore } from 'react-native-firebase';

const { height, width } = Dimensions.get('window')
class Notifications extends Component {
    static navigationOptions = {
        header: null,
    }

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
        const nav = this.props.navigation;
        return (
            <View style={styles.container}>


                {this.state.notList.length === 0 ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <LottieView source={require('../../assets/no-notifications.json')}
                            autoPlay loop
                            style={{ height: 100, width: 100, alignSelf: 'center' }}
                        />
                    </View>
                    :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={16}
                        ListFooterComponent={() =>
                            <View style={{ padding: 10, paddingTop: 22 }}>
                                <Text style={{ textAlign: 'right', fontFamily: 'Black', fontSize: 30, color: ICONCOLOR }}>Notifications</Text>
                            </View>
                        }
                        contentContainerStyle={{ flexDirection: 'column-reverse', paddingBottom: 90 }}
                        keyExtractor={(item, index) => String(index)}
                        data={this.state.notList}
                        renderItem={({ item }) => (
                            <View style={{ margin: 5, marginLeft: 10, marginRight: 10, backgroundColor: BGCOLOR, borderRadius: 10, elevation: 4, minHeight: 100, padding: 12 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ color: FONTCOLOR, fontFamily: 'Black', fontSize: 20 }}>{item.Title}</Text>
                                    <Text style={{ color: FONTCOLOR, fontFamily: 'Light', fontSize: 14, alignSelf: 'center' }}>{item.date.replace("/2020", "")}</Text>
                                </View>
                                <View>

                                    <Text style={{ color: FONTCOLOR, fontFamily: 'Light', fontSize: 16 }}>{item.Body}</Text>
                                    {
                                        item.imageUrl.length === 0 ? null
                                            :
                                            <View style={{alignItems:'center'}}>
                                                <Image source={{uri:item.imageUrl}} style={{  height: 250, width: width-40, resizeMode:'contain' }}  />
                                            </View>
                                    }
                                    <Text style={{ color: FONTCOLOR, fontFamily: 'Light', fontSize: 16, textAlign: 'right' }}>{item.time}</Text>
                                </View>
                            </View>
                        )}
                    />}
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