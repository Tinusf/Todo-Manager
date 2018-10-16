import React from 'react';
import { connect } from 'react-redux'
import { removeTodo, toggleTodo } from '../store/actions/Todo-actions'

import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import CheckBox from './CheckBox';
import Colors from '../constants/Colors';
import { Icon } from 'expo';
import Categories from '../constants/Categories';


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


    const category = Categories[this.props.category.toLowerCase()];
    console.log(category)
    return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => this.props.dispatch(toggleTodo(this.props.id))}>
        <View style={styles.info}>
            <View style={{width: 34}}>
            <Icon.Ionicons
              name={(Platform.OS === 'ios' ? "ios-" : "md-") + category.icon }
              size={30}
              style={styles.icon}
              color={category.color }
            />
            </View>
          {/*  <CheckBox
              style={styles.CheckBox}
              onClick={() => {
                this.props.dispatch(toggleTodo(this.props.id))
              }}
              isChecked={this.props.completed}
              rightText={this.props.text}
              rightTextStyle={this.props.completed ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid'} : {}}
              //checkBoxColor={categoryToColor[this.props.category]}
            /> */}
            <CheckBox color={category.color} styles={styles.checkbox} checked={this.props.completed} />
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.title}>{this.props.text}</Text>
              <Text style={styles.dateText}>{this.props.date}</Text>
            </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => this.props.dispatch(removeTodo(this.props.id))}>
          <Text style={styles.deleteText}>X</Text>
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
    padding: 3,
    paddingLeft: 20,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderTopWidth: 0.25,
  },
  icon: {
    paddingTop: 5
  },
  info: {
    width: "100%",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  title: {
    paddingTop: 4,
    fontSize: 16,
  },
  dateText: {
    paddingTop: 2,
    fontSize: 12,
    color: 'gray'
  },
  checkbox: {
   padding: 5,
   paddingTop: 10,
   margin: 10
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    color: 'red',
    fontSize: 20,
    paddingTop: 7,
    paddingRight: 10

  },
});
export default connect()(TodoElement)