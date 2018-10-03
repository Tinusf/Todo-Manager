import React from 'react';
import {
  ScrollView, View, Button
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
          text={todo["text"]}
          date={todo["date"]}
          completed={todo["completed"]}
          category={todo["category"]} />
        )
      }
    });

// TODO finn bedre måte å sette høyden til scrollview
    return (
      <View style={{height: 400}}>
        <ScrollView>{todos}</ScrollView>
      </View>
    );
  }
}