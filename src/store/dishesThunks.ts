import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {ApiDish, ApiDishes, Dish, FetchError, UpdateDishParams} from '../types';
import {AppDispatch} from '../app/store';
import {updateDishes} from './cartSlice';
import {isAxiosError} from 'axios';

export const fetchDishes = createAsyncThunk<Dish[], void, {dispatch: AppDispatch}>(
  'dishes/fetchAll',
  async (_arg, thunkAPI) => {
    const {data: dishes} = await axiosApi.get<ApiDishes | null>('/dishes.json');

    let newDishes: Dish[] = [];

    if (dishes) {
      newDishes = Object.keys(dishes).map(key => ({
        id: key,
        ...dishes[key],
      }));
    }

    thunkAPI.dispatch(updateDishes(newDishes));
    return newDishes;
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'dishes/delete',
  async (dishId) => {
    await axiosApi.delete(`/dishes/${dishId}.json`);
  },
);

export const createDish = createAsyncThunk<void, ApiDish>(
  'dishes/create',
  async (apiDish) => {
    await axiosApi.post('/dishes.json', apiDish);
  }
);

export const fetchOneDish = createAsyncThunk<ApiDish, string, {rejectValue: FetchError}>(
  'dishes/fetchOne',
  async (dishId, thunkAPI) => {
    try {
      const {data: dish} = await axiosApi.get<ApiDish | null>(`/dishes/${dishId}.json`);

      if (dish === null) {
        return thunkAPI.rejectWithValue({code: 'not_found'});
      }

      return dish;
    } catch (e) {
      if (isAxiosError(e) && !e.response) {
        return thunkAPI.rejectWithValue({code: 'internet_problem'});
      }

      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return thunkAPI.rejectWithValue({code: 'firebase_problem'});
      }

      throw e;
    }
  },
);

export const updateDish = createAsyncThunk<void, UpdateDishParams>(
  'dishes/update',
  async ({dishId, apiDish}) => {
    await axiosApi.put(`/dishes/${dishId}.json`, apiDish);
  },
);