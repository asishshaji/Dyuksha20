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
    ActivityIndicator
} from "react-native";

import ListItems from "../components/ListItem";

let topTapBar = [{ "key": "Events" }, { "key": "Workshops" }]
let eventTapBar = [{ "key": "Mechanical" }, { "key": "Electrical" }, { "key": "Electronics" }, { "key": "Computer" }, { "key": "Civil" }, { "key": "Instrumentation" },]
let workshopTapBar = [{ "key": "Mechanical" }, { "key": "Electrical" }, { "key": "Electronics" }, { "key": "Computer" }, { "key": "Civil" }, { "key": "Instrumentation" },]

const { height, width } = Dimensions.get('window')



class SelectScreenStack extends Component {

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
        // if (this.state.loading) {
        //     return <ActivityIndicator size="large" />;
        // }

        return (
            <SafeAreaView style={styles.container} >
                <ScrollView showsVerticalScrollIndicator={false} pagingEnabled>
                    <View>
                        <View style={styles.topTabBarContainer}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                pagingEnabled
                                data={topTapBar}
                                extraData={this.state.selectedTopTapBarIndex}
                                renderItem={({ item, index }) => this.renderTopTapBarItem(item, index)}
                            />
                        </View>

                        <View>

                            {
                                this.state.selectedTopTapBarIndex === 0 ?
                                    <View style={styles.secondTabBarContainer}>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            data={eventTapBar}
                                            extraData={eventTapBar}
                                            renderItem={({ item, index }) => this.renderEventTapBarItem(item, index)}
                                        />
                                    </View>
                                    :
                                    <View style={styles.secondTabBarContainer}>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            data={workshopTapBar}
                                            extraData={this.state.selectedWorkshopTapBarIndex}
                                            renderItem={({ item, index }) => this.renderWorkshopTapBarItem(item, index)}
                                        />
                                    </View>
                            }
                        </View>
                    </View>

                    <View style={{ flex: 1, marginTop: 15 }}>
                        <ListItems selectedTopTapBarIndex={this.state.selectedTopTapBarIndex} selectedEventTapBarIndex={this.state.selectedEventTapBarIndex} selectedWorkshopTapBarIndex={this.state.selectedWorkshopTapBarIndex} />
                    </View>

                </ScrollView>
            </SafeAreaView>
        );
    }
    //outside render
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
                <View style={{ justifyContent: 'center', flex: 1, padding: 7 }}>
                    <Text style={
                        {
                            //justifyContent: 'center',
                            marginLeft: 10,
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
                <View style={{ justifyContent: 'center', padding: 5, flex:1 }}>
                    <Text style={
                        {
                            justifyContent: 'center',
                            marginLeft: 10,
                            borderBottomColor: this.state.selectedEventTapBarIndex == index ? '#46c27c' : 'white',
                            borderBottomWidth: 2,
                            color: this.state.selectedEventTapBarIndex == index ? 'black' : 'grey',
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
                <View style={{ justifyContent: 'center', flex: 1,  padding: 5 }}>
                    <Text style={
                        {
                            justifyContent: 'center',
                            marginLeft: 10,
                            backgroundColor: 'white',
                            borderBottomColor: this.state.selectedWorkshopTapBarIndex == index ? '#46c27c' : 'white',
                            borderBottomWidth: 2,
                            color: this.state.selectedWorkshopTapBarIndex == index ? 'black' : 'grey',
                            fontSize: this.state.selectedWorkshopTapBarIndex == index ? 18 : 18,
                            fontWeight: this.state.selectedWorkshopTapBarIndex == index ? 'bold' : 'normal',
                        }}>
                        {item['key']}
                    </Text>

                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderListItem(item, index) {

        return (
            <TouchableWithoutFeedback
                onPress={() => { }}>
                <View style={styles.imageContainer}>


                </View>
            </TouchableWithoutFeedback>
        );
    }

}



export default SelectScreenStack;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,

    },
    headerContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    topTabBarContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'

    },
    secondTabBarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    listContainer: {
        flex: 1,
        marginTop: 25,
        borderTopWidth: 1,
        borderTopColor: 'white',
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    imageContainer: {
        flex: 1,
        margin: 10,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#46c27c',
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 10,
        height: 200,
        width: 200

    },
    image: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover'
    }
});

