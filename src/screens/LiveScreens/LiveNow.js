import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import { BGCOLOR, FONTCOLOR } from "../../Styles/Colors"
import CardLive from "../../components/CardLive";


const { height, width } = Dimensions.get('window')

let cardList = [
  { "cardTitle": "Events", "time": "2 mins ago", "imageUrl": 'https://source.unsplash.com/1024x768/?people' },
  { "cardTitle": "Workshops", "time": "4 mins ago", "imageUrl": 'https://source.unsplash.com/1024x768/?white' },
  { "cardTitle": "Anonymous", "time": "6 mins ago", "imageUrl": 'https://source.unsplash.com/1024x768/?fire' },
  { "cardTitle": "Workshops", "time": "8 mins ago", "imageUrl": 'https://source.unsplash.com/1024x768/?girl' },
  { "cardTitle": "Title", "time": "10 mins ago", "imageUrl": 'https://source.unsplash.com/1024x768/?happy' },
  { "cardTitle": "Workshops", "time": "12 mins ago", "imageUrl": 'https://source.unsplash.com/1024x768/?sad' },
  { "cardTitle": "Title", "time": "14 mins ago", "imageUrl": 'https://source.unsplash.com/1024x768/?person' },
  { "cardTitle": "Events", "time": "16 mins ago", "imageUrl": 'https://source.unsplash.com/1024x768/?happy' },
  { "cardTitle": "Workshops", "time": "18 mins ago", "imageUrl": 'https://source.unsplash.com/1024x768/?kid' },

]

class LiveNow extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true, 
      data: "", 
      refreshing: false }
  }

  render() {

    handleRefresh = () => {
      this.setState({
        refreshing: true,
      }, () => {    })
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false} >
        <View>
         

          <View style={styles.contentContainer}>

            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                numColumns={1}
                data={cardList}
                keyExtractor={item => item.id}
                extraData={cardList}
                renderItem={({ item, index }) => this.renderList(item, index)}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            </View>

          </View>
        </View>
      </ScrollView>
    );
  }

  renderList(item, index) {

    return (
      <TouchableWithoutFeedback>

        <CardLive
          cardTitle={item['cardTitle']}
          imageUrl={item['imageUrl']}
          time={item['time']}
        />


      </TouchableWithoutFeedback>
    );
  }

}
export default LiveNow;

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
    paddingLeft:5,
    paddingBottom:30,
    backgroundColor: BGCOLOR, //'white',
    
  },

});