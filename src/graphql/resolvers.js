import { gql } from "apollo-boost";

import { addItemToCart } from "./cart.utils";

// Type definition so capitalize
export const typeDefs = gql`
	extend type Item {
		quantity: Int
	}
	extend type Mutation {
		ToggleCartHidden: Boolean!
		AddItemToCart(item: Item!): [Item]!
	}
`;

// specify to apollo that cartHidden is on client side use client directive (@client )
const GET_CART_HIDDEN = gql`
	{
		cartHidden @client
	}
`;

const GET_CART_ITEMS = gql`
	{
		cartItems @client
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
		AddItemToCart: (_root, { item }, { cache }) => {
			const { cartItems } = cache.readQuery({
				query: GET_CART_HIDDEN,
			});
			const newCartItems = AddItemToCart(cartItems, item);

			cache.writeQuery({
				query: GET_CART_ITEMS,
				DATA: { cartItems: newCartItems },
			});
			return newCartItems;
		},
	},
};
