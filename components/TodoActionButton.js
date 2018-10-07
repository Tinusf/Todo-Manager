import React from 'react';
import { StyleSheet } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.toggleModal)
    //this.setCategoryChosen = this.props.setCategoryChosen.bind(this);
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
      <FloatingAction
      actions={actions}
      position="right"
      onPressItem={
        (name) => {
          this.props.toggleModal();
          this.props.setCategoryChosen(name);
        }
      }
    />
  );
  }
}