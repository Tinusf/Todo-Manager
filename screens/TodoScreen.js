import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';
import TodoCalendar from "../components/TodoCalendar";
import { Platform } from 'react-native';
import { Icon } from 'expo';
import Colors from '../constants/Colors';

import TodoList from "../components/TodoList";
import Swiper from 'react-native-swiper';
import TodoActionButton from "../components/TodoActionButton";
import HeaderButton from "../components/HeaderButton";
import TabBarIcon from '../components/TabBarIcon';


export default class TodoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // Bare ios skal ha + knappen oppe til høyre, fordi dette er standard for ios apper, mens android bruker den klassiske store blå knappen nede til høyre istedenfor.
    if(Platform.OS === 'ios'){
      return {
        headerTitle: "Todos",
        headerRight: <Icon.Ionicons
        name="ios-add"
        size={40}
        onPress={() => navigation.navigate("TodoFormModal")} 
        style={{paddingLeft: 10, paddingRight: 10 }}
        color={Colors.tintColor}
      />
      };
    }
    return {
      headerTitle: "Todos",
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      showCalendar: true
    };
  }

  setCategoryChosen = (category) => {
    this.setState({category: category});
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper activeDotColor={Colors.tintColor} loop={false}>
          <TodoCalendar/>
          <ScrollView style={this.fullTodoList}>
            <TodoList chosenCategory="work" />
            <TodoList chosenCategory="school" />
            <TodoList chosenCategory="fun" />
            <TodoList chosenCategory="other" />
          </ScrollView>
        </Swiper>
        {Platform.OS !== 'ios' && <TodoActionButton navigate={this.props.navigation.navigate} setCategoryChosen={this.setCategoryChosen}/>}
          
      </View>
   );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  fullTodoList: {
    height: "100%",
  },
  swipe: {

  },
  absoluteAndFill: {
    //...StyleSheet.absoluteFillObject,
  },
});