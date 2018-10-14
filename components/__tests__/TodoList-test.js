import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoList from "../TodoList";
import { Provider } from 'react-redux'
import appState from '../../reducers/Reducer'
import { createStore } from 'redux'

const store = createStore(appState)


it("TodoList Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Provider store={store}><TodoList /></Provider>)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
