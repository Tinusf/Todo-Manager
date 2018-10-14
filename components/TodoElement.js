import React from 'react';
import { connect } from 'react-redux'
import { removeTodo, toggleTodo } from '../store/actions/Todo-actions'

import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';

 class TodoElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBoxStatus: this.props.completed
    };
  }

  render() {
    // Lager et objekt git ut en farge basert på kategori
    // Brukes til å gi checkBox korrekt farge
    const categoryToColor = {
      'work': 'red',
      'school': 'blue',
      'fun': 'orange',
      'other': 'green'
    };

    return (
    <View style={styles.container}>
        <CheckBox
          style={styles.CheckBox}
          onClick={() => {
            this.props.dispatch(toggleTodo(this.props.id))
          }}
          isChecked={this.props.completed}
          rightText={this.props.text}
          rightTextStyle={this.props.completed ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid'} : {}}
          checkBoxColor={categoryToColor[this.props.category]}
        />
        <Text style={styles.dateText}>{this.props.date}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => this.props.dispatch(removeTodo(this.props.id))}>
          <Text style={styles.deleteText}>☓</Text>
        </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  dateText: {
    paddingTop: 12.5,
  },
  CheckBox: {
   flex: 1,
   padding: 10,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    color: 'red',
    fontSize: 20,

  },
});
export default connect()(TodoElement)