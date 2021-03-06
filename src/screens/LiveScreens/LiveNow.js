import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
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

  componentDidMount() {
    this.events.onSnapshot((query) => {
      this.setState({ LiveList: [] })
      query.forEach((doc) => {
        this.setState({
          LiveList: this.state.LiveList.concat(doc.data())
        })
      })
    })
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
              contentContainerStyle={{ alignItems: 'center', flexDirection: 'column-reverse', paddingBottom: 18, paddingTop: 17, }}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={this.state.LiveList}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => this.renderList(item, index)}


              ListFooterComponent={
                <View style={{ padding: 10, }}>
                  <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: 'Black', color: ICONCOLOR, }}>
                    Feed
              </Text>
                </View>
              }


            />
          </View>
        }


        <View style={{ position: 'absolute', left: -10 }}>
          <BackButton navigation={navigation} />

        </View>
        <View style={{ position: 'absolute', right: 5, top: 35 }}>
          <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', height: 20, backgroundColor: 'transparent' }} onPress={() => this.props.navigation.navigate('Feed')} activeOpacity={.7}>

            <Text style={{ fontFamily: "Black", fontSize: 20, color: ICONCOLOR, }} >Mixtape</Text>
            <Icon name="ios-arrow-forward" size={25} color="#E55656" style={{ marginLeft: 5 }} />

          </TouchableOpacity>
        </View>

      </View>
    );
  }

  renderList(item, index) {
    return (
      <CardLive
        width={width - 10}
        cardTitle={item.title}
        imageUrl={item.imageUrl}
        time={item.time}
        date={item.date.replace("/2020", "")}
      />

    )

  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.makeRequest();
    })
  }
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