import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Linking
} from "react-native";
import { BGCOLOR, FONTCOLOR, ICONCOLOR } from "../../Styles/Colors"
import React, { Component } from "react";
import firebase, { firestore } from 'react-native-firebase';
import Axios from 'axios';

import BackButton from '../../components/RoundedBackButton';
import CardLive from "../../components/CardLive";
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

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
      refreshing: false
    }
  }

  async instagramPhotos() {
    // It will contain our photos' links
    const res = []

    try {
      const userInfoSource = await Axios.get('https://www.instagram.com/theraloss/')

      // userInfoSource.data contains the HTML from Axios
      const jsonObject = userInfoSource.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)

      const userInfo = JSON.parse(jsonObject)

      // Retrieve only the first 10 results
      const mediaArray = userInfo.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 20).reverse()
      for (let media of mediaArray) {
        const node = media.node
        console.log(node)
        // Process only if is an image
        // Push the thumbnail src in the array
        res.push(node)
      }
    } catch (e) {
      console.error('Unable to retrieve photos. Reason: ' + e.toString())
    }

    this.setState({
      LiveList: res,
      isLoading: false,
      refreshing: false
    });
    return res
  }



  makeRequest = () => {
    this.events.onSnapshot(querySnapshot => {
      this.setState({
        LiveList: [],
        isLoading: false,
        refreshing: false
      });

      querySnapshot.forEach(doc => {
        this.setState({
          LiveList: this.state.LiveList.concat(doc.data())
        });
      });
    });
  }


  async componentDidMount() {
    //this.makeRequest();
    this.instagramPhotos();
  }

  render() {
    const { navigation } = this.props;


    return (
      <View style={{ flex: 1, backgroundColor: BGCOLOR, }}>

        {this.state.LiveList.length === 0 ?
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <LottieView source={require('../../../assets/loading.json')}
              autoPlay loop
              style={{ height: 100, width: 100, alignSelf: 'center' }}
            />
          </View>
          :
          <View style={{ flex: 1, }}>

            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexDirection: 'column-reverse', paddingBottom: 18, paddingTop: 15, }}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={this.state.LiveList}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => this.renderList(item, index)}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}

              ListFooterComponent={
                <View style={{ padding: 10, }}>
                  <Text style={{ textAlign: 'right', fontSize: 25, fontFamily: 'Black', color: ICONCOLOR, }}>
                    Feed
              </Text>
                </View>
              }

              ListHeaderComponent={
                <View style={{ marginTop: 15, alignItems: 'center',justifyContent:'center' }}>
                  <View style={{flexDirection:'row', alignItems:'center'}} >
                  <Icon name="logo-instagram" size={25} color={FONTCOLOR} style={{ padding: 5 }} onPress={() => Linking.openURL('https://www.instagram.com/d20.mixtape/')} />
                    <Text style={{ color: FONTCOLOR, fontSize: 15, fontFamily: 'Light' }} onPress={() => Linking.openURL('https://www.instagram.com/d20.mixtape/')} >
                      @d20.mixtape
                   </Text>
                  </View>
                </View>
              }
            />
          </View>
        }


        <View style={{ position: 'absolute', left: -10 }}>
          <BackButton navigation={navigation} />
        </View>

      </View>
    );
  }

  renderList(item, index) {
    return (
      <View>
        {/* {console.log(this.state.LiveList)} */}
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <CardLive
            width={width - 10}
            cardTitle={item.owner.username}
            imageUrl={item.thumbnail_src}
            like={item.edge_liked_by.count}
            timestamp={item.taken_at_timestamp}
          /></View>
        <View style={styles.cardFooter}>
          <Text style={{ fontFamily: 'Black', paddingLeft: 5 }}>
            {item.edge_liked_by.count} likes
          </Text>
          <Text style={{ flex: 1, textAlign: 'right', fontFamily: 'Light', paddingLeft: 20 }} onPress={() => Linking.openURL('https://www.instagram.com/p/' + item.shortcode)} >
            view post
          </Text>

        </View>



      </View>

    );
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.instagramPhotos();
    })
  }

  // renderFooter = () => {
  //   if (!this.state.loading) return null;

  //   return (
  //     <View style={{ padding: 10, }}>
  //       <Text style={{ textAlign: 'right', fontSize: 25, fontFamily: 'Black', color: ICONCOLOR, }}>
  //         Feed
  //             </Text>
  //     </View>
  //   );
  // };

}
export default LiveNow;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BGCOLOR
  },
  contentContainer: {
    marginTop: 15,
    flex: 1,
    backgroundColor: BGCOLOR, //'white',

  },
  headerBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BGCOLOR,
    height: 50,
  },
  cardFooter: {
    paddingLeft: 10,
    flexDirection: 'row',

    elevation: 5,
    height: 30,
    width: width - 10
  },

});