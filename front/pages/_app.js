import React, {useEffect} from 'react';
import Head from 'next/head';
import axios from 'axios';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import withReduxSaga from 'next-redux-saga';
import rootSaga from '../sagas'

import AppLayout from '../components/AppLayout';
import {LOAD_USER_REQUEST} from '../reducers/user'

const Main = ({Component, store, pageProps}) => {

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
        <Component {...pageProps}/>
      </AppLayout>
    </Provider>
  )
}

Main.getInitialProps = async (context) => {
  const {ctx, Component} = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
  if(ctx.isServer && cookie){ axios.defaults.headers.Cookie = cookie; }
  if(!state.user.me){
    ctx.store.dispatch({
      type:LOAD_USER_REQUEST
    })
  }
  if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx) || {};
  }
  return {pageProps}
}

const configStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = compose(applyMiddleware(...middlewares))
  const store = createStore(rootReducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store
}


export default withRedux(configStore)(withReduxSaga(Main))
