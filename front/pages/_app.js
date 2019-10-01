import React, {useEffect} from 'react';
import Head from 'next/head';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers';

import createSagaMiddleware from 'redux-saga';
import withReduxSaga from 'next-redux-saga';
import rootSaga from '../sagas'


import AppLayout from '../components/AppLayout';




const Main = ({Component, store}) => {

  return(
    <Provider store={store}>
      <Head>
        <title>Weather</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head>
      <AppLayout>
        <Component/>
      </AppLayout>
    </Provider>
  )
}

const configStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
    applyMiddleware(...middlewares),
    !options.isServer&& window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
    window.__REDUX_DEVTOOLS_EXTENSION__() :
    (f) => f)
  const store = createStore(rootReducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store
}


export default withRedux(configStore)(withReduxSaga(Main))
