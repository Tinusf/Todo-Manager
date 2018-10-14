import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoElement from "../TodoElement";
import { Provider } from 'react-redux'
import appState from '../../store/reducers/Reducer'
import { createStore } from 'redux'

const store = createStore(appState)

it("TodoElement Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Provider store={store}><TodoElement
        key={1}
        text={"buy eggs"}
        date={"2018-10-07"}
        completed={false}
        category={"work"} /></Provider>)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
