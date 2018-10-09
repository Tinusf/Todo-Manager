import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoScreen from "../TodoScreen";


it("TodoScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TodoScreen navigation={{}} />)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
