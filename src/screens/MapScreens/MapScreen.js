import {
  Alert,
  Animated,
  AppRegistry,
  Dimensions,
  PermissionsAndroid,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import React, { Component } from "react";

import BackButton from '../../components/RoundedBackButton';
import CustomCallout from "./CustomCallout";
import Geolocation from "react-native-geolocation-service";
import { ICONCOLOR } from "../../Styles/Colors";
import { markers } from "./Markers";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 50;
const CARD_WIDTH = 120;



async function requestLocationPermission() {
  try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
              title: 'Location Permission',
              message:
                  'Dyuksha App needs access to your location ',

              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
          },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
  } catch (err) {
      console.warn(err);
  }
}

export default class MapScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      coordinates: [],
      error: null,
      marginBottom: 1,
      markers: markers,
      region: {
        latitude: 10.822050,
        longitude: 76.643335,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      },

    }

  }

  async componentDidMount() {

       await requestLocationPermission();
       
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });

    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        });
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    );

    Geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        });
      },
      error => {
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 0
      }
    );

  }


  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  onMarkerPress(text) {
  }


  render() {
    const { navigation } = this.props;

    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.2, 1, 0.2],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });


    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={{ flex: 1, marginBottom: this.state.marginBottom }}
          mapType={'satellite'}
          showsMyLocationButton={true}
          onMapReady={this.onMapReady}
          showsUserLocation={true}
          followsUserLocation={true}

        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };

            return (
              <View>
                <MapView.Marker description={marker.description} onPress={(e) => { e.stopPropagation(); this.onMarkerPress(marker.title) }} key={index} coordinate={marker.coordinate}>
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <CustomCallout description={marker.description} title={marker.title} />
                    <View style={styles.marker} />
                  </Animated.View>
                </MapView.Marker>

                {/* {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                  coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
                  title={"Your Location"}
                />} */}


              </View>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>

              <View style={styles.textContent}>
                <Text style={styles.cardtitle}>{marker.title}</Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        <View style={{ left: -10, position: 'absolute', top: -10 }}>
          <BackButton navigation={navigation} />
        </View>

      </View>
    );
  }

  onMapReady = () => this.setState({ marginBottom: 0 })
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 6,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    height: 50,
    minWidth: 100,
    //overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 10,
    color: ICONCOLOR,
    fontFamily: 'Black'
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
  ring: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "white",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});
