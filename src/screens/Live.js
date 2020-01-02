import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback, StyleSheet

} from "react-native";

import LottieView from 'lottie-react-native';
import firebase, { firestore } from 'react-native-firebase';


import { BGCOLOR, FONTCOLOR, ICONCOLOR } from "../Styles/Colors";
import Today from "./LiveScreens/Today";



const { height, width } = Dimensions.get('window')

class Live extends Component {

  static navigationOptions = {
    header: null,
  }

  render() {


    const navigate = this.props.navigation; // should navigate from today to details

    return (
      <ScrollView style={{ flex: 1, backgroundColor: BGCOLOR }} contentContainerStyle={{}} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.TitleMain}>
            <Text style={{ marginBottom: 10, fontSize: 40, fontFamily: 'Black', color: ICONCOLOR }}>
              Schedule
              </Text>
          </View>

          <View style={styles.todayContainer}>
            <View style={styles.TitleToday}>
              <Text style={{ fontSize: 25, fontFamily: 'Black', color: FONTCOLOR, }}>
                Today
              </Text>
            </View>
            <View style={{ minHeight: 130 }}>
              <Today navigation={navigate} />
            </View>
          </View>

         
        </View>
      </ScrollView>

    );
  }

}
export default Live;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom:100
  },
  TitleMain: {
    padding: 15,
    paddingTop: 70,
    height: 140,

    alignItems: 'center',

    // borderWidth:1,

    justifyContent: 'center',

  },


  TitleToday: {
    padding: 10,
    paddingTop: 15,
    backgroundColor: BGCOLOR,
  },
  todayContainer: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    backgroundColor: BGCOLOR,

  },
});

