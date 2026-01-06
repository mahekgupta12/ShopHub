import { PaymentMethod } from "../constants/index";

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Wishlist: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type CartStackParamList = {
  CartMain: undefined;
  Checkout: undefined;

  Payment: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    zip: string;
    paymentMethod: PaymentMethod;
    items: any[];
    total: string;
  };

  OrderConfirmation: {
    orderId: string;
    total: string;
    date: string;
  };
};

export type WishlistStackParamList = {
  WishlistMain: undefined;
};
