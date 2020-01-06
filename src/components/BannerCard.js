import React from "react";
import {
    View,
    Image,
    Text
} from "react-native";

const Banner = (props) => (
    <View
        style={{
            width: props.width - 20, margin: 10, marginTop: 0,
            backgroundColor: '#e3e3e3', height: props.sliderH - 25,
            borderRadius: 12, elevation: 9, marginTop: 5
        }}>
        <Image style={{ flex: 1, borderRadius: 12 }}
            source={{ uri: props.imageUrl }} resizeMode="cover" />
        <Text style={{
            fontFamily: 'Black', position: 'absolute', bottom: 30,
            color: '#fff', fontSize: 22, padding: 5,
            maxHeight: props.sliderH - 25,
            minWidth: props.width - 20, alignSelf: 'center', textAlign: 'right'
        }}>{props.title}</Text>
    </View>
)
export default Banner;
