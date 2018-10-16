import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';
import TodoCalendar from "../components/TodoCalendar";
import { Platform } from 'react-native';
import { Icon } from 'expo';
import Colors from '../constants/Colors';

import TodoList from "../components/TodoList";
import Swiper from 'react-native-swiper';
import TodoActionButton from "../components/TodoActionButton";
import HeaderButton from "../components/HeaderButton";
import TabBarIcon from '../components/TabBarIcon';


export default class TodoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    if(Platform.OS === 'ios'){
      return {
        headerTitle: "Todos",
        headerRight: <Icon.Ionicons
        name="ios-add"
        size={40}
        onPress={() => navigation.navigate("TodoFormModal")} 
        style={{paddingLeft: 10, paddingRight: 10 }}
        color={Colors.tintColor}
      />
      };
    }
    return {
      headerTitle: "Todos",
    };
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
        <Swiper activeDotColor={Colors.tintColor} loop={false}>
          <TodoCalendar toggleTodoStatus={this.toggleTodoStatus} deleteTodo={this.deleteTodo}/>
          <ScrollView style={this.fullTodoList}>
            <TodoList toggleTodoStatus={this.toggleTodoStatus} deleteTodo={this.deleteTodo} chosenCategory="work" />
            <TodoList toggleTodoStatus={this.toggleTodoStatus} deleteTodo={this.deleteTodo} chosenCategory="school" />
            <TodoList toggleTodoStatus={this.toggleTodoStatus} deleteTodo={this.deleteTodo} chosenCategory="fun" />
            <TodoList toggleTodoStatus={this.toggleTodoStatus} deleteTodo={this.deleteTodo} chosenCategory="other" />
          </ScrollView>
        </Swiper>
        {Platform.OS !== 'ios' && <TodoActionButton navigate={this.props.navigation.navigate} setCategoryChosen={this.setCategoryChosen}/>}
          
      </View>
   );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  fullTodoList: {
    height: "100%",
  },
  swipe: {

  },
  absoluteAndFill: {
    //...StyleSheet.absoluteFillObject,
  },
});