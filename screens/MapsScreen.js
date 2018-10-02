import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

export default class MapsScreen extends React.Component {
  static navigationOptions = {
    title: 'Maps view',
  };

  render() {
    return (
      <Text>Maps screen</Text>
    );
  }
}