import {
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import React from "react";

const Banner = (props) => (
    <TouchableOpacity
        style={{
            width: props.width - 20, margin: 10, marginTop: 0,
            backgroundColor: '#e3e3e3', height: props.sliderH - 25,
            borderRadius: 12, elevation: 9, marginTop: 5
        }}
        activeOpacity={1}
        onPress={() => {
            if (props.title.includes("WORKSHOPS")) {
                props.nav.navigate("Select", {
                    'name': 'WORKSHOPS',
                    'DB': 'DepWorkshops', 'DOCNAME': 'workshopsDoc'
                })
            } else if (props.title.includes("EVENTS")) {
                props.nav.navigate('Select', {
                    'name': 'EVENTS',
                    'DB': 'DepEvents', 'DOCNAME': 'eventsDoc'
                })
            }
            else if (props.title.includes("PROSHOW")) {
                props.nav.navigate('ProShow')
            }
        }}
    >
        <Image style={{ flex: 1, borderRadius: 12 }}
            source={{ uri: props.imageUrl }} resizeMode="cover" />
        <Text style={{
            fontFamily: 'Black', position: 'absolute', bottom: 30,
            color: '#fff', fontSize: 22, padding: 5,
            maxHeight: props.sliderH - 25,
            minWidth: props.width - 20, alignSelf: 'center', textAlign: 'right'
        }}>{props.title}</Text>
    </TouchableOpacity>
)
export default Banner;
