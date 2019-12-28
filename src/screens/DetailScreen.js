import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, Image, Dimensions, ScrollView, Animated, ImageBackground
} from "react-native";
import { BGCOLOR, FONTCOLOR } from "../Styles/Colors"
import RoundUser from '../components/RoundUser';
const { height, width } = Dimensions.get('window')

import RoundedButton from '../components/RoundedButton'
import BackButton from '../components/RoundedBackButton'
import Icon from 'react-native-vector-icons/Ionicons';


class DetailScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.scroll = new Animated.Value(0)
        this.state = {
        }
    }

    render() {
        const { navigation } = this.props;
        const imageH = height * 0.5;
        const item = navigation.getParam('item')


        const animImageH = this.scroll.interpolate({
            inputRange: [0, imageH - 60],
            outputRange: [imageH, 60],
            // extrapolate: 'clamp'
        })
        const imageRad = this.scroll.interpolate({
            inputRange: [0, 100],
            outputRange: [40, 0]
        })
        const imageOpa = this.scroll.interpolate({
            inputRange: [0, (imageH - 60) / 2],
            outputRange: [1, 0]
        })
        return (
            <View style={{ flex: 1 }}  >

                <ScrollView style={styles.container}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: this.scroll
                                }
                            }
                        }
                    ])}>
                    <View style={{ flex: 1 }}  >

                        {/* Animated Header start */}
                        <Animated.View style={{ elevation: 5, borderBottomLeftRadius: imageRad, borderBottomRightRadius: imageRad, opacity: imageOpa }}>
                            <Animated.View style={{
                                width: width, height: animImageH, borderBottomLeftRadius: imageRad,
                                borderBottomRightRadius: imageRad, position: 'absolute', top: 0, backgroundColor: 'black', zIndex: 1000
                                , opacity: 0.4
                            }} />
                            <Animated.Image style={{
                                width: width, height: animImageH, borderBottomLeftRadius: imageRad,
                                borderBottomRightRadius: imageRad,
                            }} source={{ uri: item.imageUrl }}
                                resizeMode="cover"
                            />
                            {item.tagline ? <Animated.View style={{
                                width: width, height: animImageH, borderBottomLeftRadius: imageRad,
                                borderBottomRightRadius: imageRad, position: 'absolute', top: 0,
                                backgroundColor: 'transparent', zIndex: 1000, alignItems: 'center'
                                , justifyContent: 'center'
                            }} >
                                <Text style={{
                                    fontFamily: 'Black', color: FONTCOLOR
                                    , position: 'absolute', zIndex: 100000, textTransform: 'uppercase', fontSize: 18
                                }}>It's not just a race</Text>
                            </Animated.View> : null}


                        </Animated.View>
                        {/* Animated Header end */}



                        {/* content section start*/}
                        <View style={{ padding: 15, marginBottom: 0, paddingBottom: 3 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 26, fontFamily: 'Black', color: FONTCOLOR }}>{item.title}</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Icon name="ios-calendar" size={24} color="#E55656" style={{ marginRight: 5 }} onPress={() => alert('Call')} />
                                    <Text style={{ fontSize: 18, fontFamily: 'Black', color: '#E55656', }}>{item.elabDate}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 16, marginTop: 8, fontFamily: 'Light', color: FONTCOLOR }}>{item.details}</Text>
                            {item.rules ?
                                <View>
                                    <Text style={{ fontSize: 18, marginTop: 10, fontFamily: 'Black', color: FONTCOLOR }}>RULES</Text>
                                    <Text style={{ fontSize: 16, marginTop: 8, fontFamily: 'Light', color: FONTCOLOR }}>{item.rules}</Text>
                                </View> : null}


                        </View>
                        {/* content section end*/}



                        {/* Coordinators */}
                        <View style={{ margin: 10, padding: 5, flexDirection: 'row', height: 150, marginBottom: 70, marginTop: 0 }}>
                            {
                                item.volunteers.map((val, index) => {
                                    return (
                                        <RoundUser name={val.name} image={val.imageUrl} index={index} />

                                    )
                                })}
                        </View>
                    </View>

                </ScrollView>


                {/* Buy tickets button */}
                <RoundedButton price="600" />
                <BackButton navigation={navigation} />


            </View>
        );
    }
}
export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BGCOLOR
    }
});