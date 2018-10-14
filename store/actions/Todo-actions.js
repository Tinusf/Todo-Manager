/*
 * action types
 */

export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

export const REMOVE_TODO = "REMOVE_TODO";

/*
 * action creators
 */

export function addTodo(category, text, date, coords) {
  return { type: ADD_TODO, category, text, date, coords};
}

export function toggleTodo(id) {
  return { type: TOGGLE_TODO, id};
}

export function removeTodo(id) {
  return { type: REMOVE_TODO, id };
}
