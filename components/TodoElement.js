import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box';

export default class TodoElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBoxStatus: this.props.completed
    };
  }


  render() {
    return (
    <View style={styles.container}>
        <CheckBox
          style={{ flex: 1, padding: 10 }}
          onClick={() => {
            this.setState({
              checkBoxStatus: !this.state.checkBoxStatus
            })
          }}
          isChecked={this.state.checkBoxStatus}
          rightText={this.props.text}
        />
        <Text style={styles.dateText}>{this.props.date}</Text>
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
  }
});
