import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import TodoCalendar from "../components/TodoCalendar";
import TodoList from "../components/TodoList";
import TodoFormModal from "../components/TodoFormModal";
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
      nextId: 5,
      // Uncomment for example todos!
      todos: [
      //   { id: 1, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false }, { id: 2, text: "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ", date: "2018-10-04", category: "fun", completed: true }, { id: 3, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false }, { id: 4, text: "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ", date: "2018-10-04", category: "fun", completed: true }
       ]
    };
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
          <TodoCalendar todos={this.state.todos}/>
          <TodoList todos={this.state.todos}/>
        </Swiper>
          <TodoActionButton toggleModal={this.toggleModal} setCategoryChosen={this.setCategoryChosen}/>
          <TodoFormModal style={styles.absoluteAndFill} addNewTodo={this.addNewTodo}
           toggleModal={this.toggleModal} isModalVisible={this.state.isModalVisible}/>
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
    ...StyleSheet.absoluteFillObject,
  },
});