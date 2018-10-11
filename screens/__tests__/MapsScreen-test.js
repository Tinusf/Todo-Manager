import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import MapsScreen from "../MapsScreen.js";


it("MapsScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<MapsScreen />)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
