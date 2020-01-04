import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import { BGCOLOR } from "../Styles/Colors";

const ContactImage = props => {
    const item = props.imageUri;
 
    return (
            <View style={{
                height: 120,
                borderRadius: 60,
                backgroundColor: BGCOLOR,
                alignItems: 'center',
                elevation: 5
            }}>

                <Image source={{ uri: item }}
                    style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'cover' }} />
            </View>
    );
}

export default ContactImage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});