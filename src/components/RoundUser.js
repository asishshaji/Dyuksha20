import React, { useState } from "react";
import {
    View,
    Text,
    Image, TouchableOpacity, Animated, Easing, Linking
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { BGCOLOR, FONTCOLOR, ICONCOLOR } from '../Styles/Colors'

const RoundUser = (props) => {
    const [clicked, clickListner] = useState(false)
    const [opacity, opacityChanger] = useState(new Animated.Value(0))

    return (
        <TouchableOpacity style={{marginHorizontal:10, borderRadius:5, justifyContent:'center', flexDirection:'row', alignItems: 'center', margin: 7, height:50, elevation:5, backgroundColor:'white' }}
            keyExtractor={(item, index) => String(index)}
          
            activeOpacity={1}>



            <Icon name="ios-phone-portrait" size={30} color={ICONCOLOR} style={{}}   onPress={() => Linking.openURL(`tel:${props.phoneNumber}`)} />


           
                <Text   onPress={() => Linking.openURL(`tel:${props.phoneNumber}`)} style={{
                    fontFamily: 'Black', textAlign: 'center', padding:6,
                    fontSize:12,

                    textTransform: 'uppercase', color: FONTCOLOR, marginTop: 6
                }}
                >{props.name.replace('<br/>', '\n')}</Text>
         

        </TouchableOpacity>
    )
}
export default RoundUser;
