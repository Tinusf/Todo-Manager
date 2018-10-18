import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import PedometerScreen from "../PedometerScreen";
import appState from '../../store/reducers/Reducer'
import { createStore } from 'redux';

const store = createStore(appState)

it("PedometerScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<PedometerScreen store={store} navigation={{ getParam: () => { }, setParams: () => { } }} isModalVisible={false} />);

    const renderer2 = new ShallowRenderer();
    renderer2.render(renderer.getRenderOutput());
    const result = renderer2.getRenderOutput();
    expect(result).toMatchSnapshot();
});