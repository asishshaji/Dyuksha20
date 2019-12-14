import React from "react";
import {
    View,
    Text,
    TouchableOpacity, Dimensions
} from "react-native";
const { height, width } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Ionicons';



const RoundedButton = (props) => (
    <TouchableOpacity style={{
        position: 'absolute', bottom: 10, width: width - 40, height: 55, alignItems: 'center',
        backgroundColor: '#E55656', borderRadius: 55 / 2, elevation: 4, justifyContent: 'center',
        left: 20, right: 20, flexDirection: 'row'
    }} onPress={() => alert('Clicked')} activeOpacity={1}>
        <View style={{ flex: 1 ,height:55}} />
        <Text style={{
            fontFamily: 'Black', color: 'white', textAlign: 'center', fontSize: 15,
            flex: 1
        }}>Tickets :₹{props.price}</Text>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 10}}>
            <Icon name="ios-arrow-round-forward" size={32} color="white" style={{}} />
        </View>

    </TouchableOpacity>
)
export default RoundedButton;

