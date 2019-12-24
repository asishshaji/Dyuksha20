import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import CardLive from "../components/CardLive";

import { BGCOLOR, FONTCOLOR } from "../Styles/Colors";

import firebase, { firestore } from 'react-native-firebase';



const { height, width } = Dimensions.get('window')
class Live extends Component {

  constructor() {
    super()
    this.events = firestore().collection('Event');

    this.state = {
      bannerList: [],
      primeEventsList: []

    }

  }

  componentDidMount() {
    this.events.limit(5).onSnapshot(querySnapshot => {
      this.setState({
        primeEventsList: []
      });

      querySnapshot.forEach(doc => {
        this.setState({
          primeEventsList: this.state.primeEventsList.concat(doc.data())
        });
      });
    });
  }
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: BGCOLOR }} showsVerticalScrollIndicator={false}>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 30, fontFamily: 'Black', color: FONTCOLOR }}>
            See what's happening now.
          </Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => String(index)}
          data={this.state.primeEventsList}
          renderItem={({ item }) => (
            <CardLive
              cardTitle={item.title}
              imageUrl={item.imageUrl}
              time={item.date}
            />
          )}
        />
      </ScrollView>

    );
  }



}
export default Live;
