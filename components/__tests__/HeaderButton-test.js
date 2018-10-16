import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import HeaderButton from "../HeaderButton";
import appState from '../../store/reducers/Reducer'
import { createStore } from 'redux';

const store = createStore(appState)

it("HeaderButton Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<HeaderButton title="test" onPress={()=> {}} store={store} navigation={{ getParam: () => { }, setParams: () => { } }} isModalVisible={false} />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
});