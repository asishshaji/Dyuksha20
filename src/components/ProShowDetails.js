import {
    Dimensions,
    Image,
    Text,
    View
} from "react-native";

import React from "react";

const { width, height } = Dimensions.get('window')

const ProShowDetails = (props) => (
    <View style={{ flex: 1 }}>
        <Image source={{
            uri: props.imageUrl
        }}
            style={{ flex: 1, height: null, width: null, resizeMode: 'cover' }} />
        <View style={{
            position: 'absolute', top: 0, left: 0, backgroundColor: 'black',
            height: height, width: width, opacity: 0.7
        }} />
        <View style={{ position: 'absolute', alignItems: 'flex-start', left: 0, right: 0, zIndex: 1000000, padding: 10, height: height / 2, bottom: 5, paddingBottom: 10, justifyContent: 'flex-end' }}>
            <Text style={{ fontFamily: 'Black', fontSize: 24, color: 'white', textTransform: 'uppercase' }}>{props.day}</Text>
            <Text style={{ fontFamily: 'Black', fontSize: 24, color: 'white', textTransform: 'uppercase' }}>{props.title}</Text>
            <Text style={{ fontFamily: 'Light', fontSize: 16, color: 'white' }}>{props.details}</Text>

        </View>
    </View>
)
export default ProShowDetails;

