import {ApiDish, Dish, FetchError} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createDish, deleteDish, fetchDishes, fetchOneDish, updateDish} from './dishesThunks';
import {RootState} from '../app/store';

interface DishesState {
  items: Dish[];
  fetchLoading: boolean;
  deleteLoading: false | string;
  createLoading: boolean;
  oneDish: ApiDish | null;
  fetchOneLoading: boolean;
  fetchOneError: FetchError | null;
  updateLoading: boolean;
}

const initialState: DishesState = {
  items: [],
  fetchLoading: false,
  deleteLoading: false,
  createLoading: false,
  oneDish: null,
  fetchOneLoading: false,
  fetchOneError: null,
  updateLoading: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
      state.fetchLoading = false;
      state.items = dishes;
    }).addCase(fetchDishes.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteDish.pending, (state, {meta: {arg: dishId}}) => {
      state.deleteLoading = dishId;
    }).addCase(deleteDish.fulfilled, (state) => {
      state.deleteLoading = false;
    }).addCase(deleteDish.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(createDish.pending, (state) => {
      state.createLoading = true;
    }).addCase(createDish.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createDish.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchOneDish.pending, (state) => {
      state.fetchOneError = null;
      state.fetchOneLoading = true;
    }).addCase(fetchOneDish.fulfilled, (state, {payload: oneDish}) => {
      state.oneDish = oneDish;
      state.fetchOneLoading = false;
    }).addCase(fetchOneDish.rejected, (state, {payload: error}) => {
      state.fetchOneLoading = false;
      state.fetchOneError = error || null;
    });

    builder.addCase(updateDish.pending, (state) => {
      state.updateLoading = true;
    }).addCase(updateDish.fulfilled, (state) => {
      state.updateLoading = false;
    }).addCase(updateDish.rejected, (state) => {
      state.updateLoading = false;
    });
  }
});

export const dishesReducer = dishesSlice.reducer;

export const selectDishes = (state: RootState) => state.dishes.items;
export const selectOneDish = (state: RootState) => state.dishes.oneDish;

export const selectFetchDishesLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectDeleteDishLoading = (state: RootState) => state.dishes.deleteLoading;
export const selectCreateDishLoading = (state: RootState) => state.dishes.createLoading;
export const selectUpdateDishLoading = (state: RootState) => state.dishes.updateLoading;
export const selectFetchOneDishLoading = (state: RootState) => state.dishes.fetchOneLoading;

export const selectFetchOneDishError = (state: RootState) => state.dishes.fetchOneError;
