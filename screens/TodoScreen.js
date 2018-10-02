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
import TodoCalendar from "../components/TodoCalendar";
import TodoList from "../components/TodoList";
import TodoFormModal from "../components/TodoFormModal";

export default class TodoScreen extends React.Component {
  static navigationOptions = {
    title: 'Todo View',
  };

  render() {
    return (
      <View style={{flex:1}}>
        <TodoFormModal />
        {/* <TodoList/> */}
        {/* <TodoCalendar/> */}
      </View>
    );
  }
}
