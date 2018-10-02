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

export default class TodoScreen extends React.Component {
  static navigationOptions = {
    title: 'Todo View',
  };

  render() {
    return (
      <Text>Todo screen</Text>
    );
  }
}
