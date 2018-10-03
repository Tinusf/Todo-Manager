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
      return (
        <TodoElement 
        key={todo["id"]}
        text={todo["text"]}
        date={todo["date"]}
        completed={todo["completed"]} />
      )
    });

    return (
      <ScrollView>{todos}</ScrollView>
    );
  }
}