import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';

export default class PedometerScreen extends React.Component {
    static navigationOptions = {
        title: 'Pedometer view',
    };

    render() {
        return (
            <Text>Pedometer screen</Text>
        );
    }
}