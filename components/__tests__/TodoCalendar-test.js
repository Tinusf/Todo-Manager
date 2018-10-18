import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoCalendar from "../TodoCalendar";
import appState from '../../store/reducers/Reducer'
import { createStore } from 'redux';

const store = createStore(appState)

it("TodoCalendar Matches snapshot.", () => {
    // For å slippe at snapshottet failer fordi datoen har endres seg så faker vi datoen i dag.
    const DATE_TO_USE = new Date('2016');
    const _Date = Date;
    global.Date = jest.fn(() => DATE_TO_USE);
    global.Date.UTC = _Date.UTC;
    global.Date.parse = _Date.parse;
    global.Date.now = _Date.now;

    
    const renderer = new ShallowRenderer();
    renderer.render(<TodoCalendar store={store} navigation={{ getParam: () => { }, setParams: () => { } }} isModalVisible={false} />);

    const renderer2 = new ShallowRenderer();
    renderer2.render(renderer.getRenderOutput());
    const result = renderer2.getRenderOutput();
    expect(result).toMatchSnapshot();
});