import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodoCalendar from "../TodoCalendar";

const todos = [{ id: 1, text: "kjøp melk", date: "2018-10-05", category: "work", completed: false }, { id: 2, text: "gjør webdev øvinga", date: "2018-10-04", category: "fun", completed: true }];

it("TodoCalendar Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TodoCalendar todos={todos} />)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});

test("createMarkedObject takes in a array of todos and returns an object that is marked with the correct colors of the dates.", () => {
    const correctOutput = { "2018-10-04": { "dots": [{ "color": "orange"}] }, "2018-10-05": { "dots": [{ "color": "red"}] } };

    expect(new TodoCalendar().createMarkedObject(todos)).toEqual(correctOutput);
});
