import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class AllShots extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>AllShots</Text>
            </View>
        );
    }
}
export default AllShots;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});