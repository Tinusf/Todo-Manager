import React from "react";
import { StyleSheet } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Categories from '../constants/Categories';

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    // actions er hvilken handlinger du kan gjøre etter du har trykker på den store + knappen. Vi har valgt å ha kategorier her.
    const actions = [
      {
        text: "Work",
        name: "work",
        color: Categories["work"].color,
        position: 1
      },
      {
        text: "School",
        name: "school",
        color: Categories["school"].color,
        position: 2
      },
      {
        text: "Fun",
        name: "fun",
        color: Categories["fun"].color,
        position: 3
      },
      {
        text: "Other",
        name: "other",
        color: Categories["other"].color,
        position: 4
      }
    ];
    return (
      <FloatingAction
        actions={actions}
        position="right"
        onPressItem={name =>
          this.props.navigate("TodoFormModal", {
            category: name
          })
        }
      />
    );
  }
}
