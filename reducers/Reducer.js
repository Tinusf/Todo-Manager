import { combineReducers } from "redux";
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from "../actions/Todo-actions";

todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          category: action.category,
          text: action.text,
          date: action.date,
          completed: false,
          id: state.length === 0 ? 0 : state[state.length - 1].id + 1
        }
      ];
    case TOGGLE_TODO:
      state.map(todo => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo));
    case REMOVE_TODO:
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};


const todoApp = combineReducers({
  todos
});

export default todoApp;
