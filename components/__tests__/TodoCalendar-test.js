import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoCalendar from "../TodoCalendar";
import { Provider } from 'react-redux'
import appState from '../../reducers/Reducer'
import { createStore } from 'redux'

const store = createStore(appState)


it("TodoCalendar Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Provider store={store}><TodoCalendar /></Provider>)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});