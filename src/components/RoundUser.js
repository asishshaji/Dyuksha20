import React from "react";
import {
    View,
    Text,
    Image
} from "react-native";

const RoundUser = (props) => (
    <View style={{ margin: 5, marginLeft: 10 }}>
        <View style={{ borderRadius: 100 / 2, elevation: 2, width: 100, height: 100 }}>
            <Image style={{ width: 100, height: 100, borderRadius: 100 / 2 }} source={{ uri: props.image }}
                resizeMode="cover"
            />
        </View>

        <Text  style={{ fontFamily: 'Black', textAlign: 'center' ,textTransform:'uppercase'}}>{props.name}</Text>
    </View>
)
export default RoundUser;
