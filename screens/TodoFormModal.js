import React from "react";
import { connect } from "react-redux";
import { View, Alert, TextInput } from "react-native";
import HeaderButton from "../components/HeaderButton";
import DatePicker from "react-native-datepicker";
import { addTodo } from "../store/actions/Todo-actions";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import RNPickerSelect from 'react-native-picker-select';
import Colors from "../constants/Colors";
import { toggleHelp } from "../store/actions/Settings-actions";

class TodoFormModal extends React.Component {
  static navigationOptions = ({ state, navigation }) => {
    return {
      headerTitle: "Add new todo",
      headerLeft: <HeaderButton onPress={() => navigation.goBack()} title="Cancel" />,
      headerRight: <HeaderButton onPress={() => navigation.state.params.addNewTodo()} title="Add" />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      // Default kategori er work (fordi iOS kan se denne komponenten uten å ha valgt noe enda.)
      category: "work"
    };
  }

  showMapPicker = () => {
    this.props.navigation.navigate("MapPickerScreen", { addLocation: this.addLocation, category: this.state.category });
  };

  addLocation = coords => {
    this.setState({ coords: coords });
  };

  componentDidMount() {
    if(this.props.navigation.getParam("category"))
      this.setState({ category: this.props.navigation.getParam("category") });
    this.props.navigation.setParams({ addNewTodo: this.addNewTodo, canSave: this.canSave });
  }

  canSave = () => {
    // Hvis du har skrevet noe i teksboksen så kan du save todoen.
    return this.state.text !== undefined;
  };

  addNewTodo = () => {
    if (this.props.helpAlert && this.state.date === undefined) {
      // Om brukern ikke har valgt en dato kommer det en liten varsling om at den ikke kan bli sett i kalendern.
      Alert.alert(
        "No date chosen",
        "You have not chosen a date and will therefore not be able to view your todo in Calender mode, swipe right to view your todos without date.",
        [{ text: "Never remind me again", onPress: () => this.props.dispatch(toggleHelp()) }, { text: "OK" }],
        { cancelable: false }
      );
    }
    const { navigation } = this.props;
    this.props.dispatch(addTodo(this.state.category, this.state.text, this.state.date, this.state.coords));
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <DatePicker
          showIcon={false}
          hideText={true}
          style={{ height: 0, width: 0 }}
          ref={ref => (this.datePickerRef = ref)}
          date={this.state.date}
          mode="date"
          customStyles={{
            btnTextConfirm: {
              color: Colors.tintColor
            },
            btnTextCancel: {
              color: Colors.tintColor
            }
          }}
          placeholder="Click here to select date"
          format="YYYY-MM-DD"
          minDate="1990-01-01"
          showIcon={false}
          maxDate="2025-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={date => {
            this.setState({ date: date });
          }}
        />
        <TableView style={styles.container}>
          <Section>
            <Cell
              cellContentView={
                <TextInput underlineColorAndroid="rgba(0,0,0,0)" style={{ fontSize: 16, flex: 1 }} autoFocus={true} onChangeText={text => this.setState({ text })} placeholder="Title" />
              }
            />
            <RNPickerSelect
              items={[
                {
                  label: "Work",
                  value: "work"
                },
                {
                  label: "Fun",
                  value: "fun"
                },
                {
                  label: "School",
                  value: "school"
                },
                {
                  label: "Other",
                  value: "other"
                }
              ]}
              placeholder={{}}
              value={this.state.category}
              onValueChange={value => {
                this.setState({
                  category: value
                });
              }}
            >
              <Cell
                cellStyle="RightDetail"
                title="Category"
                detail={this.state.category}
              />
            </RNPickerSelect>
           
          </Section>
          <Section>
            <Cell
              cellStyle="RightDetail"
              title="Date"
              detail={this.state.date ? this.state.date : "Select"}
              onPress={() => this.datePickerRef.onPressDate()}
            />
             <Cell
              cellStyle="RightDetail"
              title="Location"
              accessory="DisclosureIndicator"
              detail={this.state.coords ? "Selected" : " Select"}
              onPress={this.showMapPicker}
            />
            

          </Section>
        </TableView>
      </View>
    );
  }
}

export default connect(state => ({ helpAlert: state.settings.helpAlert }))(TodoFormModal);