import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import MapPickerScreen from "../MapPickerScreen";
import appState from '../../store/reducers/Reducer'
import { createStore } from 'redux';

const store = createStore(appState)

it("MapPickerScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<MapPickerScreen title="test" onPress={() => { }} store={store} navigation={{ getParam: () => { }, setParams: () => { } }} isModalVisible={false} />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
});