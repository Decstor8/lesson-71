import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div>
            <h1 className='text-center fw-bold fs-1'>Административная панель</h1>
            <nav>
                <ul className='text-center'>
                    <li>
                        <Link className='link-admin' to="/admin/dishes">Блюда</Link>
                    </li>
                    <li>
                        <Link className='link-admin' to="/admin/orders">Заказы</Link>
                    </li>
                </ul>
            </nav>
            {/* Outlet будет отображать компоненты, соответствующие вложенным роутам */}
            <Outlet />
        </div>
    );
};

export default AdminDashboard;
