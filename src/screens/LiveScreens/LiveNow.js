import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import firebase, { firestore } from 'react-native-firebase';
import { BGCOLOR, FONTCOLOR } from "../../Styles/Colors"
import CardLive from "../../components/CardLive";


const { height, width } = Dimensions.get('window')

class LiveNow extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.events = firestore().collection('Live');
    this.state = {
      isLoading: true,
      LiveList: [],
    
    }
  }


  componentDidMount() {
    this.events.onSnapshot(querySnapshot => {
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
    const {navigate} = this.props.navigation;

    return (
      <ScrollView showsVerticalScrollIndicator={false} >
        <View>

        <View style={{ position:'absolute', zIndex:1000, backgroundColor: BGCOLOR, padding:8, paddingTop:20 }} >
            <TouchableOpacity onPress={() => navigate('Explore',{} )}  >
              <View style={{ backgroundColor: BGCOLOR, width: 50, height: 50, left: 7, justifyContent: 'center' }}>
                <Icon name={'ios-arrow-back'} color={'white'} size={40} style={{}} />
              </View>
            </TouchableOpacity>
          </View>


          <View style={{ paddingTop: 100, alignItems: 'center', justifyContent: 'center', height: 200, backgroundColor: BGCOLOR, }}>
            <Text style={{ fontSize: 45, fontFamily: 'Black', color: FONTCOLOR }}>
              All Shots
              </Text>
          </View>

          <View style={styles.contentContainer}>

            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                numColumns={1}
                data={this.state.LiveList}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => this.renderList(item, index)}
               
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
          cardTitle={item.title}
          imageUrl={item.imageUrl}
          time={item.time}
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
  // headerContainer: {
  //   padding: 15,
  //   paddingTop: 70,
  //   height: 140,
  //   width: width - 5,
  //   alignItems: 'center',
  //   borderBottomColor: 'white',
  //   // borderWidth:1,
  //   backgroundColor: BGCOLOR,
  //   justifyContent: 'center',
  // },
  contentContainer: {
    flex: 1,
    paddingTop: 40,
    padding: 10,
    paddingBottom: 30,
    backgroundColor: BGCOLOR, //'white',

  },

});