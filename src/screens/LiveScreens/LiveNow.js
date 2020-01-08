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
  View
} from "react-native";
import { BGCOLOR, FONTCOLOR, ICONCOLOR } from "../../Styles/Colors"
import React, { Component } from "react";
import firebase, { firestore } from 'react-native-firebase';

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

  componentDidMount() {
    this.makeRequest();
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
              contentContainerStyle={{ flexDirection: 'column-reverse', paddingBottom: 18, paddingTop: 15,  }}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={this.state.LiveList}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => this.renderList(item, index)}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              ListFooterComponent={<View style={{ padding: 10,  }}>
                <Text style={{ textAlign: 'right', fontSize: 25, fontFamily: 'Black', color: ICONCOLOR, }}>
                  Feed
              </Text>
              </View>}
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
      <View style={{ marginTop: 10,alignItems:'center' }}>

        <CardLive
          width={width - 10}
          cardTitle={item.title}
          imageUrl={item.imageUrl}
          time={item.time}
        /></View>
    );
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.makeRequest();
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

});