import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Button,
  TextInput,
  SafeAreaView
} from 'react-native';
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';
import { FloatingAction } from 'react-native-floating-action';

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isModalVisible: false}
  }

  _toggleModal = () => {
    this.setState({ text: null });
    this.setState({ date: null });
    // clear the text and date aswell as to toggle whether the modal is visible or not.
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  addNewTodo = () => {
    // Kjør addNewTodo metoden til TodoScreen så alt av todo states blir gjort av den.
    this.props.addNewTodo(this.state.text, this.state.date, this.state.categoryChosen);
    this._toggleModal();
  }

  render() {
    // actions er hvilken handlinger du kan gjøre etter du har trykker på den store + knappen. Vi har valgt å ha kategorier her. 
    const actions = [{
      text: 'Work',
      name: 'work',
      color: "red",
      position: 1
    }, {
      text: 'School',
      name: 'school',
      color: "blue",
      position: 2
    }, {
      text: 'Fun',
      name: 'fun',
      color: "orange",
      position: 3
    }, {
      text: 'Other',
      name: 'other',
      color: "green",
      position: 4
    }];
  return (
    <SafeAreaView style={styles.container}>
      <Modal isVisible={this.state.isModalVisible}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.buttonContainer}>
            <View style={styles.button} ><Button title="Cancel" onPress={this._toggleModal} color="red" style={styles.button}></Button></View>
            <View style={styles.button} ><Button title="Submit" onPress={this.addNewTodo} color="green" style={styles.button}></Button></View>
          </View>
          <TextInput
            editable={true}
            multiline
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            placeholder="Write something..."
            placeholderTextColor="grey"
            style={styles.textInput}
            underlineColorAndroid='rgba(0,0,0,0)'
            onSubmitEditing={this.addNewTodo}
            autoFocus={true}></TextInput>
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
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => { this.setState({ date: date }) }}
          />
          <Text>Add a date for your todo (optional)</Text>
        </View>
      </Modal>
      <View style={styles.container}>
        <FloatingAction
          actions={actions}
          position="right"
          onPressItem={
            (name) => {
              this.setState({ isModalVisible: true });
              this.setState({ categoryChosen: name });
            }
          }
        />
      </View>
    </SafeAreaView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    width: '45%',
  },
  textInput: {
    fontSize: 18,
  }
});
