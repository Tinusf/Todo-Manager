import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MapsScreen from '../screens/MapsScreen';
import PedometerScreen from '../screens/PedometerScreen';
import PedometerSettings from '../screens/PedometerSettings';

import TodoScreen from '../screens/TodoScreen';
import TodoFormModal from '../screens/TodoFormModal';
import MapPickerScreen from '../screens/MapPickerScreen';
import Colors from '../constants/Colors';


const TodoStack = createStackNavigator(
  {    
    TodoScreen: TodoScreen,
    TodoFormModal: TodoFormModal,
    MapPickerScreen: MapPickerScreen,
  }
);

TodoStack.navigationOptions = {
  tabBarLabel: 'Todo',
  tabBarTintColor: 'white',
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-checkbox${focused ? '' : '-outline'}`
          : 'md-checkbox'
      }
    />
  ),
};

const MapsStack = createStackNavigator({
  Maps: MapsScreen,
});

MapsStack.navigationOptions = {
  tabBarLabel: 'Maps',
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-pin${focused ? '' : '-outline'}` : 'md-pin'}
    />
  ),
};

const PedometerStack = createStackNavigator({
  Pedometer: PedometerScreen,
  PedometerSettings: PedometerSettings,

});

PedometerStack.navigationOptions = {
  tabBarLabel: 'Pedometer',
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-walk${focused ? '' : '-outline'}` : 'md-walk'}
    />
  ),
};


export default createBottomTabNavigator({
  TodoStack,
  MapsStack,
  PedometerStack,
});
