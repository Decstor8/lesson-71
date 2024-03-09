import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './containers/Home';
import AdminDashboard from './containers/AdminMain';
import DishesList from './containers/DishList';
import NewDish from './containers/NewDish';
import EditDish from './containers/EditDish';
import OrdersList from './containers/OrdersList';
import Checkout from './containers/Checkout';
import Order from './components/Cart/Order';
import Orders from './containers/Orders';
import './App.css';

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />}>
            <Route path="continue" element={<Order />} />
          </Route>
          <Route path="/orders" element={<Orders />} />

          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="dishes" element={<DishesList />} />
            <Route path="dishes/new" element={<NewDish />} />
            <Route path="dishes/edit/:id" element={<EditDish />} />
            <Route path="orders" element={<OrdersList />} />
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Layout>
  );
}

export default App;