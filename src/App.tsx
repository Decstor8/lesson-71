import Home from './containers/Home';
import NewDish from './containers/NewDish';
import {Route, Routes} from 'react-router-dom';
import Checkout from './containers/Checkout';
import Order from './components/Cart/Order';
import EditDish from './containers/EditDish';
import Orders from './containers/Orders';
import Layout from './components/Layout/Layout';
import OrdersList from "./containers/OrdersList";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/admin/orders" element={<OrdersList />} />
        <Route path="/" element={(<Home />)} />
        <Route path="/new-dish" element={(<NewDish />)}/>
        <Route path="/edit-dish/:id" element={(<EditDish />)}/>
        <Route path="/checkout" element={(<Checkout />)}>
          <Route path="continue" element={(<Order />)} />
        </Route>
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<h1>Not found!</h1>} />
      </Routes>
    </Layout>
  );
}

export default App
