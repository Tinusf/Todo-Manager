import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to AsyncStorage

import rootReducer from "./reducers/Reducer";

// Alt blir lagret til root. (AsyncStorage)
const persistConfig = {
  key: "root",
  storage
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);


// Denne connecter persistor med redux så vi kan lagre staten med AsyncStorage.
export const persistor = persistStore(store);
