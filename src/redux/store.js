import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import reducers from './root-reducer';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

const composeEnhancers =
  process.env.NODE_ENV !== 'production'
    ? typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose
    : compose || null;

const middlewareList = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middlewareList.push(logger);
}

const enhancer = composeEnhancers(applyMiddleware(...middlewareList));

export const store = createStore(reducers, enhancer);

export const persistor = persistStore(store);
