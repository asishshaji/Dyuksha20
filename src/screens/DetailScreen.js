import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, Image, Dimensions, ScrollView, Animated, ImageBackground
} from "react-native";
import { BGCOLOR, FONTCOLOR, ICONCOLOR } from "../Styles/Colors"
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
        const navToday = navigation.getParam('navToday', {})

        const animImageH = this.scroll.interpolate({
            inputRange: [0, imageH - 60],
            outputRange: [imageH, 100],
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
                    <View style={{ flex: 1, paddingBottom: 60 }}  >

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
                                    fontFamily: 'Black', color: "#fff"
                                    , position: 'absolute', zIndex: 100000, textTransform: 'uppercase', fontSize: 18, textAlign: 'center'
                                }}>{item.tagline}</Text>

                            </Animated.View> : null}


                        </Animated.View>
                        {/* Animated Header end */}



                        {/* content section start*/}
                        <View style={{ padding: 15, marginBottom: 0, paddingBottom: 3 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{
                                    fontSize: 26, fontFamily: 'Black',
                                    color: FONTCOLOR, maxWidth: width / 2 + 40, textTransform: 'capitalize'
                                }}>{item.title}</Text>

                                <View style={{marginTop:4, flexDirection: 'row', }}>
                                    <Icon name="ios-calendar" size={24} color="#E55656" style={{ marginRight: 5 }} onPress={() => console.log('date pressed')} />
                                    <View>
                                        <Text style={{marginTop:3, fontSize: 18, fontFamily: 'Black', color: '#E55656', textAlign: 'right' }}>{item.elabDate}</Text>
                                        <Text style={{ fontSize: 16, fontFamily: 'Black', color: ICONCOLOR, textAlign: 'right' }}>{item.time}</Text>
                                    </View>

                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="ios-pin" size={24} color="#E55656" style={{ marginRight: 5, }} onPress={() => console.log('location pressed')} />
                                <Text style={{ fontSize: 18, marginTop: 8, fontFamily: 'Black', color: FONTCOLOR }}>{item.location}</Text>
                            </View>

                            <Text style={{textAlign:'auto', fontSize: 16, marginTop: 8, fontFamily: 'Light', color: FONTCOLOR }}>{item.details.replace(/BLL/gi, '\n')}</Text>

                            {item.rules ?
                                <View>
                                    <Text style={{ fontSize: 18, marginTop: 10, fontFamily: 'Black', color: FONTCOLOR }}>RULES</Text>
                                    <Text style={{textAlign:'auto', fontSize: 16, marginTop: 8, fontFamily: 'Light', color: FONTCOLOR }}>{item.rules.replace(/BLL/gi, '\n')}</Text>
                                </View> : null}


                        </View>
                        {/* content section end*/}



                        {/* Coordinators */}

                        <View style={{padding:15}}>
                            <Text style={{ fontSize: 18, marginTop: 10, fontFamily: 'Black', color: FONTCOLOR }}>
                                CONTACT
                            </Text>
                        </View>

                        <View style={{  padding: 5,  marginBottom: 70, marginTop: 3 }}>
                            {
                                item.volunteers.map((val, index) => {
                                    return (

                                        <RoundUser name={val.name} image={val.imageUrl} index={index} phoneNumber={val.phoneNumber} />

                                    )
                                })}
                        </View>
                    </View>

                </ScrollView>


                {/* Buy tickets button */}
                <RoundedButton price={item.amount ? item.amount : "0"} reglink={item.reglink ? item.reglink : "https://dyuksha.org/"} />
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