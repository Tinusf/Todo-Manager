import React from 'react';
import { connect } from 'react-redux'
import {
  ScrollView, View, Text, StyleSheet
} from 'react-native';

import TodoElement from "./TodoElement";

/**
 * Denne klassen lager en liste med TodoElements. For så å legge de i et
 * View.
 */

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Om du ikke har valgt en chosenDay så skal du få en liste av alle todosene, om du har valgt en chosenDay så skal du bare få de todosene med date som er chosenDay. Legg på slice for å kopiere og ikke endre på todo listen vår. Har også chosenCateory for å velge bare en type kategori. 
    let todos = this.props.todos.slice(0)
    .filter((todo) => this.props.smallWindow || this.props.chosenCategory == todo.category.toLowerCase())
    .filter((todo) => !this.props.chosenDay || (this.props.chosenDay && this.props.chosenDay === todo["date"]))
    .map((todo) => {
      return (
        <TodoElement 
        key={todo["id"]}
        id={todo["id"]}
        text={todo["text"]}
        date={this.props.smallWindow ? todo["date"] : todo["date"]}
        completed={todo["completed"]}
        category={todo["category"]} 
        />
      )
    });
    
    return (
      <View style={styles.container}>
        <ScrollView>
        {todos.length > 0 && this.props.chosenCategory && <Text style={styles.header}>{this.props.chosenCategory.charAt(0).toUpperCase() + this.props.chosenCategory.slice(1)}</Text>}
        {todos}
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: 'column',  
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold', 
    padding: 15
  },
});

export default connect(state => ({ todos: state.todos }))(TodoList)
