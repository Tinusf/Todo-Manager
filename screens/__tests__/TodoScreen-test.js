import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoScreen from "../TodoScreen";
import appState from '../../store/reducers/Reducer'
import { createStore } from 'redux'

const store = createStore(appState)


it("TodoScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TodoScreen navigation={{}} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
