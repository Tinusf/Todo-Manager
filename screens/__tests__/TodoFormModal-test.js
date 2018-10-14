import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoFormModal from "../TodoFormModal";
import { Provider } from 'react-redux'
import appState from '../../reducers/Reducer'
import { createStore } from 'redux'

const store = createStore(appState)


it("TodoFormModal Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Provider store={store}><TodoFormModal navigation={{setParams: () => {}}} isModalVisible={true}/></Provider>)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
