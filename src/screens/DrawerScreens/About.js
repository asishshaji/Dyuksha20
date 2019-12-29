import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, ScrollView, Image,
    TouchableOpacity, Dimensions,
    FlatList, TouchableWithoutFeedback, Linking
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTCOLOR, BGCOLOR, DRAWERCOLOR, ICONCOLOR } from "../../Styles/Colors";
import ContactCard from "../../components/ContactCard";
import firebase, { firestore } from 'react-native-firebase';

const { height, width } = Dimensions.get('window')

const DyukshaCard = props => {
    const item = props.item;
    return (
        <View style={{
            flex: 1,
            height: 150,
            borderRadius: 12,
            elevation: 10,
            width: width * 0.9,
            backgroundColor: BGCOLOR,
            marginLeft: 10
        }}>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Icon name="logo-facebook" size={30} color={FONTCOLOR} style={{ padding: 5 }} onPress={() => Linking.openURL('https://www.facebook.com/Dyuksha20/')} />
                <Icon name="logo-instagram" size={30} color={FONTCOLOR} style={{ padding: 5 }} onPress={() => Linking.openURL('https://www.instagram.com/dyuksha20/')} />
                <Icon name="logo-twitter" size={30} color={FONTCOLOR} style={{ padding: 5 }} onPress={() => Linking.openURL('https://twitter.com/Dyuksha_20')} />
                <Icon name="logo-youtube" size={30} color={FONTCOLOR} style={{ padding: 5 }} onPress={() => Linking.openURL('https://www.youtube.com/channel/UCLMOER5VtwwO91qTlqgjrkg')} />
            </View>
        </View>
    );
}



class About extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.events = firestore().collection('Developers');
        this.state = {
            DeveloperList: [],
        };
    }

    componentDidMount() {
        this.events.onSnapshot(querySnapshot => {
            this.setState({
                DeveloperList: []
            });

            querySnapshot.forEach(doc => {
                this.setState({
                    DeveloperList: this.state.DeveloperList.concat(doc.data())
                });
            });
        });
    }


    render() {

        return (
            <View style={{ flex: 1 }}>

                <ScrollView style={{ backgroundColor: BGCOLOR, flex: 1 }}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>

                        <View style={{
                            margin: 15, flexDirection:
                                'row', alignItems: 'center', justifyContent: 'space-between'
                        }}>
                            <TouchableOpacity onPress={this.props.navigation.openDrawer} style={{ alignItems: "flex-start", }}>
                                <Icon name={'ios-menu'} color={DRAWERCOLOR} size={35} style={{}} />
                            </TouchableOpacity>
                            <View style={{ margin: 5 }}>
                                <Text style={{ fontSize: 25, fontFamily: 'Black', color: ICONCOLOR, textAlign: 'right' }}>
                                    About
                        </Text>
                            </View>
                        </View>


                        <View style={styles.contentContainer}>
                            <View>
                                <Text style={{ marginBottom: 10, padding: 5, fontSize: 24, fontFamily: 'Black', color: FONTCOLOR }}>Know About Dyuksha.</Text>
                            </View>

                            <View style={styles.card}>
                                <View>
                                    <Text style={styles.text}>
                                        Palakkad has increasingly fantastic things tucked away among its folds of the Western Ghats other than the Silent Valley National Park, and among those things is the NSS College of Engineering It is best described as a place which is bordered by verdurous mountains, rather than walls, where youngsters from all over the state work and live together as a vibrant community. As opposed to portraying it as a scholarly organization, it is best depicted by the name its students gave - Shangri La. Heaven On Earth. Dyuksha 20 is a remarkable vision propelled by an incredible reason and brought about by a strong spark which makes one's contemplations break bonds to sustain a place where nothing and literally nothing is unimaginable. The national level techno-administrative social symposium is an amalgamation of science and artistry. It is innovation and technology acting together, catalyzed by inventiveness, to make the panacea. The intention of Dyuksha 20 is to compose a definitive outlay of innovation, business, culture and flar.
                                </Text>
                                </View>
                            </View>



                            <View style={{ alignItems: 'flex-end' }}>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={{ marginBottom: 10, padding: 5, fontSize: 20, fontFamily: 'Black', color: FONTCOLOR }}>About the College.</Text>
                                </View>
                                <View style={styles.card}>
                                    <View style={{}}>
                                        <Text style={styles.text}>
                                            NSS college of engineering was established in 1960 by the NSS under the leadership of Late Bharatha Kesari Mannathu Padmanabhan Being one of the chief organizations to establish specialized frameworks in Kerala, regardless it triumphs on its field of administration. All through its 60 years of greatness, it has been bestowing quality training and making engineering professionals with good honesty, moral qualities and social duty. It's exam play works have been recognized by the government making it the first government-aided engineering college accredited by NBA of AICTE. At present, the institute offers B.Tech degree courses in several branches and M.Tech degrees in innumerable branches as well for creating opportunities for more than 2500 students Setting among the verdant lower regions, the foundation spreads more than 125 acres, One of the numerous things it can relish about is it's solid and supporting graduated class. Its noticeable quality in scholastics and techno-social exercises makes the college stand apart of the group.
                                </Text>
                                    </View>

                                </View>
                            </View>

                            {/* end of cards */}

                            {/* Social Media */}
                            <View style={{ marginTop: 30 }}>
                                <View>
                                    <Text style={{ padding: 5, fontSize: 20, fontFamily: 'Black', color: FONTCOLOR }}>Dyuksha is Also Active on Social Medias.</Text>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <DyukshaCard />
                                </View>
                            </View>

                            {/* Developers */}

                            <View style={styles.developerContainer}>
                                <View style={{marginTop:30}}>
                                    <Text style={{ padding: 5, fontSize: 20, fontFamily: 'Black', color: FONTCOLOR }}>Here are Our Developers.</Text>
                                </View>


                                <ScrollView style={{ backgroundColor: BGCOLOR }} contentContainerStyle={{}} >
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        horizontal={false}
                                        numColumns={1}
                                        data={this.state.DeveloperList}
                                        renderItem={({ item, index }) => (
                                            <TouchableWithoutFeedback>
                                                <View style={{
                                                    padding: 5, justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <ContactCard
                                                        item={item}
                                                    />
                                                </View>

                                            </TouchableWithoutFeedback>
                                        )}
                                    />
                                </ScrollView>
                            </View>


                        </View>


                    </View>
                </ScrollView>
            </View>
        );
    }

    renderList(item, index) {
        return (
            <TouchableWithoutFeedback>
                <View style={{
                    width: width,
                    justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 20
                }}>
                    <ContactCard
                        item={item}
                    />

                </View>
            </TouchableWithoutFeedback>
        );
    }
}
export default About;

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
        marginVertical: 20,
        backgroundColor: BGCOLOR,
        //  alignItems: 'center'
    },
    card: {
        flex: 1,
        borderRadius: 5,
        elevation: 10,
        width: width * 0.95,
        backgroundColor: BGCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        margin: 5
    },
    text: {
        paddingTop: 10,
        fontWeight: 'normal',
        textAlign: 'justify',
        fontSize: 15,
        fontFamily: 'Light',
        color: FONTCOLOR,
        marginVertical: 10,

    },
    developerContainer: {
        flex: 1,
        backgroundColor: BGCOLOR,
        alignItems: 'flex-end',


    },
});