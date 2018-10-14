import React from "react";
import { connect } from 'react-redux'

import { StyleSheet, Text, View, Alert, Button, TextInput, Platform } from "react-native";
import HeaderButton from "../components/HeaderButton";
import DatePicker from "react-native-datepicker";
import { addTodo } from '../store/actions/Todo-actions'


class TodoForm extends React.Component {
  static navigationOptions = ({ state, navigation }) => {
    return {
      headerTitle: "test",
      headerLeft: <HeaderButton onPress={() => navigation.goBack()} title="Cancel" />,
      headerRight: <HeaderButton onPress={() => navigation.state.params.addNewTodo()} title="Add"/>
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      helpAlert: true
    };
  }

  showMapPicker = () => {
    this.props.navigation.navigate("MapPickerScreen", { addLocation: this.addLocation });
  }

  addLocation = (coords) => {
    this.setState({coords: coords});
  }

  componentDidMount() {
    this.props.navigation.setParams({ addNewTodo: this.addNewTodo, canSave: this.canSave });
  }

  add = () => {
    console.log("save");
  };

  canSave = () => {
    return this.state.text !== undefined;
  }

  addNewTodo = () => {
    // Kjør addNewTodo metoden til TodoScreen så alt av todo states blir gjort av den.
    if (this.state.helpAlert && this.state.date === undefined) {
      // Om brukern ikke har valgt en dato burde det komme en liten varsling om at den ikke kan bli sett i kalendern.
      Alert.alert(
        "No date chosen",
        "You have not chosen a date and will therefore not be able to view your todo in Calender mode, swipe right to view your todos without date.",
        [{ text: "Never remind me again", onPress: () => this.setState({ helpAlert: false }) }, { text: "OK" }],
        { cancelable: false }
      );
    }
    const { navigation } = this.props;
    this.props.dispatch(addTodo(navigation.getParam('category'), this.state.text, this.state.date, this.state.coords));
    this.props.navigation.goBack();
    //this.props.addNewTodo(this.state.text, this.state.date);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <TextInput
          editable={true}
          multiline
          style={{ minHeight: 200 }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder="Write something..."
          placeholderTextColor="grey"
          autoFocus={true}
          underlineColorAndroid="rgba(0,0,0,0)"
          onSubmitEditing={this.addNewTodo}
        />
        <Button title="Add location (optional)" onPress={this.showMapPicker}></Button>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="1990-01-01"
          maxDate="2025-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={date => {
            this.setState({ date: date });
          }}
        />
        <Text>Add a date for your todo (optional)</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    maxHeight: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  button: {
    width: "45%"
  },
  textInput: {
    fontSize: 18
  }
});

export default connect()(TodoForm)