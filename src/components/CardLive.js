import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { BGCOLOR, FONTCOLOR } from "../Styles/Colors";
import { PinchGestureHandler, State } from 'react-native-gesture-handler'
import React, { Component } from "react";

import moment from 'moment';

const { height, width } = Dimensions.get('window')

export default class CardLive extends Component {


    scale = new Animated.Value(1)

    onZoomEvent = Animated.event(
        [
            {
                nativeEvent: { scale: this.scale }
            }
        ],
        {
            useNativeDriver: true
        }
    )

    onZoomStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(this.scale, {
                toValue: 1,
                useNativeDriver: true
            }).start()
        }
    }

    render() {
        const item = this.props.item;
        var timestamp = moment(new Date(this.props.timestamp * 1000)).format('DD/MM  ');

        return (
            <TouchableOpacity onPress={() => { if (this.props.nav) { this.props.nav.navigate('LiveNow') } }} activeOpacity={1}>
                <View style={{
                    alignItems: 'center',
                    margin: 10,
                    borderRadius: 8,
                    borderWidth: 0,
                    height: 300,
                    width: this.props.width,
                    elevation: 6,
                    marginTop: 10,
                }}>
                    <View style={{
                        flex: 1,
                        borderRadius: 8,
                        borderWidth: 0,
                        height: 300,
                        width: this.props.width,
                    }}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardTitle}>
                                <Text style={{
                                    fontSize: 13, fontFamily: 'Black',
                                    color: FONTCOLOR
                                }}>{this.props.cardTitle}</Text>
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{ fontSize: 12, color: 'grey' }}>{this.props.time}</Text>
                                <Text style={{ fontSize: 12, color: 'grey' }}>{this.props.date}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cardContent}>
                            <PinchGestureHandler
                                onGestureEvent={this.onZoomEvent}
                                onHandlerStateChange={this.onZoomStateChange}>
                                <Animated.Image
                                    style={{
                                        flex: 1,
                                        resizeMode: 'contain',
                                        transform: [{ scale: this.scale }]
                                    }}
                                    source={{ uri: this.props.imageUrl }}
                                    resizeMode={'contain'} />
                            </PinchGestureHandler>
                        </View>
                    </View>


                </View>

            </TouchableOpacity>
        );
    }
}



const styles = StyleSheet.create({

    cardHeader: {
        borderWidth: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 50,
        justifyContent: 'center',
        padding: 5,
        backgroundColor: BGCOLOR
    },
    cardTitle: {
        padding: 5,
        minWidth: 50
    },
    cardContent: {
        flex: 1,
        padding: 2,
        backgroundColor: 'white',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },

});