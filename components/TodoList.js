import React from 'react';
import {
  ScrollView, View, Button
} from 'react-native';

import TodoElement from "./TodoElement";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let todos = this.props.todos.map((todo) => {
      if (!this.props.chosenDay || (this.props.chosenDay && this.props.chosenDay == todo["date"])) {
        return (
          <TodoElement 
          key={todo["id"]}
          text={todo["text"]}
          date={todo["date"]}
          completed={todo["completed"]} />
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