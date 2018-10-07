import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoActionButton from "../TodoActionButton";


it("TodoActionButton Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TodoActionButton />)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
