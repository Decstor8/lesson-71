import React, {useState} from 'react';
import {ApiOrder, Customer} from '../../types';
import {useNavigate} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {clearCart, selectCartDishes, selectOrderLoading} from '../../store/cartSlice';
import {order} from '../../store/cartThunks';

const Order: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartDishes = useAppSelector(selectCartDishes);
  const orderLoading = useAppSelector(selectOrderLoading);
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: '',
    phone: '',
  });

  const customerChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setCustomer(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiOrder: ApiOrder = {
      customer: {...customer},
      dishes: [...cartDishes],
    };

    await dispatch(order(apiOrder));
    navigate('/');
    dispatch(clearCart());
  };

  let form = (
    <form onSubmit={onFormSubmit} autoComplete="off">
      <div className="form-group">
        <label htmlFor="name">Client name</label>
        <input
          id="name"
          type="text"
          name="name"
          className="form-control"
          autoComplete="off"
          required
          value={customer.name}
          onChange={customerChanged}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          className="form-control"
          required
          value={customer.address}
          onChange={customerChanged}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          name="phone"
          className="form-control"
          required
          value={customer.phone}
          onChange={customerChanged}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">Place order</button>
    </form>
  );

  if (orderLoading) {
    form = <Spinner/>;
  }

  return (
    <div className="row mt-2">
      <div className="col">
        <h4>Contact data</h4>
        {form}
      </div>
    </div>
  );
};

export default Order;