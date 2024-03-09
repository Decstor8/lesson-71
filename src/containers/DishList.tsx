import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDishes, deleteDish } from '../store/dishesThunks';
import { Link } from 'react-router-dom';

const DishesList = () => {
    const dispatch = useDispatch();
    const dishes = useSelector((state) => state.dishes.items);

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    const handleDelete = (id: string | number) => {
        dispatch(deleteDish(id));
    };

    return (
        <div className='border-dishes'>
            <h2 className='text-center'>Список блюд</h2>
            {dishes.map(dish => (
                <div className='text-center' key={dish.id}>
                    <img src={dish.image} alt={dish.title} style={{width: '100px', height: '100px'}}/>
                    <h3>{dish.title}</h3>
                    <p>Цена: {dish.price} KGS</p>
                    <button className='btn-dishes' onClick={() => handleDelete(dish.id)}>Удалить</button>
                    <Link className='text-decoration-none' to={`/admin/dishes/edit/${dish.id}`}>Редактировать</Link>
                </div>
            ))}
            <Link className='text-decoration-none text-center' to="/admin/dishes/new">Добавить новое блюдо</Link>
        </div>
    );
};

export default DishesList;