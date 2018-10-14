import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import TodoCalendar from "../components/TodoCalendar";
import TodoList from "../components/TodoList";
import Swiper from 'react-native-swiper';
import TodoActionButton from "../components/TodoActionButton";


export default class TodoScreen extends React.Component {
  static navigationOptions = {
    title: 'Todo View',
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      showCalendar: true,
      nextId: 4,
      // Uncomment for example todos!
      //todos: [
        // { id: 0, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false }, { id: 1, text: "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ", date: "2018-10-04", category: "fun", completed: true }, { id: 2, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false }, { id: 3, text: "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ", date: "2018-10-04", category: "fun", completed: true }
      // ]
    };
  }

  deleteTodo = (id) => {
    const todos = this.state.todos;
    delete todos[id];
    this.setState({
      todos: todos,
    });
  }

  toggleTodoStatus = (id) => {
    // Toggler statusen til todo'en.
    const todos = this.state.todos;
    todos[id]["completed"] = !todos[id]["completed"];
    this.setState({
      todos: todos,
    });
  }


  setCategoryChosen = (category) => {
    this.setState({category: category});
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.absoluteAndFill} loop={false}>
          <TodoCalendar toggleTodoStatus={this.toggleTodoStatus} deleteTodo={this.deleteTodo}/>
          <TodoList toggleTodoStatus={this.toggleTodoStatus} deleteTodo={this.deleteTodo}/>
        </Swiper>
        <TodoActionButton navigate={this.props.navigation.navigate} setCategoryChosen={this.setCategoryChosen}/>
          
      </View>
   );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  swipe: {

  },
  absoluteAndFill: {
    //...StyleSheet.absoluteFillObject,
  },
});