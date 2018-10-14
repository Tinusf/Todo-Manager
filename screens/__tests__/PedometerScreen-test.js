import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import PedometerScreen from "../PedometerScreen";


it("PedometerScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<PedometerScreen />)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});