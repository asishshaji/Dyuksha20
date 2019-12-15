import React, { useState } from "react";
import {
    TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';



const RoundedBackButton = (props) => {
    return (<TouchableOpacity style={{
        position: 'absolute', top: 15, left: 16, elevation: 6, height: 50, width: 50,
        backgroundColor: 'white', justifyContent: 'center',
        alignItems: 'center', borderRadius: 50 / 2
    }}
        onPress={() => props.navigation.goBack()} activeOpacity={1}>
        <Icon name="ios-arrow-back" size={30} color="#E55656" onPress={() => props.navigation.goBack()} />
    </TouchableOpacity>)
}


export default RoundedBackButton;

