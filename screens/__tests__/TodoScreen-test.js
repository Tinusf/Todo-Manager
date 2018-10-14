import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoScreen from "../TodoScreen";
import { Provider } from 'react-redux'
import appState from '../../reducers/Reducer'
import { createStore } from 'redux'

const store = createStore(appState)


it("TodoScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Provider store={store}><TodoScreen navigation={{}} /></Provider>)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
