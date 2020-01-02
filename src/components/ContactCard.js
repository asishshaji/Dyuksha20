
import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    Linking
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTCOLOR, BGCOLOR } from "../Styles/Colors";
import ContactImage from "./ContactImage";

const { height, width } = Dimensions.get('window')

const ContactCard = props => {
    const item = props.item;
  
    return (
        <View style={{
            flex: 1,
            height: height * 0.23,
            width: width * 0.9,
            borderRadius: 12,
            marginVertical: 5,
            elevation: 6,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: BGCOLOR,

        }}>
            
            <ContactImage imageUri={item.imageUrl} />
            
            <View style={{}}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'Black',
                        color: FONTCOLOR,
                        padding: 3
                    }}>
                        {item.name}
                    </Text>
                  
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'Light',
                        color: FONTCOLOR,
                        padding: 3
                    }}>
                        {item.number}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon name="logo-github" size={25} color={FONTCOLOR} style={{ padding: 5 }} onPress={() => Linking.openURL(item.facebook)} />
                        <Icon name="logo-instagram" size={25} color={FONTCOLOR} style={{ padding: 5 }} onPress={() => Linking.openURL(item.instagram)} />
                        <Icon name="logo-linkedin" size={25} color={FONTCOLOR} style={{ padding: 5 }} onPress={() => Linking.openURL(item.linkedin)} />


                    </View>
                </View>
            </View>
        </View>
    );
}

export default ContactCard;

export const DesignerCard = props => {
    const item = props.item;
    return (
        <View style={{
            flex: 1,
            height: height * 0.23,
            width: width * 0.9,
            borderRadius: 12,
            marginVertical: 5,
            elevation: 5,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: BGCOLOR,

        }}>
            
            <ContactImage imageUri={item.imageUrl} />

            <View style={{}}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'Black',
                        color: FONTCOLOR,
                        padding: 3
                    }}>
                        {item.name}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'Light',
                        color: FONTCOLOR,
                        padding: 3
                    }}>
                        {item.badge}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'Light',
                        color: FONTCOLOR,
                        padding: 3
                    }}>
                        {item.number}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon name="logo-instagram" size={30} color={FONTCOLOR} style={{ padding: 5 }} onPress={() => Linking.openURL(item.instagram)} />
                        <Icon name="logo-dribbble" size={30} color={FONTCOLOR} style={{ padding: 5 }} onPress={() => Linking.openURL(item.dribbble)} />


                    </View>
                </View>
            </View>
        </View>
    );
}

