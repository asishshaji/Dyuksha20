import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback, StyleSheet, ImageBackground

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
            <ImageBackground source={require('../../assets/livebg.jpg')} style={{ width: width, flex: 1, backgroundColor: BGCOLOR }} />
            <View style={{position:"absolute", right:10,top:70}} >
              <Text style={{ marginBottom: 10, fontSize: 40, fontFamily: 'Black', color: BGCOLOR }}>
                Schedule
              </Text>
            </View>
          </View>

          <View style={styles.todayContainer}>
            <View style={styles.TitleToday}>
              <Text style={{ fontSize: 22, fontFamily: 'Black', color: ICONCOLOR, }}>
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
    paddingBottom: 100
  },
  TitleMain: {
    height: 140,
   
  },


  TitleToday: {
    padding: 10,
    paddingTop: 15,
    backgroundColor: BGCOLOR,
  },
  todayContainer: {
    flex: 1,
    marginTop:20,
    flexDirection: 'column',
    width: width,
    backgroundColor: BGCOLOR,

  },
});

