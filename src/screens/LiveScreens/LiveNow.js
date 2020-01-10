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
    this.makeRequest();

  }

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;

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
              contentContainerStyle={{ flexDirection: 'column-reverse', paddingBottom: 18, paddingTop: 60, }}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={this.state.LiveList}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => this.renderList(item, index)}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}

              // ListFooterComponent={
              //   <View style={{ padding: 10, }}>
              //     <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: 'Black', color: ICONCOLOR, }}>
              //       Live Now
              // </Text>

              //   </View>
              // }

            />
          </View>
        }


        <View style={{ position: 'absolute', left: -10 }}>
          <BackButton navigation={navigation} />

        </View>
        <View style={{ position: 'absolute', right: 5,top: 31 }}>
          <TouchableOpacity style={{alignItems:'center', flexDirection: 'row', height: 20, backgroundColor: 'white' }} onPress={() => this.props.navigation.navigate('Feed')} activeOpacity={.7}>

            <Text style={{ fontFamily: "Black", fontSize: 20, color: ICONCOLOR, }} > Feed</Text>
            <Icon name="ios-arrow-forward" size={25} color="#E55656" style={{ marginLeft: 5 }} />

          </TouchableOpacity>
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
            cardTitle={item.title}
            imageUrl={item.imageUrl}
            time={item.time}
          />
        </View>
      </View>

    );
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