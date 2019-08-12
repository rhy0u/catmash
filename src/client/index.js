import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import apolloClient from 'client/utils/apolloClient'
import App from 'client/components/App'
import GlobalStyle from 'client/components/GlobalStyle'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <App />
      <GlobalStyle />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)
