import React from 'react';
import {
  ScrollView, View, Text, Dimensions
} from 'react-native';
import TodoElement from "./TodoElement";

/**
 * Denne klassen lager en liste med TodoElements. For så å legge de i et
 * ScrollView.
 */

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Om du ikke har valgt en chosenDay så skal du få en liste av alle todosene, om du har valgt en chosenDay så skal du bare få de todosene med date som er chosenDay.
    let todos = this.props.todos.map((todo) => {
      if (!this.props.chosenDay || (this.props.chosenDay && this.props.chosenDay === todo["date"])) {
        return (
          <TodoElement 
          key={todo["id"]}
          id={todo["id"]}
          text={todo["text"]}
          date={this.props.smallWindow ? undefined : todo["date"]}
          completed={todo["completed"]}
          category={todo["category"]} 
          toggleTodoStatus={this.props.toggleTodoStatus}
          deleteTodo={this.props.deleteTodo}/>
        )
      }
    });
    
    let { height, width } = Dimensions.get('window');
    // TODO finn bedre måte å sette høyden til scrollview. Men andre tingene på skjermen: kalendern, topbar og bottombaren er veldig nærme 440.
    return (
      <View style={this.props.smallWindow ? { height: height-440} : {height: "100%"}}>
        <ScrollView>{todos}</ScrollView>
      </View>
    );
  }
}