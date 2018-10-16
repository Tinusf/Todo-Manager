import React from "react";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import TodoList from "./TodoList";
import TodoActionButton from "./TodoActionButton";
import Categories from '../constants/Categories';

class TodoCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date().toISOString().slice(0,10)
    };
    this.todos = [
      { id: 0, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false },
      {
        id: 1,
        text:
          "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ",
        date: "2018-10-04",
        category: "fun",
        completed: true
      },
      { id: 2, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false },
      {
        id: 3,
        text:
          "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ",
        date: "2018-10-04",
        category: "fun",
        completed: true
      },
    ];
    this.onDayPress = this.onDayPress.bind(this);
  }
  static navigationOptions = {
    title: "Todo Calendar"
  };

  createMarkedObject = todos => {
    // Den tar inn todos som er staten av alle todos og går gjennom
    // alle todosene og hvis du ikke har sett en todo med den datoen så
    // legger du til et objekt (farge) i output objektet med dato som nøkkel.
    // om du alt har lagt til datoen i objektet så legger til en ny farge.


    let output = {};
    todos.forEach(todo => {
      if (todo["date"] in output) {
        output[todo["date"]]["dots"].push(Categories[todo.category]);
      } else {
        output[todo["date"]] = { dots: [Categories[todo.category]] };
      }
    });
    return output;
  };

  render() {
    return (
      <View style={styles.container}>
        <CalendarList
          onDayPress={this.onDayPress}
          style={styles.calendar}
          showWeekNumbers={true}
          hideExtraDays={true}
          horizontal={true}
          pagingEnabled={true}
          markedDates={Object.assign({}, this.createMarkedObject(this.props.todos), { [this.state.selectedDate]: { selected: true } })}
          markingType={"multi-dot"}
          theme={{
            todayTextColor: Colors.tintColor,
            selectedDayBackgroundColor: Colors.tintColor
          }}
        />
        <ScrollView style={{flex: 1, height: "100%"}}>
          <TodoList
            chosenDay={this.state.selectedDate}
            smallWindow={true}
            toggleTodoStatus={this.props.toggleTodoStatus}
            deleteTodo={this.props.deleteTodo}
          />
        </ScrollView>
      </View>
    );
  }
  onDayPress(day) {
    this.setState({
      // Format: "YY-MM-DD"
      selectedDate: day.dateString
    });
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  calendar: {
    paddingTop: 5,
    borderColor: "#aaa",
    height: 130,
    borderBottomColor: "#47315a"
  },
  text: {
    textAlign: "center",
    borderColor: "#bbb",
    padding: 10
  }
});

export default connect(state => ({ todos: state.todos }))(TodoCalendar);
