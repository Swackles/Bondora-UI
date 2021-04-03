import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { AppBar, Box, Container, Toolbar, Link, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Equipment from './pages/equipment'
import Cart from './pages/cart'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

ReactDOM.render(
  <React.StrictMode>
    <AppBar position="static">
      <Toolbar>
        <Grid justify="space-between" // Add it here :)
          container>
          <Grid item>
            <Typography variant="h6">
              <Link href="/" color="inherit" underline="none">
                Bondora  home assignment
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Link href="/cart" >
              <ShoppingCartIcon style={{ fill: "white" }} fontSize="large" />
            </Link>
          </Grid>
        </Grid>


      </Toolbar>
    </AppBar>
    <Container style={{ marginTop: 80 }} maxWidth="lg">
      <Box>
        <Router>
          <Switch>
            <Route path="/equipment" component={Equipment} />
            <Route path="/cart" component={Cart} />
            <Route >
              <Redirect to="/equipment" />
            </Route>
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
