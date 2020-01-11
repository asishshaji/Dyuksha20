import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";


class ProCarComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bgColor: [
                '#' + (function co(lor) {
                    return (lor +=
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)])
                        && (lor.length == 6) ? lor : co(lor);
                })('')
            ],
            selectedColor: '',
        };
    }

    componentDidMount() {
        this._getRandomColor()
    }

    _getRandomColor() {
        var item = this.state.bgColor[Math.floor(Math.random() * this.state.bgColor.length)];
        this.setState({
            selectedColor: item,
        })
    }


    render() {
        const item = this.props.item;
        return (
            <TouchableOpacity onPress={() => {
                if (this.props.nav) {
                    this.props.nav.navigate('Detail', {
                        item: item, navToday: this.props.nav
                    })
                }
            }} style={{ height: this.props.height + 30, width: this.props.width + 20 }} activeOpacity={1}>
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
                        <Text style={{ textAlign: "center", fontSize: 12, fontFamily: 'Light', flexShrink: 1, textTransform: 'uppercase' }}>
                            {this.props.item ? item.date : ""}
                        </Text>
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            zIndex: 100000,
                            bottom: 10,
                            backgroundColor: this.state.selectedColor,
                            borderRadius: 10,
                            elevation: 10, margin: 10,
                            marginBottom: 0,
                            height: this.props.height,
                            width: this.props.width,
                            opacity: 0.3,

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
                            fontSize: 14, color: '#fff',
                            textTransform: 'uppercase',
                        }} >
                            {this.props.item ? item.title : ""}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: this.props.height, //150
                            backgroundColor: "#fff",
                            margin: 10,
                            width: this.props.width, //200
                            borderRadius: 10,
                            elevation: 6,
                        }}
                    >
                        {this.props.item ?
                            <Image
                                style={{ flex: 1, borderRadius: 10 }}
                                resizeMode="cover"
                                source={{
                                    uri: item.imageUrl
                                }}
                            /> : null}

                    </View>
                </View>
            </TouchableOpacity>
        )
    }


}
export default ProCarComp;

