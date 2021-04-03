import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AppBar, Box, Container, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Equipment from './pages/equipment'

ReactDOM.render(
  <React.StrictMode>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Bondora developer home assignment
        </Typography>
      </Toolbar>
    </AppBar>
    <Container style={{ marginTop: 80 }} maxWidth="lg">
      <Box>
        <Router>
          <Switch>
            <Route path="/" component={Equipment} />
          </Switch>
        </Router>
      </Box>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
