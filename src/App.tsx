import { BrowserRouter } from 'react-router-dom'

import { GlobalCss } from './styles'

import Router from './Routes'

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalCss />
        <Router />
      </BrowserRouter>
    </>
  )
}

export default App
