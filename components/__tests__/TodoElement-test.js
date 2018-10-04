import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoElement from "../TodoElement";


it("TodoElement Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TodoElement
        key={1}
        text={"buy eggs"}
        date={"2018-10-07"}
        completed={false}
        category={"work"} />)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
