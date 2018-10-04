import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoFormModal from "../TodoFormModal";


it("TodoFormModal Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TodoFormModal />)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
