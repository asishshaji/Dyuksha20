import {
    Animated,
    Dimensions,
    Easing,
    Image,
    Linking,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { BGCOLOR, FONTCOLOR } from '../Styles/Colors'

import Icon from 'react-native-vector-icons/Ionicons';
import React from "react";

const { width } = Dimensions.get('window')

const RoundUser = (props) => {


    return (
        <View style={{
            marginHorizontal: 10, borderRadius: 5, justifyContent: 'center', flexDirection: 'row',
            alignItems: 'center', margin: 7, height: 50, elevation: 5, backgroundColor: 'white', padding: 20, width: width / 2 - 25
        }}
            keyExtractor={(item, index) => String(index)}

            activeOpacity={1}>



            <Icon name="ios-phone-portrait" size={24} color="black" style={{}} onPress={() => Linking.openURL(`tel:${props.phoneNumber}`)} />




            <Text onPress={() => Linking.openURL(`tel:${props.phoneNumber}`)} style={{
                fontFamily: 'Black', textAlign: 'center', padding: 10,
                fontSize: 12,

                textTransform: 'uppercase', color: FONTCOLOR, marginTop: 6
            }}
            >{props.name.replace('<br/>', '\n')}</Text>


        </View>
    )
}
export default RoundUser;
