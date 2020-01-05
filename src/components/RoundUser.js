import React, { useState } from "react";
import {
    View,
    Text,
    Image, TouchableOpacity, Animated, Easing, Linking
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { BGCOLOR, FONTCOLOR } from '../Styles/Colors'

const RoundUser = (props) => {
    const [clicked, clickListner] = useState(false)
    const [opacity, opacityChanger] = useState(new Animated.Value(0))

    return (
        <TouchableOpacity style={{ margin: 5, marginLeft: 10 }}
            keyExtractor={(item, index) => String(index)}

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
                <Icon name="ios-phone-portrait" size={35} color="white" style={{}} onPress={() => Linking.openURL(`tel:${props.phoneNumber}`)} />

            </View>}

            <Text style={{
                fontFamily: 'Black', textAlign: 'center',
                textTransform: 'uppercase', color: FONTCOLOR, maxWidth: 100, padding: 3, marginTop: 3
            }}
            >{props.name.replace('<br/>', '\n')}</Text>
        </TouchableOpacity>
    )
}
export default RoundUser;
