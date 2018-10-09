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
      todos: [
         { id: 0, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false }, { id: 1, text: "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ", date: "2018-10-04", category: "fun", completed: true }, { id: 2, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false }, { id: 3, text: "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ", date: "2018-10-04", category: "fun", completed: true }
       ]
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

  addNewTodo = (text, date) => {
    // Legg til ett nytt todo objekt i staten vår. Og øk nextId med 1.
    this.setState(prevState => ({
      todos: [...prevState.todos, {"id": prevState.nextId, "text": text, "date": date, "category": this.state.category, "completed": false}],
      nextId: prevState.nextId + 1
    }));
  }

  toggleModal = () => {
    // clear the text and date aswell as to toggle whether the modal is visible or not.
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  setCategoryChosen = (category) => {
    this.setState({category: category});
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.absoluteAndFill} loop={false}>
          <TodoCalendar todos={this.state.todos} toggleTodoStatus={this.toggleTodoStatus} deleteTodo={this.deleteTodo}/>
          <TodoList todos={this.state.todos} toggleTodoStatus={this.toggleTodoStatus} deleteTodo={this.deleteTodo}/>
        </Swiper>
        <TodoActionButton onClick={this.props.navigation.navigate} toggleModal={this.toggleModal} setCategoryChosen={this.setCategoryChosen}/>
          
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