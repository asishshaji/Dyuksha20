import {
    Animated,
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import { BGCOLOR, FONTCOLOR } from "../Styles/Colors";
import { PinchGestureHandler, State } from 'react-native-gesture-handler'
import React, { Component } from "react";

import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const { height, width } = Dimensions.get('window')


export default class CardLive extends Component {


    scale = new Animated.Value(1)
    state = {
        clicked: false
    }

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
        var timestamp = moment(new Date(this.props.timestamp * 1000)).format('hh:mm a  ');
        var timestampDate = moment(new Date(this.props.timestamp * 1000)).format('DD/MM  ');


        return (
            <TouchableOpacity onPress={() => { if (this.props.nav) { this.props.nav.navigate('LiveNow') } }} activeOpacity={1}>
                <View style={{
                    alignItems: 'center',
                    margin: 5,
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
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12, color: 'grey' }}>{this.props.time ? this.props.time : timestamp}</Text>
                                    <Text style={{ fontSize: 12, color: 'grey' }}>{this.props.date ? this.props.date : timestampDate}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.cardContent} onPress={() => this.setState({
                            clicked: !this.state.clicked
                        })} activeOpacity={1}>

                            <Image
                                style={{
                                    flex: 1,
                                    resizeMode: 'contain',

                                }}
                                source={{ uri: this.props.imageUrl }}
                                resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>


                </View>

                <Modal animationType="fade"
                    transparent={false}
                    onRequestClose={() => {
                        this.setState({
                            clicked: !this.state.clicked
                        })
                    }}
                    visible={this.state.clicked}>
                    <View style={{ flex: 1 }}>
                        <Image
                            style={{
                                flex: 1,
                                resizeMode: 'contain',
                            }}
                            source={{ uri: this.props.imageUrl }}
                            resizeMode={'contain'} />
                    </View>
                    <View style={{ position: 'absolute', left: -10 }}>

                        <TouchableOpacity style={{
                            position: 'absolute', top: 15, left: 16, elevation: 4, height: 50, width: 50,
                            backgroundColor: 'white', justifyContent: 'center',
                            alignItems: 'center', borderRadius: 50 / 2
                        }}
                            onPress={() => this.setState({
                                clicked: !this.state.clicked
                            })} activeOpacity={1}>
                            <Icon name="ios-arrow-back" size={30} color="#E55656" />
                        </TouchableOpacity>
                    </View>
                </Modal>


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
        backgroundColor: BGCOLOR,
        borderColor: '#ededed',
        borderBottomWidth: 1
    },
    cardTitle: {
        padding: 5,
        minWidth: 50
    },
    cardContent: {
        flex: 1,

        backgroundColor: 'white',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },

});