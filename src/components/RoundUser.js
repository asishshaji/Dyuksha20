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
        <TouchableOpacity style={{flexDirection:'row', alignItems: 'center', margin: 7, marginLeft: 10 }}
            keyExtractor={(item, index) => String(index)}
            onPress={() => Linking.openURL(`tel:${props.phoneNumber}`)}
            activeOpacity={1}>



            <Icon name="ios-phone-portrait" size={35} color="black" style={{}}  />


           
                <Text style={{
                    fontFamily: 'Black', textAlign: 'center', padding:5,

                    textTransform: 'uppercase', color: FONTCOLOR, marginTop: 6
                }}
                >{props.name.replace('<br/>', '\n')}</Text>
         

        </TouchableOpacity>
    )
}
export default RoundUser;
