import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/main.css'
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import AuthContextProvider from './context/AuthContext'
import SocketContextProvider from './context/SocketContext'

const client = new ApolloClient({
   uri: '/graphql',
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
            <SocketContextProvider>
               <App />
            </SocketContextProvider>
         </AuthContextProvider>
      </BrowserRouter>
   </ApolloProvider>
   , document.getElementById('root'));