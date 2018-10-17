import { combineReducers } from "redux";
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from "../actions/Todo-actions";
import { SET_GOAL, TOGGLE_HELP } from "../actions/Settings-actions";

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
          coords: action.coords,
          id: state.length === 0 ? 0 : state[state.length - 1].id + 1
        }
      ];
    case TOGGLE_TODO:
      return state.map(todo => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo));
    case REMOVE_TODO:
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

settings = (state = {goal: "5000", helpAlert: true}, action) => {
  switch (action.type) {
    case SET_GOAL:
      return Object.assign({}, state, {
        goal: action.goal
      })
    case TOGGLE_HELP:
      return Object.assign({}, state, {
        helpAlert: !state.helpAlert
      })
      
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  settings
});

export default todoApp;
