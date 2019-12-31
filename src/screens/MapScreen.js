import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';

class MapScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            Text: 'hello'
        }


    }

    render() {
        return (
            <View style={styles.container}>
                <GestureRecognizer
                    onSwipeLeft={this.onSwipeLeft}
                    onSwipeRight={this.onSwipeRight}
                    config={{
                        velocityThreshold: 0.3,
                        directionalOffsetThreshold: 80,
                    }}
                    style={{
                        flex: 1,
                        backgroundColor:'red',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Text>{this.state.Text}</Text>
                </GestureRecognizer>

            </View>
        );
    }

    onSwipeLeft = gestureState => {

        this.setState({
            Text: 'world'
        });
    };

    onSwipeRight = gestureState => {

        this.setState({
            Text: 'noooooooooo'
        });

    };
}
export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});