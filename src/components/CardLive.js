import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image
} from "react-native";
import { BGCOLOR, FONTCOLOR } from "../Styles/Colors";

const { height, width } = Dimensions.get('window')

const CardLive = props => {
    const item = props.item;
    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardTitle}>
                        <Text style={{ fontSize: 13, fontFamily: 'Black', color: 'black' }}>{props.cardTitle}</Text>
                        <Text style={{ fontSize: 12, color: 'grey' }}>{props.time}</Text>
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <Image style={{ flex: 1, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} source={{ uri: props.imageUrl }} resizeMode={'cover'} />
                </View>
            </View>
        </View>
    );
}

export default CardLive;

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        margin: 15,
        borderRadius: 8,
        borderWidth: 0,
        height: 300,
        width: width - 50,
        elevation: 8,
    },
    card: {
        flex: 1,
        borderRadius: 8,
        borderWidth: 0,
        height: 300,
        width: width - 30
    },
    cardHeader: {
        borderWidth: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 50,
        justifyContent: 'center',
        padding: 5,
        backgroundColor: 'white'
    },
    cardTitle: {
        width: 100
    },
    cardContent: {
        flex: 1,
        backgroundColor: BGCOLOR, //'yellow'
        borderRadius: 8
    },

});