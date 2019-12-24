import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import AllPosts from "./LiveScreens/AllPosts";
import Memories from "./LiveScreens/Memories";

class MapScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Memories/>
            </View>
        );
    }
}
export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});