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
    this.state = {
      showCalendar: false,
      nextId: 3,
      todos: [{ id: 1, text: "kjøp melk", date: "2018-10-04", category: "work", completed: false }, { id: 2, text: "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ", date: "2018-10-05", category: "work", completed: true }
      ]
    };
  }
  addNewTodo = (text, date) => {
    console.log(text + date);
    this.setState(prevState => ({
      todos: [...prevState.todos, {"id": prevState.nextId, "text": text, "date": date, "category": "work", "completed": false}],
      nextId: prevState.nextId + 1
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calOrList}>
          {!this.state.showCalendar && <TodoList todos={this.state.todos} />}
          {this.state.showCalendar && <TodoCalendar/>}
        </View>
        <TodoFormModal addNewTodo={this.addNewTodo} style={styles.btnAndModal} />
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
    width: '100%'
  },
  btnAndModal: {
    position: 'absolute'
  }
});