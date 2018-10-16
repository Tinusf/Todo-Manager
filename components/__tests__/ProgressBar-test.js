import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import ProgressBar from "../ProgressBar";
import appState from '../../store/reducers/Reducer'
import { createStore } from 'redux';

const store = createStore(appState)

it("ProgressBar Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<ProgressBar store={store} navigation={{ getParam: () => { }, setParams: () => { } }} isModalVisible={false} />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
});