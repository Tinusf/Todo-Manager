import React from 'react';
import {
    StyleSheet, View, Text
  } from 'react-native';
import Colors from '../constants/Colors';

export default class ProgressBar extends React.Component {
  render() {
    return (
      <View style={styles.outerBar}>
          <View style={{backgroundColor: Colors.tintColor, borderRadius: 5, height: 15, width: this.props.percentage + "%"}}>
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    outerBar: {
      backgroundColor: "gray",
      borderRadius: 5,
      width: "92%",
      margin: "4%"
    }
  });
