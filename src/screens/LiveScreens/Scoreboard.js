import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Scoreboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Scoreboard</Text>
            </View>
        );
    }
}
export default Scoreboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});