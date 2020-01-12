import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";

import BackButton from '../components/RoundedBackButton'

class ProShow extends Component {
    static navigationOptions = {
        header: null,
    }


    render() {
        const navigation = this.props.navigation

        return (
            <View style={styles.container}>
                <Text>ProShow</Text>
                {/* <BackButton navigation={navigation} /> */}

            </View>
        );
    }
}
export default ProShow;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});