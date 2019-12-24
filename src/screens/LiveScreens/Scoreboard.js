import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { BGCOLOR, FONTCOLOR } from "../../Styles/Colors"
class Scoreboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    

                    
                </View>
            </View>
        );
    }
}
export default Scoreboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:BGCOLOR,
        paddingTop:5
    },
    headerContainer:{
        paddingLeft:10,
        width:150,        
    },
});