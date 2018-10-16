import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import CheckBox from "../CheckBox";
import appState from '../../store/reducers/Reducer'
import { createStore } from 'redux';

const store = createStore(appState)

it("CheckBox Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<CheckBox title="test" onPress={() => { }} store={store} navigation={{ getParam: () => { }, setParams: () => { } }} isModalVisible={false} />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
});