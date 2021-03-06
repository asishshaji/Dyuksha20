
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, Image,
    Dimensions, ScrollView,
    TouchableOpacity, FlatList,
    TouchableWithoutFeedback, Linking
} from "react-native";
import LottieView from 'lottie-react-native';
import { BGCOLOR, FONTCOLOR, DRAWERCOLOR, ICONCOLOR } from "../../Styles/Colors"
import Icon from 'react-native-vector-icons/Ionicons';
import firebase, { firestore } from 'react-native-firebase';
import ContactCard from "../../components/ContactCard";
import Back from '../../components/RoundedBackButton'



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
            <View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                }}>
                    <View style={styles.container}>

                        <View style={{ margin: 15, marginTop: 25 }}>
                            <Text style={{ fontSize: 25, fontFamily: 'Black', color: ICONCOLOR, textAlign: 'right' }}>
                                Contact
                        </Text>
                        </View>


                        <View style={{ marginTop: 30, }}>
                            <Text style={{ paddingLeft: 17, fontSize: 21, fontFamily: 'Black', color: FONTCOLOR, }}>
                                Contact Us
                        </Text>
                        </View>
                        {/* Contacts */}
                        <ScrollView style={{ backgroundColor: BGCOLOR }} contentContainerStyle={styles.contentContainer} >

                            <View style={{ alignItems: 'center', }}>
                                {this.state.ContactList.length === 0 ?
                                    <View style={{ margin: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <LottieView source={require('../../../assets/contact.json')}
                                            autoPlay loop
                                            style={{ height: 300, width: 300, }}
                                        />
                                    </View>
                                    :
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        horizontal={false}
                                        contentContainerStyle={{}}
                                        data={this.state.ContactList}
                                        renderItem={({ item, index }) => (this.renderList(item, index))}
                                    />
                                }
                            </View>
                        </ScrollView>

                        <View style={{ marginTop: 10, alignItems: 'flex-start' }}>
                            <Text style={{ paddingLeft: 17, fontSize: 21, fontFamily: 'Black', color: FONTCOLOR, }}>
                                Reach Us
                        </Text>
                        </View>

                        <View style={{ alignItems: 'center',  justifyContent: 'center' }}>
                            <View style={{
                                flex: 1,
                                padding: 10,
                                borderRadius: 12,
                                elevation: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: width * 0.9,
                                backgroundColor: BGCOLOR,
                                marginTop: 8,
                                marginBottom: 30,


                            }}>
                                <Text style={{ alignItems: 'center', textAlign: 'center', fontFamily: 'Light' }}>
                                    NSS College of Engineering,  </Text>
                                <Text style={{ alignItems: 'center', textAlign: 'center', fontFamily: 'Light' }}> Akathethara P.O.</Text>
                                <Text style={{ alignItems: 'center', textAlign: 'center', fontFamily: 'Light' }}>Palakkad, Kerala</Text>
                                <Text style={{ alignItems: 'center', textAlign: 'center', fontFamily: 'Light' }}> India. 678008.</Text>


                                <Text style={{ alignItems: 'center', padding: 5, textAlign: 'center', fontFamily: 'Light' }}>dyuksha@nssce.ac.in</Text>
                            </View>
                        </View>

                    </View>

                </ScrollView>
                <View style={{ left: 0, position: 'absolute' }}>
                    <Back navigation={this.props.navigation} />
                </View>
            </View>
        );
    }

    renderList(item, index) {
        return (
            <TouchableWithoutFeedback>
                <View style={{
                    padding: 5, width: width, justifyContent: 'center',
                    alignItems: 'center'
                }}>
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
        backgroundColor: BGCOLOR,
    },
    headerContainer: {
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: BGCOLOR,
        marginTop: 5,
        minHeight: 500,
    },

});