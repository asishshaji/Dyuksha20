import React from "react";
import {
    View,
    Image,
} from "react-native";

const Banner = (props) => (
    <View
        style={{
            width: props.width - 20, margin: 10, marginTop: 0,
            backgroundColor: '#e3e3e3', height: props.sliderH - 25,
            borderRadius: 12, elevation: 4, marginTop: 5
        }}>
        <Image style={{ flex: 1, borderRadius: 12 }}
            source={{ uri: props.imageUrl }} resizeMode="cover" />
    </View>
)
export default Banner;
