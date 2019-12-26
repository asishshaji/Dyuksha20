
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, Image,
    Dimensions, ScrollView,
    TouchableOpacity, FlatList,
    TouchableWithoutFeedback, Linking
} from "react-native";
import { BGCOLOR, FONTCOLOR, DRAWERCOLOR, ICONCOLOR } from "../../Styles/Colors"
import Icon from 'react-native-vector-icons/Ionicons';
import firebase, { firestore } from 'react-native-firebase';
import ContactCard from "../../components/ContactCard";


const { height, width } = Dimensions.get('window')



class Contact extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.events = firestore().collection('Contact');
        this.state = {
            ContactList: [],
        };
    }

    componentDidMount() {
        this.events.onSnapshot(querySnapshot => {
            this.setState({
                ContactList: []
            });

            querySnapshot.forEach(doc => {
                this.setState({
                    ContactList: this.state.ContactList.concat(doc.data())
                });
            });
        });
    }


    render() {

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.container}>

                    <View style={{ margin: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={this.props.navigation.openDrawer} style={{ alignItems: "flex-start", }}>
                            <Icon name={'ios-menu'} color={DRAWERCOLOR} size={35} style={{}} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 25, fontFamily: 'Black', color: FONTCOLOR }}>
                            Contact
                     </Text>
                    </View>

                    {/* Contacts */}
                    <ScrollView style={{ backgroundColor: BGCOLOR }} contentContainerStyle={styles.contentContainer} >

                        <View style={{ justifyContent: 'center', }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                horizontal={false}
                                numColumns={1}
                                data={this.state.ContactList}
                                renderItem={({ item, index }) => (this.renderList(item, index))}
                            />
                        </View>
                    </ScrollView>

                </View>
            </ScrollView>

        );
    }

    renderList(item, index) {
        return (
            <TouchableWithoutFeedback>
                <View style={{}}>
                    <ContactCard
                        item={item}
                    />

                </View>
            </TouchableWithoutFeedback>
        );
    }

}
export default Contact;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BGCOLOR
    },
    headerContainer: {
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: BGCOLOR,
        alignItems: 'center',
        marginTop:40,
    },

});