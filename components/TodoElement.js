import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

export default class TodoElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBoxStatus: this.props.completed
    };
  }


  render() {
    // Lager et objekt git ut en farge basert på kategori
    // Brukes til å gi checkBox korrekt farge
    const categoryToColor = {
      'work': 'red',
      'school': 'blue',
      'fun': 'orange',
      'other': 'green'
    };

    return (
    <View style={styles.container}>
        <CheckBox
          style={styles.CheckBox}
          onClick={() => {
            this.setState({
              checkBoxStatus: !this.state.checkBoxStatus
            })
          }}
          isChecked={this.state.checkBoxStatus}
          rightText={this.props.text}
          checkBoxColor={categoryToColor[this.props.category]}
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
  },
  CheckBox: {
   flex: 1,
   padding: 10,
  }
});
