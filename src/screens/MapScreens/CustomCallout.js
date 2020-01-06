import React from 'react';
import { StyleSheet, View, Text } from 'react-native';



class CustomCallout extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.bubble}>
          <View style={styles.content}>
           <Text style={{fontFamily:'Black', color:'white', textAlign:'center'}}>{this.props.title} </Text>
           <Text style={{fontFamily:'Light', color:'white', textAlign:'center'}}>
              {this.props.description}
            </Text>
          </View>
        </View>
        {/* <View style={styles.arrowBorder} />
        <View style={styles.arrow} /> */}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  bubble: {
    width: 200,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    borderColor: 'transparent', //'#007a87',
    borderWidth: 0.5,
  },
  content: {
    flex: 1,
    alignItems:'center'
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: 'white',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: 'white',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

export default CustomCallout;