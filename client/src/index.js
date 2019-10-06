import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/main.css'
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import AuthContextProvider from './context/AuthContext'

const client = new ApolloClient({
   uri: 'http://localhost:4000',
   request: operation => {
      const token = localStorage.getItem('token')
      operation.setContext({
         headers: {
            authorization: token ? token : ''
         }
      })
   }
})

ReactDOM.render(
   <ApolloProvider client={client}>
      <BrowserRouter>
         <AuthContextProvider>
            <App />
         </AuthContextProvider>
      </BrowserRouter>
   </ApolloProvider>
   , document.getElementById('root'));