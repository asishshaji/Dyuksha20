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

import firebase, { firestore } from 'react-native-firebase';


import { BGCOLOR, FONTCOLOR } from "../Styles/Colors";
import Today from "./LiveScreens/Today";
import Memories from "./LiveScreens/Memories";
import CardLive from "../components/CardLive";


const { height, width } = Dimensions.get('window')

class Live extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor() {
    super()
    this.events = firestore().collection('Live');
    this.state = {
      LiveList: [],
    }
  }

  componentDidMount() {
    this.events.limit(3).onSnapshot(querySnapshot => {
      this.setState({
        LiveList: []

      });

      querySnapshot.forEach(doc => {
        this.setState({

          LiveList: this.state.LiveList.concat(doc.data())

        });
      });
    });
  }

  render() {


    const navigate = this.props.navigation; // should navigate from today to details

    return (
      <ScrollView style={{ flex: 1, backgroundColor: BGCOLOR }} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.TitleMain}>
            <View style={{ elevation: 10 }}>
              <Text style={{ marginBottom: 10, fontSize: 40, fontFamily: 'Black', color: FONTCOLOR }}>
                Dyuksha 20
              </Text>
            </View>
          </View>

          <View style={styles.todayContainer}>
            <View style={styles.TitleToday}>
              <Text style={{ fontSize: 25, fontFamily: 'Black', color: FONTCOLOR, }}>
                Today
              </Text>
            </View>
            <View>
              {/* more than 6 is not swipable */}
              <Today navigation={navigate} />
            </View>
          </View>

          <View style={styles.nowContainer}>
            <View style={styles.TitleNow}>
              <Text style={{ fontSize: 30, fontFamily: 'Black', color: FONTCOLOR }}>
                See what's happening now.
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end', backgroundColor: BGCOLOR }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('LiveNow', {})} >
                <View style={{ paddingTop: 10, backgroundColor: BGCOLOR, width: 80, justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Text style={{ color: FONTCOLOR, fontFamily: "Light", fontSize: 17, padding: 5 }}>See All</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: BGCOLOR }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                numColumns={1}
                data={this.state.LiveList}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => this.renderList(item, index)}
              />
            </View>
          </View>



          <View style={{ height: height }}>
            <View style={styles.TitleMemory}>
              <Text style={{ marginBottom: 0, fontSize: 14, fontFamily: 'Light', color: FONTCOLOR }}>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </Text>
            </View>
            <View style={{ padding: 15, backgroundColor: BGCOLOR, paddingBottom: 5 }}>
              <Text style={{ fontSize: 20, fontFamily: 'Black', color: FONTCOLOR }}>
                Glance back to Dyuksha 18.
              </Text>
            </View>
            <Memories />
          </View>
        </View>
      </ScrollView>

    );
  }


  renderList(item, index) {
    return (
      <TouchableWithoutFeedback>
        <CardLive
          cardTitle={item.title}
          imageUrl={item.imageUrl}
          time={item.time}
        />
      </TouchableWithoutFeedback>
    );
  }
}
export default Live;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',

  },
  TitleMain: {
    padding: 15,
    paddingTop: 70,
    height: 140,
    width: width,

    alignItems: 'center',
    borderBottomColor: 'white',
    // borderWidth:1,
    backgroundColor: BGCOLOR,
    justifyContent: 'center',
  },

  TitleNow: {
    paddingLeft: 5,
    paddingTop: 0,
    height: 70,
    width: width - 5,
    alignItems: 'center',
    borderBottomColor: 'white',
    // borderWidth:1,
    backgroundColor: BGCOLOR,

  },
  TitleToday: {
    padding: 10,
    paddingTop: 15,
    width: 40,
    backgroundColor: BGCOLOR,
  },
  TitleMemory: {
    padding: 15,
    paddingTop: 20,
    height: 110,
    width: width - 5,
    alignItems: 'center',
    borderBottomColor: 'white',
    // borderWidth:1,
    backgroundColor: BGCOLOR,
    justifyContent: 'center',
  },
  todayContainer: {
    flex: 1,
    flexDirection: 'row',
    width: width,
    backgroundColor: BGCOLOR,
    height: 420
  },
});

