import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import { BGCOLOR, FONTCOLOR } from "../Styles/Colors"
import CardLive from "../components/CardLive";


const { height, width } = Dimensions.get('window')

class Live extends Component {
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} >
        <View >
          <View style={styles.headerContainer}>
            <Text style={{ marginBottom: 10, fontSize: 40, fontFamily: 'Black', color: FONTCOLOR }}>
              See what's happening now.
          </Text>
          </View>

          <View style={styles.contentContainer}>

           <CardLive imageUrl={'https://source.unsplash.com/1024x768/?fire'} cardTitle={'Event Title'} time={'10 mins ago'} />
           <CardLive imageUrl={'https://source.unsplash.com/1024x768/?heart'} cardTitle={'Workshop'} time={'15 mins ago'} />
           <CardLive imageUrl={'https://source.unsplash.com/1024x768/?water'} cardTitle={'Event Title'} time={'10 mins ago'} />
           <CardLive imageUrl={'https://source.unsplash.com/1024x768/?black'} cardTitle={'Workshop'} time={'15 mins ago'} />
           <CardLive imageUrl={'https://source.unsplash.com/1024x768/?yellow'} cardTitle={'Event Title'} time={'10 mins ago'} />
           <CardLive imageUrl={'https://source.unsplash.com/1024x768/?forest'} cardTitle={'Workshop'} time={'15 mins ago'} />

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


  },
  headerContainer: {
    padding: 15,
    paddingTop: 70,
    height: 140,
    width: width - 5,
    alignItems: 'center',
    borderBottomColor: 'white',
    // borderWidth:1,
    backgroundColor: BGCOLOR,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: BGCOLOR, //'white',
    paddingBottom: 100
  },
  cardContainer: {
    alignItems: 'center',
    margin: 15,
    borderRadius: 8,
    borderWidth: 0,
    height: 300,
    width: width - 30,
    elevation: 15,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 0,
    height: 300,
    width: width - 30
  },
  cardHeader: {
    borderWidth: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 50,
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'white'
  },
  cardTitle: {
    width: 100
  },
  cardContent: {
    flex: 1,
    backgroundColor: BGCOLOR, //'yellow'
    borderRadius: 8
  },

});