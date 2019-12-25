import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";


const ProCarComp = props => {
    const item = props.item;
    return (
        <TouchableOpacity onPress={() => props.nav.navigate('Detail', {
            item: item
        })} style={{ height: props.height + 30, width: props.width + 20 }} activeOpacity={1}>
            <View style={{ paddingTop: 10, position: 'relative' }}>
                <View
                    style={{
                        position: "absolute",
                        zIndex: 1000000,
                        top: 5,
                        left: 20,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        elevation: 10, justifyContent: 'center',
                        height: 40,
                        width: 40,
                        padding: 2
                    }}
                >
                    <Text style={{ textAlign: "center", fontSize: 12, fontFamily: 'HeadB', flexShrink: 1 }}>
                        {item.date}
                    </Text>
                </View>
                <View
                    style={{
                        position: "absolute",
                        zIndex: 100000,
                        bottom: 10,
                        backgroundColor: "#080808",
                        borderRadius: 10,
                        elevation: 10, margin: 10,
                        marginBottom: 0,
                        height: props.height,
                        width: props.width,
                        opacity: 0.4,

                    }}
                ></View>
                <View
                    style={{
                        position: "absolute",
                        zIndex: 1000000,
                        bottom: 35,
                        left: 20,
                        right: 20,
                        padding: 4,
                        elevation: 10,
                    }}
                >
                    <Text style={{
                        textAlign: "center",
                        fontFamily: 'Black',
                        fontSize: 15, color: '#fff',
                        textTransform: 'uppercase',
                    }} >
                        {item.title}
                    </Text>
                </View>
                <View
                    style={{
                        height: props.height, //150
                        backgroundColor: "#fff",
                        margin: 10,
                        width: props.width, //200
                        borderRadius: 10,
                        elevation: 10,
                    }}
                >
                    <Image
                        style={{ flex: 1, borderRadius: 10 }}
                        resizeMode="cover"
                        source={{
                            uri: item.imageUrl
                        }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default ProCarComp;

