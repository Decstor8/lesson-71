import React, {useEffect} from 'react';
import DishItem from "./DishItem";
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDeleteDishLoading, selectDishes, selectFetchDishesLoading} from '../../store/dishesSlice';
import {deleteDish, fetchDishes} from '../../store/dishesThunks';
import Spinner from '../Spinner/Spinner';

const Dishes: React.FC = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const fetchLoading = useAppSelector(selectFetchDishesLoading);
  const deleteLoading = useAppSelector(selectDeleteDishLoading);

  const removeDish = async (id: string) => {
    await dispatch(deleteDish(id));
    await dispatch(fetchDishes());
  };

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <>
      <h4>Dishes</h4>
      {fetchLoading ? <Spinner/> : dishes.map(dish => (
        <DishItem
          key={dish.id}
          dish={dish}
          onDelete={() => removeDish(dish.id)}
          deleteLoading={deleteLoading}
        />
      ))}
    </>
  );
};

export default Dishes;