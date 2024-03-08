import React from 'react';
import { CompleteOrder } from '../types';

interface OrderDetailsProps {
    order: CompleteOrder;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {

    const totalPrice = order.dishes.reduce((sum, cartDish) => {
        return sum + cartDish.amount * cartDish.dish.price;
    }, 0);

    return (
        <div>
            <p>Customer: {order.customer.name}</p>
            <p>Address: {order.customer.address}</p>
            <p>Phone: {order.customer.phone}</p>
            <ul>
                {order.dishes.map((item, index) => (
                    <li key={index}>
                        Блюдо: {item.dish.name}, Количество: {item.amount}, Цена: {item.dish.price}
                        {item.dish.description && (<p>Описание: {item.dish.description}</p>)}
                        {item.dish.image && (<img src={item.dish.image} alt={item.dish.name} style={{width: "100px"}}/>)}
                    </li>
                ))}
            </ul>
            <p>Total Price: {totalPrice}</p>
        </div>
    );
};

export default OrderDetails;
