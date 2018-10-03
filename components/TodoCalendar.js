import React from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
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
import TodoList from "./TodoList";


categoryToColor = {
  'work': {color: 'red'},
  'school': {color: 'blue'},
  'fun': {color: 'orange'},
  'other': {color: 'green'}
}

export default class TodoCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }
  static navigationOptions = {
    title: 'Todo Calendar',
  };

  createMarkedObject = (todos) => {
    output = {}
    todos.forEach(todo => {
      if (todo["date"] in output) {
        output[todo["date"]]["dots"].push(categoryToColor[todo["category"]]);
      } else {
        output[todo["date"]] = {dots: [categoryToColor[todo["category"]]]}
      }
    });
    return output;
  }

  render() {
    return (
      <View>
        <Calendar
          onDayPress = {this.onDayPress}
          style = {styles.calendar}
          showWeekNumbers = {true}
          hideExtraDays = {true}
          markedDates={
            Object.assign({}, this.createMarkedObject(this.props.todos), {[this.state.selected]: {selected: true}})
          }
          markingType={'multi-dot'}
          />
        <ScrollView>
          <TodoList chosenDay={this.state.selected} todos={this.props.todos}></TodoList>
        </ScrollView>
       </View>
    );
  }
  onDayPress(day) {
   this.setState({
     // Format: "YY-MM-DD"
     selected: day.dateString,
   });
 }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    height: 350,
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
  }
});
