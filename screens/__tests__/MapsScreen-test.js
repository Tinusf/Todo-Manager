import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import MapsScreen from "../MapsScreen.js";
import appState from '../../store/reducers/Reducer'
import { createStore } from 'redux'

const store = createStore(appState)

it("MapsScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<MapsScreen store={store} navigation={{ getParam: () => { }, setParams: () => { } }} isModalVisible={false} />);

    const renderer2 = new ShallowRenderer();
    renderer2.render(renderer.getRenderOutput());
    const result = renderer2.getRenderOutput();
    expect(result).toMatchSnapshot();
});