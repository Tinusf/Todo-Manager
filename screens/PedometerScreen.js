import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "../components/ProgressBar";
import HeaderButton from "../components/HeaderButton";

class PedometerScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Today's progress",
      headerRight: <HeaderButton onPress={() => navigation.navigate("PedometerSettings")} title="Edit goal" />
    };
  };
  state = {
    stepCount: 0,
  };

  // Kjør _refresh nå PedometerScreen lastes
  componentDidMount() {
    // Expo.Google.logInAsync(androidStandaloneAppClientId ="Ligger på Gdoccen.")
    this._refresh()
  }

  _refresh = () => {
    const end = new Date();
    end.setHours(23)
    end.setMinutes(59)
    end.setSeconds(59)

    const start = new Date();
    start.setHours(0)
    start.setMinutes(0)
    start.setSeconds(0)

    // Henter steps fra startdatoen til sluttdatoen og setter staten
    // Gir en feilmelding hvis det oppstår en error 
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ stepCount: result.steps });
      },
      error => {
        this.setState({
          stepCount: "Could not get past step count: " + error
        });
      }
    );
    
    // 5 sekunder etter man har fått forrige resultat kjøres _refresh() på nytt
    setTimeout(() => {this._refresh()}, 5000);
  };

  render() {
    const today = this.state.stepCount;
    const {goal} = this.props;
    const percentage = Math.round(Math.min(today/goal * 100, 100));

    return (
      <View style={styles.container}>
        <Text style={styles.textHeader}>
          {percentage === 100 ? "🏆" : "🏃‍"} 
        </Text>

        <ProgressBar percentage={percentage} />
        <Text style={styles.textSmall}>
          {percentage + "% completed of today' s goal"}
        </Text>
        <Text style={styles.text}>
          Steps today: {"\n"}{this.state.stepCount}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 50,
    backgroundColor: 'white'
  },
  textHeader: {
    fontSize: 70,
    textAlign: 'center'
  },
  textSmall: {
    fontSize: 14,
    textAlign: 'center'
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
    padding: 30,
  }
});

export default connect(state => ({ goal: state.settings.goal }))(PedometerScreen)

Expo.registerRootComponent(PedometerScreen);
