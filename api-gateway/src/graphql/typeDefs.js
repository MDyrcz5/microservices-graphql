import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar Date

  type Listing {
    genre: String!
    id: ID!
    user_id: ID!
    title: String!
    year: Int!
    _id: String!
  }

  input ListingInput {
    _id: ID!
    title: String!
  }

  type User {
    email: String!
    id: ID!
  }

  type Movie {
    title: String!
    genres: [String!]
    year: Int!
    _id: ID!
  }

  type UserSession {
    createdAt: Date!
    expiresAt: Date!
    id: ID!
    user: User!
  }

  type FullMovie {
    _id: String!
    fullplot: String!
    genres: [String!]
    cast: [String!]!
    title: String!
    directors: [String!]!
    year: Int!
    imdb: Imdb!
  }

  type Imdb {
    rating: Float!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    createUserSession(email: String!, password: String!): UserSession!
    deleteUserSession(sessionId: ID!): Boolean!
    createListing(user_id: ID!, listings: [ListingInput!] ): Boolean!
    deleteListing(user_id: ID!, listing_id: String!): Boolean!
  }

  type Query {
    listings(user_id: ID!): [Listing!]
    userSession(me: Boolean!): UserSession
    movies(page_number: Int!): [Movie!]
    singleMovie(movie_id: String!): FullMovie
  }
`;

export default typeDefs;
