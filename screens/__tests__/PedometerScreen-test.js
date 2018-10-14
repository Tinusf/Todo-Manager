import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import PedometerScreen from "../PedometerScreen";
import { Provider } from 'react-redux'
import appState from '../../store/reducers/Reducer'
import { createStore } from 'redux'

const store = createStore(appState)



it("PedometerScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Provider store={store}><PedometerScreen /></Provider>)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});