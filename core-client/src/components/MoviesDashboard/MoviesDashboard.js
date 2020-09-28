import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import GET_LISTINGS from '../Listing/Listing';
import {
  Typography, makeStyles, Toolbar, CssBaseline, CardMedia, CardContent,
  CardActions, Card, Button, AppBar, CircularProgress, List, ListItem, Paper, Grid, Link,
  Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
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
  }, rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
}));

const GET_MOVIES = gql`
  query($page_number: Int!) {
     movies(page_number: $page_number) {
      _id
      title
    }
  }
`;

const ADD_LISTINGS = gql`
  mutation($user_id: ID!, $listings: [ListingInput!]!) {
    createListing(user_id: $user_id, listings: $listings)
  }
`;

const MoviesDashboard = () => {
  const classes = useStyles();
  const [createListing] = useMutation(ADD_LISTINGS);
  const [page, setPage] = useState(0);
  const { data, fetchMore, loading } = useQuery(GET_MOVIES, { variables: { page_number: page } });
  const [listings, setMovieList] = useState([]);
  const session = useSelector(state => state.session);
  const [singleMovie, setSingleMovie] = useState();
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState('md');

  if (loading) return (<CircularProgress />);

  const handleClick = (movie) => {
    const movienew = {
      title: movie.title,
      _id: movie._id
    }
    setMovieList([...listings, movienew]);
  }

  const clearList = () => {
    setMovieList([]);
  }

  const handleSubmit = (async (e) => {
    e.preventDefault();
    const user_id = session.user.id;
    const res = await createListing({
      variables: { user_id, listings }, refetchQueries: [{
        query: gql`
          query Listings ($user_id: ID!) {
            listings(user_id: $user_id){
              id
              title
            }
          } `, variables: { user_id }
      }]
    });
    clearList();
  });

  const handleLoadMore = (async (e) => {
    e.preventDefault();
    setPage(prevPage => prevPage + 1);
    fetchMore({
      variables: { page_number: page + 1 }, updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...fetchMoreResult, data: {
            movies: [
              ...fetchMoreResult.movies,
              ...data.movies
            ]
          }
        };
      }
    })
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewClick = (movie, e) => {
    e.preventDefault();
    setSingleMovie(movie._id);
    if (singleMovie) {
      handleClickOpen();
    }
  }

  return (
    <>
      <main>
        <Container className={classes.cardGrid}>
          <Grid container spacing={4}>
            {data.movies.map((movie) => (
              <Grid item key={movie._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {movie.title}
                    </Typography>
                    <Typography>
                      {movie.year}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size='small' color='primary' onClick={(e) => handleViewClick(movie, e)}> View </Button>
                    <Button size='small' color='primary' onClick={() => handleClick(movie)} > Add to list </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <form onSubmit={(e) => handleLoadMore(e)}>
            <Button type="submit" variant="contained">Load more ....</Button>
          </form>
          <Dialog open={open}
            onClose={handleClose}>
            <DialogComponent movie={singleMovie} />
          </Dialog>
        </Container>
      </main>
      {session && listings.length > 0 && (
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Movies picked: {listings.length}
            </Typography>
            <section className={classes.rightToolbar}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Button style={{ marginRight: '10px' }} type="submit" variant="contained" color="secondary">Add Movies</Button>
                <Button onClick={() => clearList()} variant="contained">Clear</Button>
              </form>
            </section>
          </Toolbar>
        </AppBar>

      )}
    </>
  );
};

export default MoviesDashboard;

