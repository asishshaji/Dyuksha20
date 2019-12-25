import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    FlatList,
    TouchableWithoutFeedback
} from "react-native";
import firebase, { firestore } from 'react-native-firebase';

import Card from '../../components/Card';
import { BGCOLOR } from "../../Styles/Colors";


const { height, width } = Dimensions.get('window')


class Today extends Component {

    
    constructor(props) {
        super(props);
        this.events = firestore().collection('Live');
        this.state = {
            selectedIndex: 0,
            TodayList: [],
        };
    }

    componentDidMount() {
        this.events.limit(6).onSnapshot(querySnapshot => {
            this.setState({
                TodayList: []
            });

            querySnapshot.forEach(doc => {
                this.setState({
                    TodayList: this.state.TodayList.concat(doc.data())
                });
            });
        });
    }

    render() {

      
        return (
            <ScrollView style={{ backgroundColor: BGCOLOR, }} contentContainerStyle={{}} >
                {/* <Text style={{ color: 'white' }}>ALL SHOTS</Text> */}

                <View style={{ height: height, justifyContent: 'center' }}>

                    <ScrollView>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={false}
                            numColumns={2}
                            data={this.state.TodayList}
                            renderItem={({ item, index }) => (this.renderList(item, index))}
                        />
                    </ScrollView>

                </View>
            </ScrollView>
        );
    }

    renderList(item, index) {
        
        return (
            <TouchableWithoutFeedback>
                <View style={{}}>
                    <Card
                        
                        height={100}
                        width={width / 2 - 40}
                        item={item}
                    />

                </View>
            </TouchableWithoutFeedback>
        );
    }

}

export default Today;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    }
});