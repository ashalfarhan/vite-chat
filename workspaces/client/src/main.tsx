import { ThemeProvider } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ChatProvider from './context/ChatContext/Provider'
import GlobalStyle from './style/Global'
import theme from './theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ChatProvider>
        <GlobalStyle />
        <App />
      </ChatProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
