/*
 * action types
 */

export const SET_GOAL = "SET_GOAL";
export const TOGGLE_HELP = "TOGGLE_HELP";

/*
 * action creators
 */

export function setGoal(goal) {
  return { type: SET_GOAL, goal };
}

export function toggleHelp() {
  return { type: TOGGLE_HELP };
}