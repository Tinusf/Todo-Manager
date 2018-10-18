import React from "react";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import { CalendarList } from "react-native-calendars";
import {ScrollView, StyleSheet, View} from "react-native";
import TodoList from "./TodoList";
import Categories from '../constants/Categories';

class TodoCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // For å automatisk velge dagens dato.
      selectedDate: new Date().toISOString().slice(0,10)
    };
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
  }
});

export default connect(state => ({ todos: state.todos }))(TodoCalendar);
