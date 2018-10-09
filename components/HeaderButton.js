import React from "react";

import { StyleSheet, Button } from 'react-native';
import Colors from "../constants/Colors";

export default class HeaderButton extends React.Component {
  
  render() {
    return <Button {...this.props} style={styles.button} background="transparent" color={Colors.tintColor}/>;
  }
}


const styles = StyleSheet.create({
  button: {
    fontWeight: "bold" 
  }
});