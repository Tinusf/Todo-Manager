import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MapsScreen from '../screens/MapsScreen';
import PedometerScreen from '../screens/PedometerScreen';
import TodoScreen from '../screens/TodoScreen';

const TodoStack = createStackNavigator({
  Todo: TodoScreen,
});

TodoStack.navigationOptions = {
  tabBarLabel: 'Todo',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const MapsStack = createStackNavigator({
  Maps: MapsScreen,
});

MapsStack.navigationOptions = {
  tabBarLabel: 'Maps',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const PedometerStack = createStackNavigator({
  Pedometer: PedometerScreen,
});

PedometerStack.navigationOptions = {
  tabBarLabel: 'Pedometer',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};


export default createBottomTabNavigator({
  TodoStack,
  MapsStack,
  PedometerStack,
});
