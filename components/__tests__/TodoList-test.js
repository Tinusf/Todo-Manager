import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoList from "../TodoList";

const todos = [{ id: 1, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false }, { id: 2, text: "gjør webdev øvinga", date: "2018-10-04", category: "fun", completed: true }];

it("TodoList Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TodoList
        todos={todos} />)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
