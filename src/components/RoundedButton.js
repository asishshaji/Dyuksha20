import React from "react";
import {
    View,
    Text,
    TouchableOpacity, Dimensions, Linking
} from "react-native";
const { height, width } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Ionicons';
import { BGCOLOR } from '../Styles/Colors'

import InAppBrowser from 'react-native-inappbrowser-reborn';

const openLink = async (url) => {
    try {
        if (await InAppBrowser.isAvailable()) {
            const result = await InAppBrowser.open(url, {
                // Android Properties
                showTitle: true,
                toolbarColor: BGCOLOR,
                secondaryToolbarColor: 'black',
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                },
                headers: {
                    'my-custom-header': 'my custom header value'
                }
            })
        }
        else Linking.openURL(url)
    } catch (error) {
    }
}

const RoundedButton = (props) => (
    <TouchableOpacity style={{
        position: 'absolute', bottom: 10, width: width - 40, height: 55, alignItems: 'center',
        backgroundColor: '#E55656', borderRadius: 55 / 2, elevation: 4, justifyContent: 'center',
        left: 20, right: 20, flexDirection: 'row'
    }} onPress={() => openLink(props.reglink)} activeOpacity={1}>
        <View style={{ flex: 1, height: 55 }} />
        <Text style={{
            fontFamily: 'Black', color: 'white', textAlign: 'center', fontSize: 15,
            flex: 1
        }}>Tickets :₹{props.price}</Text>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 10 }}>
            <Icon name="ios-arrow-round-forward" size={32} color="white" style={{}} />
        </View>

    </TouchableOpacity>
)

export default RoundedButton;

