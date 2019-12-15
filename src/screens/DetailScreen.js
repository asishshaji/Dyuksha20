import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, Image, Dimensions, ScrollView, Animated, TouchableOpacity
} from "react-native";
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

        const animImageH = this.scroll.interpolate({
            inputRange: [0, imageH - 60 / 2],
            outputRange: [imageH, 60],
            extrapolate: 'clamp'
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
            <View style={{ flex: 1 }}>

                <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{}} onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                y: this.scroll
                            }
                        }
                    }
                ])}>
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
                        }} source={{ uri: navigation.getParam('image') }}
                            resizeMode="cover"
                        />
                    </Animated.View>
                    {/* Animated Header end */}



                    {/* content section start*/}
                    <View style={{ padding: 15, marginBottom: 0 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 26, fontFamily: 'Black' }}>{navigation.getParam('title')}</Text>
                            <View style={{ flexDirection: 'row',}}>
                                <Icon name="ios-calendar" size={24} color="#E55656" style={{marginRight:5}} onPress={() => alert('Call')} />
                                <Text style={{ fontSize: 18, fontFamily: 'Black', color: '#E55656' }}>12/12/20</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 16, marginTop: 8, fontFamily: 'Light' }}>
                            Qui ad consequat ut aliquip duis officia et reprehenderit dolore minim reprehenderit ea elit pariatur. Sunt excepteur consectetur sit mollit ad. Minim anim tempor mollit excepteur ullamco mollit. Ea eu ipsum ullamco labore deserunt adipisicing. Eiusmod mollit enim culpa veniam exercitation exercitation aliqua cillum veniam anim. Nulla commodo anim occaecat ullamco laborum ullamco reprehenderit irure.
                                Incididunt est officia adipisicing nisi fugiat officia consectetur eiusmod sint do fugiat laborum eiusmod reprehenderit.
                            Aliquip in nulla aliquip sit non aliqua ut est amet sint laborum do ex. Commodo sint occaecat voluptate enim cillum labore dolore cillum. Ut aliqua officia proident et. Aute occaecat nostrud id aliqua duis esse adipisicing dolor minim. Ea minim reprehenderit consectetur reprehenderit nulla reprehenderit.</Text>
                    </View>
                    {/* content section end*/}



                    {/* Coordinators */}
                    <View style={{ margin: 10, padding: 5, flexDirection: 'row', height: 150, marginBottom: 70 }}>
                        <RoundUser name="Asish" image="https://picsum.photos/536/354" />
                        <RoundUser name="Shaji" image="https://picsum.photos/id/1084/536/354" />
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
        backgroundColor: 'white',
    }
});