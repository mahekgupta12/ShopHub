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

  Payment: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    zip: string;
    paymentMethod: "card" | "upi" | "cod";
    items: any[];
    total: string;
  };

  OrderConfirmation: {
    orderId: string;
    total: string;
    date: string;
  };
};
