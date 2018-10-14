import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View } from "react-native";

export default class PedometerScreen extends React.Component {
  static navigationOptions = {
    title: 'Pedometer View',
  };
  state = {
    pastStepCount: 0,
    currentStepCount: 0
  };

  // Kjør _subscribe nå PedometerScreen lastes
  componentDidMount() {
    this._subscribe();
  }

  // Kjør _unsubscribe når PedometerScreen unmounter
  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        // Oppdater skrittene
        currentStepCount: result.steps,
        pastStepCount: this.state.pastStepCount + result.steps,
      });
    });

    const end = new Date();
    const start = new Date();

    // Setter start datoen til nå minus 24 timer
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  // Fjern subscription hvis den ikke er null og sett den til null
  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Steps last 24 hours: {"\n"}{this.state.pastStepCount}
        </Text>
        <Text style={styles.text}>Current step count: {"\n"} {this.state.currentStepCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
  }
});

Expo.registerRootComponent(PedometerScreen);
