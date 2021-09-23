import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const apolo = new ApolloClient({
  uri: 'https://sterling-glider-97.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': 'Dlx9qzxvdW6mXt51BmimJHOE4UHyBY3V66WMOCaEVOFl5TzQ5jNIzWLvpy8qnuV2'
  }
});

ReactDOM.render(
  <ApolloProvider client={apolo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
