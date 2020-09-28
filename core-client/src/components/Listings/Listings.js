import gql from "graphql-tag";
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Listing } from '../Listing/Listing';



const Listings = () => {
  const session = useSelector(state => state.session);
  if (!session) return null;
  return (
    <Listing session={session} />
  );
};

export default Listings;