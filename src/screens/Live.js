import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import LiveNow from "./LiveScreens/LiveNow";
import { BGCOLOR, FONTCOLOR } from "../Styles/Colors";
import Scoreboard from "./LiveScreens/Scoreboard";
import AllPosts from "./LiveScreens/AllPosts";
import Memories from "./LiveScreens/Memories";


const { height, width } = Dimensions.get('window')
class Live extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>

          <View style={styles.TitleMain}>
          <View style={{elevation:10}}>
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
              <AllPosts />  
            </View>
          </View>

          <View tyle={styles.nowContainer}>
            <View style={styles.TitleNow}>
              <Text style={{ marginBottom: 0, fontSize: 30, fontFamily: 'Black', color: FONTCOLOR }}>
                See what's happening now.
              </Text>
            </View>
            <View style={{}}>
              <LiveNow />
            </View>
          </View>

          <View style={{ height: height + 350 }}>
            <View style={styles.TitleMemory}>
              <Text style={{ marginBottom: 0, fontSize: 14, fontFamily: 'Light', color: FONTCOLOR }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </Text>
            </View>

            <View style={{ padding:15, backgroundColor:BGCOLOR, paddingBottom:5}}>
            <Text style={{  fontSize: 20, fontFamily: 'Black', color: FONTCOLOR }}>
              Glance back to Dyuksha 18.
              </Text>
            </View>
           

            <Memories />

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
    width: width,
   
    alignItems: 'center',
    borderBottomColor: 'white',
    // borderWidth:1,
    backgroundColor: BGCOLOR,
    justifyContent: 'center',
  },

  TitleNow: {
    paddingLeft: 5,
    paddingTop: 70,
    height: 140,
    width: width - 5,
    alignItems: 'center',
    borderBottomColor: 'white',
    // borderWidth:1,
    backgroundColor: BGCOLOR,
    justifyContent: 'center',
  },
  nowContainer: {
    flex: 1,
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
    height: 400,
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
    height: 450
  },
});