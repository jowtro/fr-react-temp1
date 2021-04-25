import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Button } from '@material-ui/core';
import './Login.scss';
import configData from '../util/config.json';

async function loginUser(credentials) {
  return fetch(`${configData.base_url}/api/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    .catch(err => {
      let data = err.response ? err.response.data : undefined;
      console.log(`DEU RUIM ${err} ${data}`);
  });
}

const Login = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // const validateForm = () => {
  //   return username?.length > 0 && password?.length > 0;
  // }

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      "user": username,
      "password": password
    });
    setToken(token);
  }
  //onSubmit={handleSubmit}
  //onChange={(e) => setUserName(e.target.value)}
  //onChange={(e) => setPassword(e.target.value)}
  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth type="submit" variant="contained">
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}


export default Login;