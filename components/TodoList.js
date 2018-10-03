import React from 'react';
import {
  ScrollView,
} from 'react-native';

import TodoElement from "./TodoElement";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ id: 1, text: "kjøp melk", date: "2018-10-04", category: "work", completed: false }, { id: 2, text: "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ", date: "2018-10-05", category: "work", completed: true }
    ]};
  }

  render() {
    let todos = this.state.todos.map((todo) => {
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