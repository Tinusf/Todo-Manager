# Prosjekt 3: Personal Information and Motivation Manager
Dette er en app utviklet med React Native som lar deg holde oversikt over ulike gjøremål med mulighet for dato og sted. Appen vil også fungere som en motivasjon til å være mer aktiv gjennom skrittelleren hvor man kan legge til et daglig mål og se progresjonen sin.


## Innholdsfortegnelse
- [Appens Virkemåte](#Appens-virkemåte)
    - [TODO](#TODO)
    - [Maps](#Maps)
    - [Pedometer](#Pedometer)
- [Teknologi](#Teknologi)
    - [React Native](#React-Native)
    - [Redux](#Redux)
    - [AsyncStorage](#AsyncStorage)
    - [Tredjeparts biblioteker](#Tredjeparts-biblioteker)
- [Testing med Jest](#Testing-med-Jest)
    - [Snapshot tester](#Snapshot-tester)
    - [AsyncStorage testing](#AsyncStorage-testing)
- [Git](#Git)
- [Plattformuavhengig](#Plattformuavhengig)
- [Screenshots](#Screenshots)
    - [Screenshots fra Android](#Screenshots-fra-Android)
    - [Screenschots fra iOS](#Screenschots-fra-iOS)
    - [Kart og Skritteller fra Android](#Kart-og-Skritteller-fra-Android)


Om du vil kan du laste ned apk filen for [android](http://folk.ntnu.no/tinussf/it2810/p3/android.apk).  
Vi fikk ikke laget en fil for iOS fordi man må betale penger for å få developer account.  

Vi har valgt å ikke pushe apiKeysene våre, så dere må laste ned våre builds om du vil teste hvordan appen er native, ellers kan dere klone prosjektet, bygge den selv og kjøre den gjennom expo.
```
git clone https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-36.git
npm install
expo start
```

Appen er laget av Tinus Flagstad, Martin Bondkall Gjerde & Jon Ryfetten.

## Appens virkemåte

Appen er delt inn i tre faner (Todo, Maps og Pedometer) som man bytter mellom nederst i appen.

#### TODO
Dette er den siden man ser når man åpner appen. Her har man en kalender og en liste med alle gjøremålene man har lagt til under kalenderen. Listen inneholder bare gjøremål for den valgte datoen. Hvis man sveiper mot venstre på gjøremålslista kommer opp en fullstendig oversikt over alle gjøremålene man har lagt inn. Gjøremålene blir sortert etter kategori. Man oppretter nye gjøremål ved å trykke på pluss knappen og fylle ut skjemaet.

#### Maps
Under fane nummer to har vi et kart. På dette kartet vil alle gjøremål som er lagt inn med en lokasjon dukke opp som en markør på kartet. Ved å trykke på markøren kan man lese hva gjøremålet er.

#### Pedometer

Den tredje og siste screenen er en skritteller. Her telles skrittene man har gått denne dagen. Man kan legge inn et daglig mål og se progresjonen sin mot det daglige målet. 

## Teknologi

#### React Native

React Native er et rammeverk for å bygge native apper med React. En fordel med React Native er at det bygger til både Android og iOS.

Appen er delt inn flere screens og components. Et screen er navigeringsvindu og representerer det som vises på skjermen. Den er også bygget opp av flere komponenter. Vi har 6 screens hvor alle er koblet opp til React Navigation. Dette gjør at vi kan lage faner og bla gjennom screens fint og effektivt.

I dette prosjektet valgte vi å bruke mange tredjepartskomponenter som for eksempel kalenderen og kartet. En fullstendig liste av alle tredjepartsbibliotekene vi har brukt kan man se [her](#Tredjeparts-biblioteker). Vi valgte å bruke disse tredjepartsbibliotekene fordi de var nyttige, lette å bruke, og vi slapp å skrive komponenter som allerede er skrevet fra før av. Kalenderen for eksempel egnet seg veldig godt med tanke på vår visjon av appen. Under letingen etter gode tredjepartskomponenter lærte vi a det var stor forskjell på kvalitet av komponentene. Derfor prøvde vi å finne komponenter som nylig er oppdatert og fungerer på både iOS og Android.

Vi har også laget mange komponenter selv. Alle gjøremålene er representert som en TodoElement. Alle TodoElement'ene lagres med  id, text, date, category, og completed. Alle gjøremålene vises i foreldrekomponentet TodoList som er en liste over gjøremål. Denne listen vises i TodoCalender hvor gjøremålene blir filtrert på hvilken dag som er valgt, og fire ganger i TodoScreen hvor gjøremålene blir filtrert på kategori fire ganger.


#### Redux
Redux brukes for å lagre tilstanden til JavaScript programmer. Den gjør endring av tilstand forutsigbart, og pålegger restriksjoner rundt hvordan og når oppdateringer av tilstand kan skje. Dette er med på å øke kodekvaliteten og gjør det enklere å løse problemer knyttet kommunikasjon av tilstand mellom ulike komponenter.

I vårt tilfelle hvor vi har flere komponenter løste dette flere problemer rundt utveksling av tilstand mellom komponentene. Det sørget for mindre kode og bedre kodekvalitet. Et eksempel er mellom inntasting av gjøremål til forsiden hvor gjøremålene vises.

Rammeverket introduserer flere konsepter man må forholde seg til. Man operer med en tilstand av hele programmet, man kan ikke endre denne tilstanden direkte. For å kunne endre tilstanden må man innføre «actions» som et nytt konsept. Disse beskriver bare hva slags handling som skal utføres, og eventuelle parametere. Videre innfører man et siste konsept som er «reducer», som knytter actions til tilstanden av programmet. En reducer tar inn tilstanden til programmet og action, deretter returnerer den neste tilstand av programmet. Man skriver en reducer for hver action. 

Store deler av Redux er kode man skriver selv, selve rammeverket er på 2kb. Når alle konseptene er på plass, så utfører man en action for å endre tilstanden. For komponenter i React kobler man disse til Redux, og deretter mapper tilstandsvariabler til props i komponenten.


#### AsyncStorage
AsyncStorage er et API fra React Native som sørger for enkel asynkron persistent lagring. Dataen som blir lagret er global for hele Appen. Det kan ses på som en erstatning for LocalStorage som man kan bruke i webapplikasjoner. APIet er nøkkelbasert, som vil si all data lagres basert på en nøkkelverdi.

For å få til en persistent lagring av dataen i Appen, synkroniserer vi tilstanden fra Redux. For å få til dette bruker vi biblioteket redux-persist, som sørger for synkronisering av dataen, ved hjelp av AsyncStorage.  Biblioteket sørger for hvordan synkroniseringen skal skje, hvordan den skal merge data. Siden AsyncStorage er nøkkelbasert, blir all data lagret i en nøkkel, kalt root. Denne nøkkelen peker på et større objekt. 


#### Tredjeparts biblioteker
Her er en fullstendig liste over alle tredjepartsbibliotekene vi har brukt og et enkelt eksempel på hvordan vi har brukt de.
* [jest](https://www.npmjs.com/package/jest) - Enhets- og snapshot tester
* [expo](https://www.npmjs.com/package/expo) - Verktøy til react native som også gir oss ting som Mapview og Pedometer.
* [react-native-calendars](https://github.com/wix/react-native-calendars) - Kalenderen på forsiden.
```javascript
import { CalendarList } from "react-native-calendars";
...
<CalendarList
  style={styles.calendar}
  showWeekNumbers={true}
  hideExtraDays={true}
  horizontal={true}
  pagingEnabled={true}/>
```
* [react-native-datepicker](https://github.com/xgfe/react-native-datepicker) - Kalenderen for å gi en ny TODO en dato.
```javascript
import DatePicker from "react-native-datepicker";
...
<DatePicker
    date={this.state.date}
    mode="date"
    format="YYYY-MM-DD"
    minDate="1990-01-01"
    maxDate="2025-01-01"
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    onDateChange={date => {
        this.setState({ date: date });
    }}/>
```
* [react-native-floating-action](https://github.com/santomegonzalo/react-native-floating-action) - Pluss knappen på Android.
```javascript
import { FloatingAction } from "react-native-floating-action";
...
render() {
    
    // actions er hvilke handlinger du kan gjøre etter du har trykker på knappen.
    const actions = [
      {
        text: "Action1",
        name: "action1",
        color: 'red',
        position: 1
      },
      {
        text: "Action2",
        name: "action2",
        color: 'blue',
        position: 2
      },
    ];
      return(
          <FloatingAction
          actions={actions}
          position="right"
          onPressItem={myFunc()}
        />
  );
}
```
* [react-native-swiper](https://github.com/leecade/react-native-swiper) - Gir muligheten å Swipe mellom kalender skjermen og TODO-liste skjermen
```javascript
import Swiper from 'react-native-swiper';
...
<Swiper loop={false}>
    <View style={styles.slide1}
    <View style={styles.slide2}
</Swiper>
```
* [react-native-picker-select](https://www.npmjs.com/package/react-native-picker-select) - Valg av TODO-kategori på iOS og endring av kategori på Android.
```javascript
import RNPickerSelect from 'react-native-picker-select';
...

constructor(props) {
  super(props);
  this.state = {
    category: "work"
  };
...
<RNPickerSelect
    items={[
        {
            label: item1
            value: value1
        }
        {
            label: item2
            value: value2
        }
    ]}
    value={this.state.category}
    onValueChange={value => {
        this.setState({
            category: value
        })
    }}>
    ...
    </RNPickerSelect>
```
* [react-native-tableview-simple](https://www.npmjs.com/package/react-native-tableview-simple)
```javascript
import { Cell, Section, TableView } from "react-native-tableview-simple";

...

<TableView style={styles.container}>
  <Section>
    <Cell
      cellContentView={
        <TextInput 
          onChangeText={text => this.setState({ text })}
          placeholder="Title" 
        />
      }
    />

    <Cell
      cellStyle="RightDetail"
      title="Category"
      detail={this.state.category}
     />
  </Section>
</TableView>
```
* [react-redux](https://github.com/reduxjs/react-redux)
* [redux](https://www.npmjs.com/package/redux)
Se introduksjon om [Redux](#Redux) lenger oppe.

Eksempel på action
```javascript
/*
 * action types
 */

export const ADD_TODO = "ADD_TODO";

/*
 * action creators
 */
export function addTodo(category, text, date, coords) {
  return { type: ADD_TODO, category, text, date, coords};
}
```

Eksempel på reducer
```javascript
import { combineReducers } from "redux";
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from "../actions/Todo-actions";

todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          category: action.category,
          text: action.text,
          date: action.date,
          completed: false,
          coords: action.coords,
          id: state.length === 0 ? 0 : state[state.length - 1].id + 1
        }
      ];
    case TOGGLE_TODO:
      return state.map(todo => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo));
    case REMOVE_TODO:
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  settings
});

export default todoApp;

```

Koble Redux til Appen. Wrapper rundt selve root component.
```javascript
import todoApp from './store/reducers/todoApp'  

export const store = createStore(todoApp);

<Provider store={store}>
    <App />
</Provider>

```
Man kan nå mappe state fra Redux til props på komponenter
```javascript
import { connect } from 'react-redux';
...
export default connect(state => ({ todos: state.todos }))(MapsScreen);
```
Og når de er koblet til Redux kan man også endre tilstanden i Redux ved bruk av actions:
```
import { addTodo } from '../store/actions/Todo-actions'
...
    this.props.dispatch(addTodo(this.state.category, this.state.text));
...
```


* [redux-persist](https://github.com/rt2zz/redux-persist)
Setter opp lagring gjennom Redux og kobler redux-persist til for å kunne synkronisere dataen. All data lagres med nøkkelen root nå
```javascript
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to AsyncStorage

import rootReducer from "./reducers/Reducer";

const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
```

Vi må nå endre wrappingen rundt hovedkomponentet i Appen til
```javascript
import {store, persistor} from './store/ConfigStore'  

<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
</Provider>
```

Redux-tilstanden vil nå bli synkronisert med disk gjennom AsyncStorage

* [react-navigation](https://www.npmjs.com/package/react-navigation)
* [MapView](https://docs.expo.io/versions/latest/sdk/map-view)  er fra [Expo](https://expo.io/)
Under så oppretter vi et kart og legger inn en markør på kartet. Om du vil bygge en native app til android (.apk fil) så må du lage en google apiKey og legge den til i app.json filen. Vi fant også en bug som gjør at Mappet ikke finner din lokasjon på noen android telefoner om du har valgt "device only" i gps innstillinger. https://github.com/expo/expo/issues/946. 
```javascript
<MapView
  style={StyleSheet.absoluteFill}
  region={{ latitude: 64, longitude: 13, latitudeDelta: 14, longitudeDelta: 25 }}
  showsUserLocation={true}
  >
  <MapView.Marker 
    key={1}
    coordinate={this.state.markercoords["coords"]}
    title={"marker 1"}
    description={"Dette er en marker"}
  />
</MapView>
```
* [Pedometer](https://docs.expo.io/versions/latest/sdk/pedometer) er fra [Expo](https://expo.io/)
Under ser vi et eksempel på en skritteller som oppdaterer seg hver gang komponenten mounter og tilbakestilles ved midnatt. På samme måte som MapView trenger man en google apiKey om man ønsker å bygge en React Native app til android (apk fil).
```javascript
import Expo from "expo";
import { Pedometer } from "expo";
...
state = {
    stepCount: 0,
};
...
componentDidMount() {
    this._updateStepCount();
}

_updateStepCount() {
    const end = new Date();
    end.setHours(23)
    end.setMinutes(59)
    end.setSeconds(59)

    const start = new Date();
    start.setHours(0)
    start.setMinutes(0)
    start.setSeconds(0)
    
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ stepCount: result.steps });
      },
      error => {
        this.setState({
          stepCount: "Could not get step count: " + error
        });
      }
    );
}

render() {
    return(
        <Text>Step count: {this.state.stepCount}</Text>
    )
}
```
* [simple-lru-cache](https://github.com/fatelei/simple-lru-cache) - Brukes for å teste AsyncStorage. Les mer under [AsyncStorage](#AsyncStorage) under Testing med Jest

## Testing med Jest
#### Snapshot tester
Vi har brukt Jest for å teste appen under utviklingen. Vi har et snapshot for hvert komponent og hver screen. Dette gjør at hvis noen gjør en endring som fører til at komponenten/screenen blir renderet forskjellig fra snapshotet, må man se gjennom hva som ble forskjellig og avgjøre om man ønske å oppdatere snapshotet. Dette førte til at vi ble mer obs på endringer som ble gjort, og det unngår at en endring ødelegger noe uten at vi ser det med en gang.

Vi hadde en del problemer med å shallow teste når vi la til Redux fordi Redux containeren ble det eneste komponenten som ble renderet
(se issue https://github.com/reduxjs/redux/issues/1534). Vi løste dette med å bruke shallowrenderer to ganger som vist under.
``` javascript
it("PedometerScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<PedometerScreen store={store} navigation={{ getParam: () => { }, setParams: () => { } }} isModalVisible={false} />);

    const renderer2 = new ShallowRenderer();
    renderer2.render(renderer.getRenderOutput());
    const result = renderer2.getRenderOutput();
    expect(result).toMatchSnapshot();
}); 
```
Vi møtte også på et problem der en komponent som viser hvilken dato det er ville sjekke for datoen snapshotet ble tatt. For at snapshotet skulle funke uansett hvilken dag det var så måtte vi lage en mock dato (fake dato) (se i [TodoCalendar-test.js](./components/__tests__/TodoCalendar-test.js)) 

#### AsyncStorage testing
Vi har også testet AsyncStorage, men brukte en del tid på å finne ut hvordan vi skulle få til dette med tanke på at vi brukte Redux og redux-persist. Vi endte opp med å sette opp en egen virtuel disk som simulerer AsyncStorage på PC, gjennom bruk av biblioteket simple-lru-cache (https://github.com/fatelei/simple-lru-cache) som hele kjøretiden ligger i minnet. 

Deretter spinner testen opp Redux to ganger. Den første gangen utfører den en action som oppretter en todo og lagrer. Den vil da sammenligne lagret tilstand og Redux tilstand. Videre spinner den nå opp Redux på nytt, for å sjekke om første tilstand blir hentet opp igjen (som skal inneholde en todo).


## Git
Vår bruk av git baserte seg på Git Workflow. Etter vi hadde satt opp prosjektet på github lagde vi en dev branch. Denne branchen funket som vår hoved utviklings branch hvor vi merget inn ny funksjonalitet. Vi branchet ut fra denne for å legge til ny funksjonalitet for så å merge branchen inn i dev igjen. For å holde oversikt over hva som måtte gjøres lagde vi utviklingsoppgaver (issues) på github. Vi linket commitsene våre opp mot utviklingsoppgavene ved å legge IDen i commit-meldingen.


## Plattformuavhengig
Vi har kontinuerlig testet appen på Android 7, Android 8 og iOS 12 for å sørge for at appen har helt lik funksjonalitet på iOS og Android. Det er likevel noen forskjeller i styling og design. Et eksempel på dette er plussknappen for å legge til et gjøremål. På Android bruker vi en Action Button nederst til høyre, mens på iOS har vi en pluss knapp øverst til høyre. (se under for screenshot av iphone og android.) Dette er et bevisst valg av oss for å følge Android og iOS konvensjoner. Kartet bruker også Google Maps og Apple Maps, og skrittelleren bruker Google Fit og Core Motion på henholdsvis Android og iOS. De forskjellige tredjeparts-bibliotekene vi brukte gjorde dette automatisk.


## Screenshots

### Screenshots fra Android
![Android Cal List Add](http://folk.ntnu.no/tinussf/it2810/p3/android_1.png)


### Screenschots fra iOS
![iOS Cal List Add](http://folk.ntnu.no/tinussf/it2810/p3/ios.png)


### Kart og Skritteller fra Android
![Android Map Pedometer](http://folk.ntnu.no/tinussf/it2810/p3/android_2.png)

