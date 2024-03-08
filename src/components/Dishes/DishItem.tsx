import React from 'react';
import {Dish} from "../../types";
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {addDish} from '../../store/cartSlice';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';

const noImageAvailable = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg';

interface Props {
  dish: Dish;
  onDelete: React.MouseEventHandler;
  deleteLoading: false | string;
}

const DishItem: React.FC<Props> = ({dish, onDelete, deleteLoading}) => {
  const dispatch = useAppDispatch();
  const image = dish.image || noImageAvailable;
  const imageStyle = {
    background: `url(${image}) no-repeat center center / cover`,
  };

  const addDishToCart = () => {
    dispatch(addDish(dish));
  };

  const isLoading = deleteLoading === dish.id;

  return (
    <div className="card mb-2">
      <div className="row g-0">
        <div className="col-sm-4 rounded-start" style={imageStyle}/>
        <div className="col-sm-8">
          <div className="card-body">
            <h5 className="card-title">{dish.name}</h5>
            <p className="card-text small">
              {dish.description}
            </p>
            <p className="card-text">{dish.price} KGS</p>
            <p className="d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={addDishToCart}
                disabled={isLoading}
              >
                Add
              </button>
              <button
                className="btn btn-danger"
                onClick={onDelete}
                disabled={isLoading}
              >
                {isLoading && <ButtonSpinner/>}
                Delete
              </button>
              <Link to={'/edit-dish/' + dish.id} className="btn btn-primary">Edit</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishItem;