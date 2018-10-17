import React from 'react';
import {
  StyleSheet, View, Text, Platform
} from 'react-native';
import Colors from '../constants/Colors';
import { Icon } from 'expo';


export default class CheckBox extends React.Component {
  render() {
    // Vi lagde vår egen CheckBox komponent fordi vi klarte ikke å style noen av de 3rd party bibliotekene til å bli slik vi ville ha de.
    return (
      <View style={styles.container}>
        <View style={styles.outerBar}>
          <View style={{position: "relative", top: -3, right: 0.3, borderRadius: 24,  height: (this.props.checked ? 125 : 0) +"%", width: (this.props.checked ? 120 : 0) +"%"}}>
            <Icon.Ionicons
            name={(Platform.OS === 'ios' ? "ios-" : "md-") + "checkmark-circle"}
            size={28}
            style={styles.icon}
            color={this.props.color }
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 10
  },
  icon: {
  },
  outerBar: {
    backgroundColor: "white",
    borderRadius: 24,
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'gray',
  }
});
