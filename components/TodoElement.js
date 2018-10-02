import React from 'react';
import { Text, View, CheckBox } from 'react-native';

export default class TodoElement extends React.Component {
  render() {
    return (
    <View>
        <CheckBox
          title='Click Here'
          checked={true}
        />
      <Text>{this.props.text}</Text>
      <Text>{this.props.date}</Text>
      {this.props.completed && <Text>done</Text>}
    </View>
    );
  }
}

