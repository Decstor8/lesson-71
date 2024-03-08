import React, { useEffect, useState } from 'react';
import axiosApi from '../axiosApi';
import OrderDetails from './OrderDetails';
import { CompleteOrder } from '../types';

const OrdersList: React.FC = () => {
    const [orders, setOrders] = useState<CompleteOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosApi.get( '/orders.json');
                const fetchedOrders: CompleteOrder[] = Object.keys(response.data || {}).map(key => ({
                    ...response.data[key],
                    id: key,
                }));
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Ошибка при загрузке заказов: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {orders.length > 0 ? orders.map(order => (
                <OrderDetails key={order.id} order={order} />
            )) : <div>Заказы не найдены.</div>}
        </div>
    );
};

export default OrdersList;