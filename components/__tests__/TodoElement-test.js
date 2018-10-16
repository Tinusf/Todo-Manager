import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoElement from "../TodoElement";
import appState from '../../store/reducers/Reducer'
import { createStore } from 'redux';

const store = createStore(appState)

it("TodoElement Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TodoElement 
        key={1}
        text={"buy eggs"}
        date={"2018-10-07"}
        completed={false}
        category={"work"} 
        store={store} navigation={{ getParam: () => { }, setParams: () => { } }} isModalVisible={false} />);

    const renderer2 = new ShallowRenderer();
    renderer2.render(renderer.getRenderOutput());
    const result = renderer2.getRenderOutput();
    expect(result).toMatchSnapshot();
});