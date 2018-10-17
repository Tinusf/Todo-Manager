import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import Categories from '../constants/Categories';

class MapsScreen extends React.Component {
  static navigationOptions = {
    title: 'Map of todos',
  };

  state = {
    // Før du har fetched første resultat fra gpsen så skal du bare være zoomer ut og se norgeskartet.
    mapRegion: { latitude: 64, longitude: 13, latitudeDelta: 14, longitudeDelta: 25 },
    currentLocationResult: null,
  };

  componentDidMount() {
    // Fetch gps koordinater med en gang componenten har loadet.
    this._getLocationAsyncAndSetRegion();
  }

  onRegionChangeComplete = (mapRegion) => {
    this.setState({ mapRegion });
  }

  _getLocationAsyncAndSetRegion = async () => {
    // Kjøres for å zoome inn på riktig sted i verden. Første gps lokasjonen som du får.
    // Må først spør om permissions for locations.
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
          >

          {this.props.todos
          // Filtrer ut de todosene som ikke har koordinater. 
          .filter(todo => todo["coords"] !== undefined)
          .map(todo => 
            <MapView.Marker 
              key={todo["id"]}
              coordinate={todo["coords"]}
              title={todo["category"]}
              description={todo["text"]}
              pinColor={Categories[todo["category"]].color}
            />
          )} 

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

export default connect(state => ({ todos: state.todos }))(MapsScreen);