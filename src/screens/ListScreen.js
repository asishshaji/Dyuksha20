import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, FlatList, ScrollView, TouchableOpacity, Dimensions
} from "react-native";

import { BGCOLOR, FONTCOLOR } from '../Styles/Colors'
import { firestore } from 'react-native-firebase'
import EventCard from '../components/CardHome';

const { width, height } = Dimensions.get('window')


const data = [{ "dep": "EEE" }, { "dep": "ME" }, { "dep": "CS" }, { "dep": "CE" }]
class SelectScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor() {
        super()
        this.state = {
            selectedDep: "EEE",
            list: []
        }

        this.eventRef = firestore().collection("DepEvents").doc("Q7EGukvFtGHdsXc2QAQM")
    }



    componentDidMount() {
        this.eventRef.collection(this.state.selectedDep).onSnapshot(q => {
            this.setState({ list: [] })
            q.forEach(doc => {
                this.setState({ list: this.state.list.concat(doc.data()) })
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedDep == prevState.selectedDep) {

        } else {
            this.eventRef.collection(this.state.selectedDep).onSnapshot(q => {
                this.setState({ list: [] })
                q.forEach(doc => {
                    this.setState({ list: this.state.list.concat(doc.data()) })
                })
            })
        }
    }
    render() {
        const nav = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{ padding: 10, backgroundColor: BGCOLOR }}>
                    <Text style={{ fontFamily: 'Black', fontSize: 30, color: FONTCOLOR }}>EVENTS</Text>
                </View>

                {/* Header Scroll */}
                <View style={{ backgroundColor: BGCOLOR }}>
                    <FlatList
                        horizontal={true}
                        style={{ backgroundColor: BGCOLOR }}
                        contentContainerStyle={{ backgroundColor: BGCOLOR }}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        keyExtractor={(item, index) => String(index)}
                        data={data}
                        renderItem={({ item }) => {
                            if (item.dep === this.state.selectedDep) {
                                return (<TouchableOpacity style={{ margin: 10, padding: 10 }}
                                    underlayColor="green"
                                    activeOpacity={1}
                                    onPress={() => {
                                        this.setState({ selectedDep: item.dep })
                                    }}
                                >
                                    <Text style={{ color: FONTCOLOR, fontSize: 22, fontFamily: 'Black' }}>{item.dep}</Text>
                                </TouchableOpacity>)
                            }
                            else {
                                return (<TouchableOpacity style={{ margin: 10, padding: 10 }}
                                    underlayColor="green"
                                    activeOpacity={1}
                                    onPress={() => {
                                        this.setState({ selectedDep: item.dep })
                                    }}
                                >
                                    <Text style={{ color: FONTCOLOR, fontSize: 18, fontFamily: 'Black' }}>{item.dep}</Text>
                                </TouchableOpacity>)
                            }

                        }}
                    />
                </View>
                {/* Header Scroll End */}

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: width,
                    backgroundColor: BGCOLOR,
                }}>
                    <FlatList
                        numColumns={2}
                        style={{ backgroundColor: BGCOLOR }}
                        contentContainerStyle={{ backgroundColor: BGCOLOR }}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        keyExtractor={(item, index) => String(index)}
                        data={this.state.list}
                        renderItem={({ item }) => (
                            <EventCard
                                nav={nav}
                                height={180}
                                width={width / 2 - 20}
                                item={item}
                            />
                        )}
                    />
                </View>

            </View>
        );
    }
}
export default SelectScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BGCOLOR
    }
});