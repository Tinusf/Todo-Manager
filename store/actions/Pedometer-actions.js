/*
 * action types
 */

export const SET_GOAL = "SET_GOAL";

/*
 * action creators
 */

export function setGoal(goal) {
  return { type: SET_GOAL, goal};
}
