import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView, Dimensions, Image
} from "react-native";

const { height, width } = Dimensions.get('window')

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>

                {/* Carousel */}

                <ScrollView style={{ flex: 1 }} contentContainerStyle={{}}
                    horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
                    <View style={{ width: width - 20, margin: 10, marginTop: 15, backgroundColor: '#e3e3e3', height: 200, borderRadius: 10, elevation: 2 }}>
                        <Image style={{ flex: 1, borderRadius: 10 }} source={{ uri: 'https://picsum.photos/536/354' }} resizeMode="cover" />
                    </View>
                    <View style={{ width: width - 20, margin: 10, marginTop: 15, backgroundColor: '#e3e3e3', height: 200, borderRadius: 10, elevation: 2 }}>
                        <Image style={{ flex: 1, borderRadius: 10 }} source={{ uri: 'https://picsum.photos/id/237/536/354' }} resizeMode="cover" />
                    </View>
                    <View style={{ width: width - 20, margin: 10, marginTop: 15, backgroundColor: '#e3e3e3', height: 200, borderRadius: 10, elevation: 2 }}>
                        <Image style={{ flex: 1, borderRadius: 10 }} source={{ uri: 'https://picsum.photos/id/1084/536/354?grayscale' }} resizeMode="cover" />
                    </View>
                </ScrollView>

            


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