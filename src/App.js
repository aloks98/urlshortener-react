import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import AnonShortenerForm from './components/AnonShortenerForm'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/">
            <AnonShortenerForm />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
