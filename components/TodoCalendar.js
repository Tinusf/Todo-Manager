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
    // Den tar inn todos som er staten av alle todos og går gjennom
    // alle todosene og hvis du ikke har sett en todo med den datoen så
    // legger du til et objekt (farge) i output objektet med dato som nøkkel.
    // om du alt har lagt til datoen i objektet så legger til en ny farge.

    // Alt dette gjør at vi får prikker på kalendern der du har lagt inn todos med riktig farge for kategorier.
    const categoryToColor = {
      'work': { color: 'red' },
      'school': { color: 'blue' },
      'fun': { color: 'orange' },
      'other': { color: 'green' }
    }

    let output = {}
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
            Object.assign({}, this.createMarkedObject(this.props.todos), {[this.state.selectedDate]: {selected: true}})
          }
          markingType={'multi-dot'}
          />
        <TodoList chosenDay={this.state.selectedDate} todos={this.props.todos} smallWindow={true} ></TodoList>
       </View>
    );
  }
  onDayPress(day) {
   this.setState({
     // Format: "YY-MM-DD"
     selectedDate: day.dateString,
   });
 }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#aaa',
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
  }
});
