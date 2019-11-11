import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView, Dimensions, Image, Animated
} from "react-native";

const { height, width } = Dimensions.get('window')

class Home extends Component {

    constructor() {
        super();
        this.animatedSlider = new Animated.Value(0);
    }

    componentDidMount() {
        this.sliderAnim()
    }

    sliderAnim = () => {
        Animated.timing(this.animatedSlider, {
            toValue: 80, duration: 800
        }).start()

        setTimeout(() => {
            Animated.timing(this.animatedSlider, {
                toValue: 0, duration: 500
            }).start()
        }, 2000)
    }

    render() {
        return (
            <View style={styles.container}>

                {/* Carousel */}
                <View style={{ height: 230 }}>
                    <Animated.View style={{ position: 'absolute', bottom: 20, right: -10, backgroundColor: '#ee5a5a', zIndex: 2000, width: this.animatedSlider, height: 40, borderTopStartRadius: 18, borderBottomStartRadius: 18, elevation: 2 }}>
                    </Animated.View>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{}}
                        horizontal showsHorizontalScrollIndicator={false} pagingEnabled >
                        <View
                            onTouchStart={() => this.sliderAnim()}
                            style={{ width: width - 20, margin: 10, marginTop: 15, backgroundColor: '#e3e3e3', height: 200, borderRadius: 10, elevation: 2 }}>
                            <Image style={{ flex: 1, borderRadius: 10 }} source={{ uri: 'https://picsum.photos/536/354' }} resizeMode="cover" />
                        </View>
                        <View
                            onTouchStart={() => this.sliderAnim()}
                            style={{ width: width - 20, margin: 10, marginTop: 15, backgroundColor: '#e3e3e3', height: 200, borderRadius: 10, elevation: 2 }}>
                            <Image style={{ flex: 1, borderRadius: 10 }} source={{ uri: 'https://picsum.photos/id/237/536/354' }} resizeMode="cover" />
                        </View>
                        <View
                            style={{ width: width - 20, margin: 10, marginTop: 15, backgroundColor: '#e3e3e3', height: 200, borderRadius: 10, elevation: 2 }}>
                            <Image style={{ flex: 1, borderRadius: 10 }} source={{ uri: 'https://picsum.photos/id/1084/536/354?grayscale' }} resizeMode="cover" />
                        </View>
                    </ScrollView>



                </View>


            </View>
        );
    }
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});