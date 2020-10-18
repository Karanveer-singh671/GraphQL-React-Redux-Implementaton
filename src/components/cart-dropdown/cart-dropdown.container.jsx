import React from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import CartDropdown from "./cart-dropdown.component";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import CartItem from "../cart-item/cart-item.component";
import cartIconComponent from "../cart-icon/cart-icon.component";

// mutation
const TOGGLE_CART_HIDDEN = gql`
	mutation ToggleCartHiden {
		toggleCartHidden @client
	}
`;

const GET_CART_ITEMS = gql`
	{
		cartItems @client
	}
`;

const CartDropdownContainer = () => (
	<Mutation mutation={TOGGLE_CART_HIDDEN}>
		{(toggleCartHidden) => (
			<Query query={GET_CART_ITEMS}>
				{({ data: { cartItems } }) => (
					<CartDropdown
						cartItems={CartItem}
						toggleCartHidden={toggleCartHidden}
					/>
				)}
			</Query>
		)}
	</Mutation>
);

export default CartDropdownContainer;
