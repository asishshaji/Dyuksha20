import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    TouchableWithoutFeedback
} from "react-native";

let events = [{ "key": "event1" }, { "key": "event2" }]
let workshops = [{ "key": "Workshop1" }, { "key": "Workshop2" }, { "key": "Workshop3" },]

class ListItems extends Component {

    constructor(props) {
        super(props);

        this.state = {
            eventData: [{ "key": "event1" }, { "key": "event2" }],
            workshopData: [{ "key": "Workshop1" }, { "key": "Workshop2" }],
            selectedTopTapBarIndex: 0,
            selectedEventTapBarIndex: 0,
            selectedWorkshopTapBarIndex: 0,

        };
    }

    eventSwitch = index => {
        switch (index) {
            case 0: this.state.eventData
                break;
            case 1: this.ONE();
                break;
            case 2: this.TWO();
                break;
            case 3: this.THREE();
                break;
            case 4: this.FOUR();
                break;
            case 5: this.FIVE();
                break;
            default: Alert.alert("error");
        }
    }

    ZERO = () => {
        Alert.alert("Mechanical");
    }

    ONE = () => {
        Alert.alert(JSON.stringify(this.state.eventData));
    }

    TWO = () => this.state.eventData

    THREE = () => {
        Alert.alert("Computer");
    }

    FOUR = () => {
        Alert.alert("Civil");
    }

    FIVE = () => {
        Alert.alert("Instrumentation");
    }

    workshopSwitch = () => this.state.workshopData


    render() {

        let eventIndex = this.props.selectedEventTapBarIndex;
        let workshopIndex = this.props.selectedWorkshopTapBarIndex;

        return (
            <View style={styles.container}>
                <View style={{ marginTop: 50 }}>
                    <Text>{this.props.selectedTopTapBarIndex}</Text>
                    <Text>{eventIndex}</Text>
                    <Text>{workshopIndex}</Text>
                </View>

                <View style={{ marginTop: 10 }}>

                    {
                        this.props.selectedTopTapBarIndex === 0 ?
                            <View >
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    data={this.eventSwitch(eventIndex)}
                                    extraData={this.state.eventData}
                                    renderItem={({ item, index }) => this.renderEvents(item, index)}
                                />
                            </View>
                            :
                            <View >
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    data={this.workshopSwitch(workshopIndex)}
                                    extraData={workshops}
                                    renderItem={({ item, index }) => this.renderWorkshops(item, index)}
                                />
                            </View>
                    }
                </View>

            </View>
        );
    }

    renderEvents(item, index) {

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState(previousIndex => {
                        return {
                            selectedTopTapBarIndex: index
                        };
                    });
                }}
            >
                <View style={{ justifyContent: 'center', flex: 1, padding: 7 }}>
                    <Text style={
                        {
                            //justifyContent: 'center',
                            marginLeft: 10,
                            backgroundColor: 'white',
                            borderWidth: 2,
                            //elevation: 3,
                            borderRadius: 3,
                            color: this.state.selectedTopTapBarIndex == index ? 'black' : 'grey',
                            fontSize: this.state.selectedTopTapBarIndex == index ? 25 : 25,
                            fontWeight: this.state.selectedTopTapBarIndex == index ? 'bold' : 'bold',
                        }}>
                        {item['key']}
                    </Text>

                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderWorkshops(item, index) {

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState(previousIndex => {
                        return {
                            selectedTopTapBarIndex: index
                        };
                    });
                }}
            >
                <View style={{ justifyContent: 'center', flex: 1, padding: 7 }}>
                    <Text style={
                        {
                            //justifyContent: 'center',
                            marginLeft: 10,
                            backgroundColor: 'white',
                            borderWidth: 0,
                            //elevation: 3,
                            borderRadius: 0,
                            color: this.state.selectedTopTapBarIndex == index ? 'black' : 'grey',
                            fontSize: this.state.selectedTopTapBarIndex == index ? 25 : 25,
                            fontWeight: this.state.selectedTopTapBarIndex == index ? 'bold' : 'bold',
                        }}>
                        {item['key']}
                    </Text>

                </View>
            </TouchableWithoutFeedback>
        );
    }


}
export default ListItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});