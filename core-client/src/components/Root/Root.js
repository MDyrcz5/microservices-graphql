import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import graphqlClient from '#root/api/graphqlClient';
import { setSession } from '#root/store/ducks/session';
import { useDispatch } from 'react-redux';
import MoviesDashboard from '../MoviesDashboard/MoviesDashboard';
import Grid from '@material-ui/core/Grid';
import Listings from '../Listings/Listings';

const query = gql`
  {
    userSession(me: true) {
      id
      user {
        email
        id
      }
    }
  }
`;

const Root = () => {
  const dispatch = useDispatch();
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    graphqlClient.query({ query }).then(({ data }) => {
      if (data.userSession) {
        dispatch(setSession(data.userSession));
      }
      setInitialised(true);
    });
  }, []);

  if (!initialised) return 'Loading...';

  return (
    <>
      <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={6}>
          <MoviesDashboard />
        </Grid>
        <Grid item xs={4}>
          <Listings />
        </Grid>
      </Grid>
    </>
  );
};

export default Root;
