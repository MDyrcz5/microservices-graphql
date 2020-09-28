import '@babel/polyfill';
import React from 'react';
import GlobalStyles from '#root/styles/GlobalStyles';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './store';
import ReactDOM from 'react-dom';
import graphqlClient from '#root/api/graphqlClient';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={graphqlClient}>
      <GlobalStyles />
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('app')
);
