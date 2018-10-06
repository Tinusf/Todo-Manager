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

  constructor(props) {
    super(props);
    this.state = {
      showCalendar: true,
      nextId: 5,
      // Uncomment for example todos!
      todos: [
        // { id: 1, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false }, { id: 2, text: "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ", date: "2018-10-04", category: "fun", completed: true }, { id: 3, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false }, { id: 4, text: "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ", date: "2018-10-04", category: "fun", completed: true }
       ]
    };
  }
  addNewTodo = (text, date, category) => {
    // Legg til ett nytt todo objekt i staten vår. Og øk nextId med 1.
    this.setState(prevState => ({
      todos: [...prevState.todos, {"id": prevState.nextId, "text": text, "date": date, "category": category, "completed": false}],
      nextId: prevState.nextId + 1
    }));
  }
/**
 * Den viser enten stor kalender og liten todoliste, eller bare stor todoliste.
 * I tillegg viser den alltid TodoFormModal som er + knappen for å lage nye todos. Den gir en modal, som er en stor popup. 
 */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calOrList}>
          {!this.state.showCalendar && <TodoList todos={this.state.todos}/>}
          {this.state.showCalendar && <TodoCalendar todos={this.state.todos}/>}
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
    ...StyleSheet.absoluteFillObject
  },
  btnAndModal: {
    ...StyleSheet.absoluteFillObject
  }
});