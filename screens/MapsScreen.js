import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Permissions, Location } from 'expo';
// Marker fra expo er broken, så jeg bruker Marker fra react-native-maps istedenfor.
import { Marker } from 'react-native-maps';

export default class MapsScreen extends React.Component {
  static navigationOptions = {
    title: 'Map View',
  };

  state = {
    mapRegion: { latitude: 63.43055, longitude: 10.3951, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    currentLocationResult: null,
  };

  componentDidMount() {
    // Fetch gps koordinater med en gang componenten har loadet.
    this._getLocationAsync();
  }

  onRegionChangeComplete = mapRegion => this.setState({ mapRegion });

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        currentLocationResult: 'Permission to access location was denied'
      });
    }
    // Det er en bug på android telefoner som gjør at denne ikke funker på mobiler som har "device only" på gps mode valgt i settings.
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

    this.setState({ currentLocationResult: { coords: { "latitude": location["coords"]["latitude"], "longitude": location["coords"]["longitude"] } } });
    
    // Refresh gps om 5 sek.
    setTimeout(() => {this._getLocationAsync() }, 5000);
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFill}
          region={this.state.mapRegion}
          onRegionChangeComplete={this.onRegionChangeComplete}>

          {this.state.currentLocationResult && <Marker
            coordinate={this.state.currentLocationResult.coords}
            title="GPS Marker"
            description="You are here"
            pinColor="indigo"
          />} 
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
