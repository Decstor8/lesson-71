import {CartDish, Dish} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {order} from './cartThunks';

interface CartState {
  cartDishes: CartDish[];
  orderLoading: boolean;
}

const initialState: CartState = {
  cartDishes: [],
  orderLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dish.id);

      if (index !== -1) {
        state.cartDishes[index].amount++;
      } else {
        state.cartDishes.push({
          dish,
          amount: 1,
        });
      }
    },
    clearCart: (state) => {
      state.cartDishes = [];
    },
    updateDishes: (state, {payload: dishes}: PayloadAction<Dish[]>) => {
      const newCartDishes: CartDish[] = [];

      state.cartDishes.forEach(cartDish => {
        const existingDish = dishes.find(dish => cartDish.dish.id === dish.id);

        if (!existingDish) {
          return;
        }

        newCartDishes.push({
          amount: cartDish.amount,
          dish: existingDish,
        });
      });

      state.cartDishes = newCartDishes;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(order.pending, (state) => {
      state.orderLoading = true;
    }).addCase(order.fulfilled, (state) => {
      state.orderLoading = false;
    }).addCase(order.rejected, (state) => {
      state.orderLoading = false;
    });
  }
});

export const cartReducer = cartSlice.reducer;

export const {addDish, clearCart, updateDishes} = cartSlice.actions;

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;
export const selectOrderLoading = (state: RootState) => state.cart.orderLoading;