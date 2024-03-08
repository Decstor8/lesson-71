export interface ApiDish {
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface Dish extends ApiDish {
  id: string;
}

export interface ApiDishes {
  [id: string]: ApiDish;
}

export interface DishMutation {
  name: string;
  description: string;
  image: string;
  price: string;
}

export interface UpdateDishParams {
  dishId: string;
  apiDish: ApiDish;
}

export interface CartDish {
  dish: Dish;
  amount: number;
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
}

export interface ApiOrder {
  customer: Customer;
  dishes: CartDish[];
}

export interface ApiOrders {
  [id: string]: ApiOrder;
}

export interface Order extends ApiOrder {
  id: string;
  totalPrice: number;
}

export interface FetchError {
  code: string;
}