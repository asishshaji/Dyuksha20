import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    Image
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { ICONCOLOR } from '../Styles/Colors'

class FloatingButton extends Component {

    animation = new Animated.Value(0);

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1

        Animated.spring(this.animation, {
            toValue,
            friction: 6
        }).start();
        this.open = !this.open;

    }

    render() {
        const personStyle = {
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            opacity: opacity,
            elevation: 5,
            borderRadius: 20,
            backgroundColor: 'white',
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 60]
                    })
                }
            ]
        }

        const infoStyle = {
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: opacity,
            elevation: 5,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'white',
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 110]
                    })
                }
            ]
        }

        const mapStyle = {
            position: 'absolute',
            zIndex: 900,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: opacity,
            elevation: 5,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'white',
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 160]
                    })
                }
            ]
        }

        const rotation = {
            zIndex: 1000,
            backgroundColor: "white",
            width: 50,
            height: 50,
            elevation: 8,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',

            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "90deg"]
                    })
                }

            ]
        }

        const opacity = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1]
        })


        return (
            <View style={styles.container, this.props.style}>
                <TouchableWithoutFeedback onPress={this.toggleMenu}>
                    <Animated.View style={rotation}>
                        <Image style={{ flex: 1, borderRadius: 25, width: 50, height: 50 }}
                            source={{
                                uri:
                                    'data:image/png;base64,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'
                            }} resizeMode="cover" />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback >
                    <Animated.View style={personStyle} >
                        <Icon name={"ios-person"} size={27} color={ICONCOLOR} onPress={() => this.props.nav.navigate("Contact")} />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback  >
                    <Animated.View style={infoStyle}>
                        <Icon name={"ios-information-circle-outline"} size={27} color={ICONCOLOR} onPress={() => this.props.nav.navigate("About")} />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback  >
                    <Animated.View style={mapStyle}>
                        <Icon name={"ios-compass"} size={27} color={ICONCOLOR}  onPress={() => this.props.nav.navigate("Map")}  />
                    </Animated.View>
                </TouchableWithoutFeedback>


            </View>
        );
    }
}
export default FloatingButton;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: 'white'
    },
});