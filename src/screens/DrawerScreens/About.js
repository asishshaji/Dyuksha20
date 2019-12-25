import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,SafeAreaView,TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


class About extends Component {
    render() {

        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <TouchableOpacity onPress={this.props.navigation.openDrawer} style={{ alignItems: "flex-start", margin: 16 }}>
                        <Icon name={'ios-menu'} color={'black'} size={35} style={{}} />
                    </TouchableOpacity>
                   
                    <View style={styles.contentContainer}>
                    <Text >About Screen</Text>
                    </View>
                    
                </SafeAreaView>
            </View>
        );
    }
}
export default About;

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
});