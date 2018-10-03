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

const work = {key:'work', color: 'red'};
const school = {key:'school', color: 'blue'};
const fun = {key:'fun', color: 'orange'};
const other = {key:'other', color: 'green'};

export default class TodoCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }
  static navigationOptions = {
    title: 'Todo Calendar',
  };

  render() {
    return (
      <View>
        <Calendar
          onDayPress = {this.onDayPress}
          style = {styles.calendar}
          minDate={Date()}
          showWeekNumbers = {true}
          hideExtraDays = {true}
          markedDates={{
            //test
            '2018-10-24': {dots: [school, work]},
            [this.state.selected]: {selected: true,}
          }}
          markingType={'multi-dot'}
         />
         <ScrollView>
          <Text style={styles.text}>{this.state.selected}</Text>
          {/* TODO Skriv todos for den valgte dagen her*/}
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
