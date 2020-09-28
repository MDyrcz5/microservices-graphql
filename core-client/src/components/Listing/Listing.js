import gql from "graphql-tag";
import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  Typography, makeStyles, Toolbar, CssBaseline, CardMedia, CardContent,
  CardActions, Card, Button, AppBar, CircularProgress, List, ListItem, Paper, Grid, Link, Container, Dialog
} from "@material-ui/core";
import DialogComponent from '../DialogComponent/DialogComponent';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export const GET_LISTINGS = gql`
  query Listings ($user_id: ID!) {
    listings(user_id: $user_id){
      id
      title
      _id
    }
  }
`;

const DELETE_LISTING = gql`
  mutation($user_id: ID!, $listing_id: String!) {
    deleteListing(user_id: $user_id, listing_id: $listing_id)
  }
`;

export const GET_SINGLE_MOVIE = gql`
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

export const Listing = ({ session }) => {
  const classes = useStyles();
  const user_id = session.user.id;
  const [deleteListing] = useMutation(DELETE_LISTING);
  const { data, loading, refetch } = useQuery(GET_LISTINGS, { variables: { user_id } });
  const [singleMovie, setSingleMovie] = useState();
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState('md');

  if (loading) return (<CircularProgress />);

  const handleClick = async (listing) => {
    if (user_id && listing) {
      const listing_id = listing.id;
      const res = await deleteListing({
        variables: { user_id, listing_id }, refetchQueries: [{
          query: gql`
          query Listings ($user_id: ID!) {
            listings(user_id: $user_id){
              id
              title
            }
          } `, variables: { user_id }
        }]
      });
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleViewClick = (listing, e) => {
    e.preventDefault();
    setSingleMovie(listing._id);
    if (singleMovie) {
      handleClickOpen();
    }
  }

  return (

    <main>

      <Container className={classes.cardGrid} maxWidth='md'>
        <div style={{
          fontSize: '20px',
          display: 'flex',
          justifyContent: 'center',
          margin: '10px 0px',
          fontWeight: '600'
        }}>Your favourite movies:</div>
        {' '}
        <Grid style={{ borderLeft: '1px solid #ccc' }} container spacing={4}>
          {data.listings.map(listing => (
            <Grid item key={listing.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {listing.title}
                  </Typography>
                  <Typography>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' color='primary' onClick={(e) => handleViewClick(listing, e)}> View </Button>
                  <Button size='small' color='primary' onClick={() => handleClick(listing)} > Delete </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog open={open}
          onClose={handleClose}>
          <DialogComponent movie={singleMovie} />
        </Dialog>
      </Container>
    </main>
  );
}