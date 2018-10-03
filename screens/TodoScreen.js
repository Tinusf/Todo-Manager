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
    // header: null,
  };

  constructor(props) {
    super(props);
    this.state = { showCalendar: false }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calOrList}>
          {!this.state.showCalendar && <TodoList/>}
          {this.state.showCalendar && <TodoCalendar/>}
        </View>
        <TodoFormModal style={styles.btnAndModal} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  calOrList: {
    position: 'absolute',
  },
  btnAndModal: {
    position: 'absolute'
  }
});