import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import Categories from '../constants/Categories';

export default class MapPickerScreen extends React.Component {
  state = {
    // Før du har fetched første resultat fra gpsen så skal du bare være zoomer ut og se hele verdenskartet.
    mapRegion: { latitude: 0, longitude: 0, latitudeDelta: 100, longitudeDelta: 100 },
    currentLocationResult: null,
    chosenLoc: null,
  };

  componentDidMount() {
    // Fetch gps koordinater med en gang componenten har loadet.
    this._getLocationAsyncAndSetRegion();
  }

  onRegionChangeComplete = (mapRegion) => {
    this.setState({ mapRegion });
  }

  onMapViewPress = (onPressObject) => {
    const coords = onPressObject["coordinate"];
    this.setState({chosenLoc: coords});
    this.props.navigation.getParam("addLocation")(coords);
  }

  _getLocationAsyncAndSetRegion = async () => {
    // Kjøres for å zoome inn på riktig sted i verden. Første gps lokasjonen som du får.
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        currentLocationResult: 'Permission to access location was denied'
      });
    }
    // Det er en bug på android telefoner som gjør at denne ikke funker på mobiler som har "device only" på gps mode valgt i settings.
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false, maximumAge: 10000 });

    const lat = location["coords"]["latitude"];
    const long = location["coords"]["longitude"];
    const latDelta = 0.0922;
    const longDelta = 0.0421;
    this.setState({ mapRegion: { latitude: lat, longitude: long, latitudeDelta: latDelta, longitudeDelta: longDelta } })
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFill}
          region={this.state.mapRegion}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsUserLocation={true}
          onPress={(e) => this.onMapViewPress(e.nativeEvent)}
        >
          {this.state.chosenLoc && <MapView.Marker
            coordinate={this.state.chosenLoc}
            title="Your chosen location."
            description="Click anywhere else on the map to move this marker."
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
