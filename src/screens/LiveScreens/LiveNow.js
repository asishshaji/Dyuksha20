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
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import firebase, { firestore } from 'react-native-firebase';
import { BGCOLOR, FONTCOLOR, ICONCOLOR } from "../../Styles/Colors"
import CardLive from "../../components/CardLive";
import BackButton from '../../components/RoundedBackButton';


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
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 60 }}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={this.state.LiveList}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => this.renderList(item, index)}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          ListFooterComponent={this.renderFooter}
        />
        <BackButton navigation={navigation} />

      </View>
    );
  }

  renderList(item, index) {
    return (
      <CardLive
        cardTitle={item.title}
        imageUrl={item.imageUrl}
        time={item.time}
      />
    );
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.makeRequest();
    })
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={styles.headerBg}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

}
export default LiveNow;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BGCOLOR
  },
  contentContainer: {
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