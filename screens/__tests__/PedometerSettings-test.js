import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import PedometerSettings from "../PedometerSettings";
import appState from '../../store/reducers/Reducer'
import { createStore } from 'redux';

const store = createStore(appState)

it("PedometerSettings Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<PedometerSettings store={store} navigation={{ getParam: () => { }, setParams: () => { } }} isModalVisible={false} />);

    const renderer2 = new ShallowRenderer();
    renderer2.render(renderer.getRenderOutput());
    const result = renderer2.getRenderOutput();
    expect(result).toMatchSnapshot();
});