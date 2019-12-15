import React, { useState } from "react";
import {
    View,
    Text,
    Image, TouchableOpacity, Animated, Easing
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


const RoundUser = (props) => {
    const [clicked, clickListner] = useState(false)
    const [opacity, opacityChanger] = useState(new Animated.Value(0))

    return (
        <TouchableOpacity style={{ margin: 5, marginLeft: 10 }}
            onPress={() => {
                if (clicked) {
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 300
                    }).start();
                }
                else {
                    Animated.timing(opacity, {
                        toValue: 0.6,
                        duration: 300
                    }).start();
                }

                clickListner(!clicked)
            }}
            activeOpacity={1}>
            <View style={{ borderRadius: 100 / 2, elevation: 2, width: 100, height: 100 }}>
                <Image style={{ width: 100, height: 100, borderRadius: 100 / 2 }} source={{ uri: props.image }}
                    resizeMode="cover"
                />
            </View>

            <Animated.View style={{
                borderRadius: 100 / 2, elevation: 2,
                width: 100, height: 100,
                position: 'absolute', top: 0, backgroundColor: 'black',
                opacity: opacity,
            }} >
            </Animated.View>
            {clicked && <View style={{
                borderRadius: 100 / 2, elevation: 2,
                width: 100, height: 100,
                position: 'absolute', top: 0,
                alignItems: 'center', justifyContent: 'center'
            }}>
                <Icon name="ios-phone-portrait" size={32} color="white" style={{}} onPress={() => alert('Call')} />

            </View>}

            <Text style={{ fontFamily: 'Black', textAlign: 'center', textTransform: 'uppercase' }}>{props.name}</Text>
        </TouchableOpacity>
    )
}
export default RoundUser;
