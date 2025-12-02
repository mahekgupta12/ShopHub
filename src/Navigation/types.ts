export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
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
  OrderConfirmation: {
    orderId: string;
    total: string;
    date: string;
  };
};
