import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MapView, Permissions, Location } from 'expo';

export default class MapsScreen extends React.Component {
  static navigationOptions = {
    title: 'Map View',
  };

  state = {
    // Før du har fetched første resultat fra gpsen så skal du bare være zoomer ut og se hele verdenskartet.
    mapRegion: { latitude: 0, longitude: 0, latitudeDelta: 100, longitudeDelta: 100 },
    currentLocationResult: null,
    // Example todos (some) with location values.
    todos: [{ id: 0, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false, coords: { "latitude": 63.4133335, "longitude": 10.4120182 } }, { id: 1, text: "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ", date: "2018-10-04", category: "fun", completed: true, coords: { "latitude": 63.4223335, "longitude": 10.4020182 } }, { id: 2, text: "kjøp melk", date: "2018-10-05", category: "school", completed: false, coords: { "latitude": 63.4533335, "longitude": 10.4420182 } }, { id: 3, text: "gjør webdev og balbajsklfjkalsdfjkla sdjklfja skldfj klasjdfkl jaklsdfjkla jsdklfj askldjfkl jasdklfj klasjdfk jaskldfjklasj klfjaskld fjklasdfjkl ", date: "2018-10-04", category: "other", completed: true, coords: { "latitude": 63.4833335, "longitude": 10.4920182 } } ]
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
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        currentLocationResult: 'Permission to access location was denied'
      });
    }
    // Det er en bug på android telefoner som gjør at denne ikke funker på mobiler som har "device only" på gps mode valgt i settings.
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, maximumAge: 10000 });

    const lat = location["coords"]["latitude"];
    const long = location["coords"]["longitude"];
    const latDelta = 0.0922;
    const longDelta = 0.0421;
    this.setState({ mapRegion: { latitude: lat, longitude: long, latitudeDelta: latDelta, longitudeDelta: longDelta } })

    // this.setState({ currentLocationResult: { coords: { "latitude": location["coords"]["latitude"], "longitude": location["coords"]["longitude"] } } });

  };

  render() {
    const categoryToColor = {
      'work': 'red',
      'school': 'blue',
      'fun': 'orange',
      'other': 'green'
    };

    return (
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFill}
          region={this.state.mapRegion}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsUserLocation={true}
          >

          {this.state.todos
          // Filtrer ut de todosene som ikke har koordinater. 
          .filter(todo => todo["coords"] !== undefined)
          .map(todo => 
            <MapView.Marker 
              key={todo["id"]}
              coordinate={todo["coords"]}
              title={todo["category"]}
              description={todo["text"]}
              pinColor={categoryToColor[todo["category"]]}
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
