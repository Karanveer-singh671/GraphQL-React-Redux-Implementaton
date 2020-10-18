import { gql } from "apollo-boost";

// Type definition so capitalize
export const typeDefs = gql`
	extend type Mutation {
		ToggleCartHidden: Boolean!
	}
`;

// specify to apollo that cartHidden is on client side use client directive (@client )
const GET_CART_HIDDEN = gql`
	{
		cartHidden @client
	}
`;

export const resolvers = {
	Mutation: {
		// _root is top level object that holds actual types
		// _args represents all arguments could get access to
		// _context argument  is what apollo has access to includes cache and client itself ca destructure if just need cache
		// _info last argument info about query / mutation
		ToggleCartHidden: (_root, _args, { cache }) => {
			const { cartHidden } = cache.readQuery({
				query: GET_CART_HIDDEN,
			});

			cache.writeQuery({
				query: GET_CART_HIDDEN,
				data: { cartHidden: !cartHidden },
			});
			return !cartHidden;
		},
	},
};
