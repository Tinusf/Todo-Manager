import { createStore } from 'redux'
import { persistStore, persistReducer, getStoredState } from "redux-persist";

import { addTodo } from "../actions//Todo-actions";
import { createMemoryStorage } from 'storage-memory'

import rootReducer from "../reducers/Reducer";

// Replacement for AsyncStorage. AsyncStorage can not run on a non-mobile-device. This is making a virtual disk in cache, key based like AsyncStorage
// This makes the data disappear for each time the test run
const memoryStorage = createMemoryStorage() 
const persistConfig = {
  key: "root_test",
  storage: memoryStorage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const todo = {
    category: "work",
    text: "Test todo",
    date: "2018-10-10",
}

it("Asyncstorage and redux, with reducer and action", async () => {
    // Setup redux with redux-persist config as intitial state
    const store = await createStore(persistedReducer);
    // Setup redux persist to connect to the redux store
    const persistor = await persistStore(store);
    // Execute an action using redux
    await store.dispatch(addTodo(todo.category, todo.text, todo.date, todo.coords));

    // Synchronize unwritten redux state to disk
    await persistor.flush()
    // The memory storage libary use a bit of time to do so so, so we do it again to make sure the changes actually get saved.
    await persistor.flush()

    // Get the saved state
    let stateAfterAddedTodo = await getStoredState(persistConfig)
    
    // Compare redux state and saved state
    expect(stateAfterAddedTodo).toEqual(store.getState());

    // Setup redux again
    const storeReloaded = await createStore(persistedReducer);
    // Connect redux-persist to redux with redux-persist config
    await persistStore(storeReloaded);
    // Synchronize
    await getStoredState(persistConfig)
    // Get the redux state
    let stateAfterReloaded = await storeReloaded.getState()
    // Redux state should now be the same as the state last time
    expect(stateAfterAddedTodo).toEqual(stateAfterReloaded);
});