import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import session from "redux-persist/lib/storage/session";

import bookmarkReducer from "./bookmark/bookmark.slice";
import cartReducer from "./cart/cart.slice";
import audioReducer from "./audio/audio.slice";
import cartModalReducer from "./modal/cartmodal.slice";
import authReducer from "./auth/auth.slice";
import refreshReducer from "./refresh/refresh.slice";

import logger from "redux-logger";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["auth", "bookmark", "cart", "audio", "cartModal", "refresh"],
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const bookmarkPersistConfig = {
  key: "bookmark",
  storage: storage,
};

const cartPersistConfig = {
  key: "cart",
  storage: session,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  bookmark: persistReducer(bookmarkPersistConfig, bookmarkReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  audio: audioReducer,
  cartModal: cartModalReducer,
  refresh: refreshReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const additionalMiddleware =
  process.env.NODE_ENV === "development" ? [logger] : [];

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(additionalMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };
