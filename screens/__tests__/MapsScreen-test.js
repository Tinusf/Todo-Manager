import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import MapsScreen from "../MapsScreen.js";
import { Provider } from 'react-redux'
import appState from '../../reducers/Reducer'
import { createStore } from 'redux'

const store = createStore(appState)

it("MapsScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Provider store={store}><MapsScreen navigation={{}} /></Provider>)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
