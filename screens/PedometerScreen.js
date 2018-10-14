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
      });
    });

    const end = new Date();
    const start = new Date();

    // Setter start datoen til nå minus 24 timer
    start.setDate(end.getDate() - 1);

    // Henter steps fra startdatoen til sluttdatoen og setter staten
    // Gir en feilmelding hvis det oppsår en error 
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get past step count: " + error
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
          Steps last 24 hours: {"\n"}{this.state.pastStepCount + this.state.currentStepCount}
        </Text>
        <Text style={styles.text}>Current step count: {"\n"}{this.state.currentStepCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 30,
  }
});

Expo.registerRootComponent(PedometerScreen);
