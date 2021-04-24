import React from "react";
import './App.scss';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';
import SocketX from "./containers/SocketX";
const App = () => {
  return (
    <Box className="container mb-5 mt-5">
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><Redirect to="/home" /> </Route>
            <Route path="/home">
              <SocketX />
            </Route>
          </Switch>
        </BrowserRouter>
      </Grid>
    </Box>
  );
};

export default App;
