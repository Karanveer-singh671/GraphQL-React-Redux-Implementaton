import React from "react";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionPage from "./collection.component";
import Spinner from "../../components/spinner/spinner.component";

// want to make a query with the following structure (expects title value of type string)
const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: ) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;
// variables is arguments giving to query
const CollectionPageContainer = ({ match }) => (
	<Query
		query={GET_COLLECTION_BY_TITLE}
		variables={{ title: match.params.collectionId }}
	>
		{({ loading, data: { getCollectionsByTitle } }) => {
			loading ? <Spinner /> : <CollectionPage collection={getCollectionsByTitle} />;
		}}
	</Query>
);
