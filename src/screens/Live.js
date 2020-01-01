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

            <Text style={{ marginBottom: 10, fontSize: 40, fontFamily: 'Black', color: FONTCOLOR }}>
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

          <View style={{ marginTop: 15, backgroundColor: BGCOLOR, height: height * 0.75 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.TitleNow}>
                <Text style={{ fontSize: 25, fontFamily: 'Black', color: FONTCOLOR }}>
                  See what's happening now.
              </Text>
              </View>

              <View style={{ backgroundColor: BGCOLOR, }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('LiveNow', {})} >
                  <View style={{ paddingTop: 16, backgroundColor: BGCOLOR, }}>
                    <Text style={{ color: ICONCOLOR, fontFamily: "Light", fontSize: 17, paddingRight: 5 }}>See All</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.nowCard}>
              {this.state.LiveList.length === 0 ?
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <LottieView source={require('../../assets/now.json')}
                    autoPlay loop
                    style={{ height: 100, width: 100, alignSelf: 'center' }}
                  />
                </View>
                :
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  numColumns={1}
                  data={this.state.LiveList}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => (
                    <TouchableWithoutFeedback>
                      <CardLive
                        nav={navigate}
                        cardTitle={item.title}
                        imageUrl={item.imageUrl}
                        time={item.time}
                      />
                    </TouchableWithoutFeedback>)}
                />
              }
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

  },
  TitleMain: {
    padding: 15,
    paddingTop: 70,
    height: 140,

    alignItems: 'center',

    // borderWidth:1,

    justifyContent: 'center',

  },

  TitleNow: {
    paddingLeft: 10,
    paddingTop: 10,
    maxWidth: width - 50,
    borderBottomColor: 'white',
    // borderWidth:1,
    backgroundColor: BGCOLOR,

  },
  nowCard: {
    backgroundColor: BGCOLOR,
    minHeight: 300
    // paddingLeft: 5
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

