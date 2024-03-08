import React from 'react';
import DishForm from '../components/DishForm/DishForm';
import {useNavigate} from 'react-router-dom';
import {ApiDish} from '../types';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {selectCreateDishLoading} from '../store/dishesSlice';
import {createDish} from '../store/dishesThunks';

const NewDish: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCreating = useAppSelector(selectCreateDishLoading);

  const onSubmit = async (apiDish: ApiDish) => {
    await dispatch(createDish(apiDish));
    navigate('/');
  };

  return (
    <div className="row mt-2">
      <div className="col-6">
        <DishForm onSubmit={onSubmit} isLoading={isCreating} />
      </div>
    </div>
  );
};

export default NewDish;