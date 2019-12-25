import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    FlatList,
    Image,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import ListItems from "../../components/ListItem";
import { BGCOLOR } from "../../Styles/Colors";

let topTapBar = [{ "key": "Events" }, { "key": "Workshops" }]
let eventTapBar = [{ "key": "Mechanical" }, { "key": "Electrical" }, { "key": "Electronics" }, { "key": "Computer" }, { "key": "Civil" }, { "key": "Instrumentation" },]
let workshopTapBar = [{ "key": "Mechanical" }, { "key": "Electrical" }, { "key": "Electronics" }, { "key": "Computer" }, { "key": "Civil" }, { "key": "Instrumentation" },]



class SelectScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedTopTapBarIndex: 0,
            selectedEventTapBarIndex: 0,
            selectedWorkshopTapBarIndex: 0,
        };
    }


    render() {
        const {navigate} = this.props.navigation;

        return (
            <ScrollView ContentContainerStyle={styles.mainContainer}>
                <View style={styles.headerContainer}>

                    <TouchableOpacity onPress={() => navigate('Home')} >
                        <View style={{ backgroundColor: BGCOLOR, width: 50, height: 50, left: 12, justifyContent: 'center' }}>
                            <Icon name={'ios-arrow-back'} color={'white'} size={30} style={{}} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.topTabContainer}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            pagingEnabled
                            data={topTapBar}
                            extraData={this.state.selectedTopTapBarIndex}
                            renderItem={({ item, index }) => this.renderTopTapBarItem(item, index)}
                        />
                    </View>

                    <View style={styles.secondTabContainer}>
                        {
                            this.state.selectedTopTapBarIndex === 0 ?
                                <View>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}
                                        data={eventTapBar}
                                        extraData={eventTapBar}
                                        renderItem={({ item, index }) => this.renderEventTapBarItem(item, index)}
                                    />
                                </View>
                                :
                                <View>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}
                                        data={workshopTapBar}
                                        extraData={workshopTapBar}
                                        renderItem={({ item, index }) => this.renderWorkshopTapBarItem(item, index)}
                                    />
                                </View>
                        }
                    </View>

                </View>


                <View style={styles.listContainer}>
                    <View style={{ flex: 1, marginTop: 15 }}>
                        <ListItems selectedTopTapBarIndex={this.state.selectedTopTapBarIndex} selectedEventTapBarIndex={this.state.selectedEventTapBarIndex} selectedWorkshopTapBarIndex={this.state.selectedWorkshopTapBarIndex} />
                    </View>
                </View>

            </ScrollView>
        );
    }

    renderTopTapBarItem(item, index) {

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState(previousIndex => {
                        return {
                            selectedTopTapBarIndex: index
                        };
                    });
                }}>
                <View style={{ justifyContent: 'center', padding: 5 }}>
                    <Text style={
                        {
                            //justifyContent: 'center',
                            marginLeft: 7,
                            opacity: this.state.selectedTopTapBarIndex == index ? 1 : 0.5,
                            color: 'white',
                            fontFamily: 'Black',
                            fontSize: this.state.selectedTopTapBarIndex == index ? 35 : 35,
                            fontWeight: this.state.selectedTopTapBarIndex == index ? 'bold' : 'bold',
                        }}>
                        {item['key']}
                    </Text>

                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderEventTapBarItem(item, index) {

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState(previousIndex => {
                        return {
                            selectedEventTapBarIndex: index
                        };
                    });
                }}>
                <View style={{ justifyContent: 'center', padding: 3 }}>
                    <Text style={
                        {
                            justifyContent: 'center',
                            marginLeft: 10,
                            borderBottomColor: this.state.selectedEventTapBarIndex == index ? '#46c27c' : BGCOLOR,
                            borderBottomWidth: 0,
                            color: 'white',
                            opacity: this.state.selectedEventTapBarIndex == index ? 1 : 0.5,
                            fontSize: this.state.selectedEventTapBarIndex == index ? 18 : 18,
                            fontWeight: this.state.selectedEventTapBarIndex == index ? 'bold' : 'normal',
                        }}>
                        {item['key']}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderWorkshopTapBarItem(item, index) {

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState(previousIndex => {
                        return {
                            selectedWorkshopTapBarIndex: index
                        };
                    });
                }}>
                <View style={{ justifyContent: 'center', padding: 3 }}>
                    <Text style={
                        {
                            justifyContent: 'center',
                            marginLeft: 10,
                            borderBottomColor: this.state.selectedWorkshopTapBarIndex == index ? '#46c27c' : BGCOLOR,
                            borderBottomWidth: 0,
                            color: 'white',
                            opacity: this.state.selectedWorkshopTapBarIndex == index ? 1 : 0.5,
                            fontSize: this.state.selectedWorkshopTapBarIndex == index ? 18 : 18,
                            fontWeight: this.state.selectedWorkshopTapBarIndex == index ? 'bold' : 'normal',
                        }}>
                        {item['key']}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

}
export default SelectScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: BGCOLOR
    },
    headerContainer: {
        paddingTop: 10,
        backgroundColor: BGCOLOR,
        height: 240

    },
    topTabContainer: {
        paddingLeft:8,
        backgroundColor: BGCOLOR,
        height: 100
    },
    secondTabContainer: {
        paddingLeft:8,
        backgroundColor: BGCOLOR,
        height: 100
    },
    listContainer: {
        backgroundColor: BGCOLOR,
    },
});