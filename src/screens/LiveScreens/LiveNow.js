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
    const { navigate } = this.props.navigation;

    return (

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={!this.handleRefresh}
          />}
      >

        <View style={{ backgroundColor: BGCOLOR }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: BGCOLOR }} >
            <TouchableOpacity onPress={() => navigate('Explore', {})} style={{ alignItems: "flex-start", }} >
              <View style={{ backgroundColor: BGCOLOR, width: 50, height: 50, borderRadius: 25, elevation: 6, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={'ios-arrow-back'} color={ICONCOLOR} size={40} style={{}} />
              </View>
            </TouchableOpacity>

            <Text style={{ padding: 12, fontSize: 25, fontFamily: 'Black', color: FONTCOLOR }}>
              All Shots
             </Text>

          </View>




          <View style={styles.contentContainer}>

            <View style={{backgroundColor: BGCOLOR,}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                numColumns={1}
                data={this.state.LiveList}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => this.renderList(item, index)}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                ListFooterComponent={this.renderFooter}
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
  },
  contentContainer: {
    flex: 1,
    paddingTop: 40,
    padding: 10,
    paddingBottom: 30,
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