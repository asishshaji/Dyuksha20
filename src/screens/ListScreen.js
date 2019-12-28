import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, FlatList, ScrollView, TouchableOpacity, Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { BGCOLOR, FONTCOLOR } from '../Styles/Colors'
import { firestore } from 'react-native-firebase'
import EventCard from '../components/CardHome';
import LottieView from 'lottie-react-native';
import RoundedBackButton from "../components/RoundedBackButton";

const { width, height } = Dimensions.get('window')


const data = [{ "dep": "EEE" }, { "dep": "ME" }, { "dep": "CS" }, { "dep": "CE" }, { "dep": "IC" }, { "dep": "EC" },]
class SelectScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props)
        this.state = {
            selectedDep: "EEE",
            list: []
        }

        this.nav = props.navigation;
        this.name = this.nav.getParam('name', "")
        this.DBNAME = this.nav.getParam('DB', "")
        this.DBDOCNAME = this.nav.getParam('DOCNAME', "")
        this.ref = firestore().collection(this.DBNAME).doc(this.DBDOCNAME)
    }



    componentDidMount() {
        this.ref.collection(this.state.selectedDep).onSnapshot(q => {
            this.setState({ list: [] })
            q.forEach(doc => {
                this.setState({ list: this.state.list.concat(doc.data()) })
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedDep == prevState.selectedDep) {

        } else {
            this.ref.collection(this.state.selectedDep).onSnapshot(q => {
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

                <Text style={{
                    fontFamily: 'Black', fontSize: 30, color: FONTCOLOR,
                    textAlign: 'right', backgroundColor: BGCOLOR, padding: 20
                }}>{this.name}</Text>

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
                                    <Text style={{
                                        color: FONTCOLOR, fontSize: 24,
                                        fontFamily: 'Black'
                                    }}>{item.dep}</Text>
                                </TouchableOpacity>)
                            }
                            else {
                                return (<TouchableOpacity style={{ margin: 10, padding: 10 }}
                                    underlayColor="green"
                                    activeOpacity={1}
                                    onPress={() => {
                                        this.setState({ selectedDep: item.dep })
                                        this.setState({ list: [] })

                                    }}
                                >
                                    <Text style={{ color: 'grey', fontSize: 18, fontFamily: 'Black' }}>{item.dep}</Text>
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
                    {this.state.list.length === 0 ?
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <LottieView source={require('../../assets/loading.json')}
                                autoPlay loop
                                style={{ height: 100, width: 100, alignSelf: 'center' }}
                            />
                        </View>
                        : <FlatList
                            numColumns={2}
                            style={{ backgroundColor: BGCOLOR }}
                            contentContainerStyle={{ backgroundColor: BGCOLOR }}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            keyExtractor={(item, index) => String(index)}
                            data={this.state.list}
                            renderItem={({ item }) => (
                                <EventCard
                                    nav={this.nav}
                                    height={180}
                                    width={width / 2 - 20}
                                    item={item}
                                />
                            )}
                        />}

                </View>
                <RoundedBackButton navigation={nav} />

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