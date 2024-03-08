import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiOrder} from '../types';
import axiosApi from '../axiosApi';

export const order = createAsyncThunk<void, ApiOrder>(
  'cart/order',
  async (apiOrder) => {
    await axiosApi.post('/orders.json', apiOrder);
  },
);