
import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    Linking
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window')

const ContactCard = props => {
    const item = props.item;
    return (
        <View style={{
            flex: 1,
            height: 150,
            width: width * 0.9,
            borderRadius: 12,
            marginVertical: 10,
            elevation: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: 'white'
        }}>
            <View style={{
                height: 120,
                width: 120,
                borderRadius: 60,
                backgroundColor: 'white',
                alignItems: 'center',
                elevation: 12
            }}>

                <Image source={{ uri: item.imageUrl }}
                    style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'cover' }} />
            </View>

            <View style={{}}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'Light',
                        color: 'black',
                        padding: 3
                    }}>
                        {item.name}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'Light',
                        color: 'black',
                        padding: 3
                    }}>
                        {item.badge}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'Light',
                        color: 'black',
                        padding: 3
                    }}>
                        {item.number}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon name="logo-facebook" size={25} color="black" style={{ padding: 5 }} onPress={() => Linking.openURL(item.facebook)} />
                        <Icon name="logo-instagram" size={25} color="black" style={{ padding: 5 }} onPress={() => Linking.openURL(item.instagram)} />
                        <Icon name="logo-linkedin" size={25} color="black" style={{ padding: 5 }} onPress={() => Linking.openURL(item.linkedin)} />
                        

                    </View>
                </View>
            </View>
        </View>
    );
}

export default ContactCard;