import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import CartIcon from "./cart-icon.component";

// mutation
const TOGGLE_CART_HIDDEN = gql`
	mutation ToggleCartHiden {
		toggleCartHidden @client
	}
`;

const CartIconContainer = () => (
	<Mutation mutation={TOGGLE_CART_HIDDEN}>
		{(toggleCartHidden) => <CartIcon toggleCartHidden={toggleCartHidden} />}
	</Mutation>
);
export default CartIconContainer;
