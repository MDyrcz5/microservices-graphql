import React, { useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import {
  Typography, makeStyles, Toolbar, CssBaseline, CardMedia, CardContent,
  CardActions, Card, Button, AppBar, CircularProgress, List, ListItem, Paper, Grid, Link,
  Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@material-ui/core";

const GET_SINGLE_MOVIE = gql`
  query($movie_id: String!) {
    singleMovie(movie_id: $movie_id) {
      _id
      fullplot
      genres
      title
      year
    }
  }
`;

const DialogComponent = (movie_id) => {
  const { data, fetchMore, loading } = useQuery(GET_SINGLE_MOVIE, { variables: { movie_id: movie_id.movie } });

  if (loading) return (<CircularProgress />);

  return (
    <>
      <DialogTitle>{data.singleMovie.title}</DialogTitle>
      <DialogContent>
        <Typography>Year: {data.singleMovie.year}</Typography>
        <Typography>Genres: {data.singleMovie.genres}</Typography>
        <DialogContentText style={{ marginTop: '10px' }}>
          {data.singleMovie.fullplot}
        </DialogContentText>
      </DialogContent>
    </>
  )
}

export default DialogComponent;