import React from "react";
import { connect } from "react-redux";

import { StyleSheet, Text, View, Alert, Button, TextInput, Platform } from "react-native";
import HeaderButton from "../components/HeaderButton";
import { setGoal } from "../store/actions/Settings-actions";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import Colors from "../constants/Colors";


class PedometerSettings extends React.Component {
  static navigationOptions = ({ state, navigation }) => {
    return {
      headerTitle: "Pedometer goal",
      headerLeft: <HeaderButton onPress={() => navigation.goBack()} title="Cancel" />,
      headerRight: <HeaderButton onPress={() => navigation.state.params.save()} title="Save" />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      helpAlert: true,
      goal: this.props.goal
    };
  }

  
  componentDidMount() {
    this.props.navigation.setParams({ save: this.save });
  }

  save = () => {
    const { navigation, dispatch } = this.props;
    dispatch(setGoal(this.state.goal));
    navigation.goBack();
  };

  render() { 
    return (
      <View style={{ flex: 1, backgroundColor: "#EFEFF4" }}>
        <TableView>
          <Section>
            <Cell
              cellContentView={
                <TextInput underlineColorAndroid="rgba(0,0,0,0)" style={{ fontSize: 16, flex: 1 }}  keyboardType='numeric' maxLength={10} autoFocus={true} onChangeText={text => this.setState({ goal: text })} value={this.state.goal} placeholder="Goal" />
              }
            />
          </Section>
        </TableView>
      </View>
    );
  }
}

export default connect(state => ({ goal: state.settings.goal }))(PedometerSettings);
