# ShopHub

ShopHub is a React Native e‑commerce demo app with authentication, cart, checkout, orders, and profile screens. It uses React Navigation for navigation, Redux Toolkit for cart state, Firebase for data, and local persistence for cart/orders.

## Setup steps

1. Install dependencies:
   - `npm install`
2. iOS native setup (first time or after native changes):
   - `cd ios`
   - `pod install`
   - `cd ..`
3. Start Metro bundler:
   - `npm start`
4. Run the app:
   - Android: `npm run android`
   - iOS: `npm run ios`

Make sure you have the React Native environment set up (Android Studio / Xcode, device/emulator, Java, etc.).

## Library dependencies

Key runtime libraries:
- `react`, `react-native` – core framework.
- `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`, `@react-navigation/drawer` – navigation, stacks, tabs, and drawers.
- `react-native-screens`, `react-native-safe-area-context` – navigation performance and safe‑area handling.
- `@reduxjs/toolkit`, `react-redux` – global state management (cart, checkout, etc.).
- `@react-native-async-storage/async-storage` – local persistence (cart/orders, user data).
- `firebase` – backend for items, carts, and orders.
- `react-native-toast-message` – in‑app toast notifications.
- `react-native-vector-icons` – icons used across the UI.

Dev tooling:
- `@react-native-community/cli` and related packages – React Native CLI.
- `@react-native/babel-preset`, `@babel/core`, `@babel/runtime` – Babel configuration.
- `typescript`, `@react-native/typescript-config` – TypeScript support.
- `eslint`, `@react-native/eslint-config`, `prettier` – linting and formatting.
- `jest`, `react-test-renderer`, testing `@types/*` – unit testing.

## Folder structure

High‑level layout:
- `App.tsx` – root component; sets up Redux provider, navigation container, toast, and navigation loader context.
- `src/` – main app source code.

Inside `src/`:
- `src/constants/`
  - `index.ts` – shared constants for payments, categories, routes, validation rules, defaults, screen titles, placeholders, and Firebase collection names.
  - `filterOptions.ts` – product/category filters.
  - `navigationLoader.tsx` – navigation loading context/provider.
  - `upiHandles.ts` – allowed UPI handles.
- `src/navigation/`
  - `rootStack.tsx` – root stack navigator (auth vs main tabs).
  - `bottomTabs.tsx` – bottom tab navigator (Home, Cart, Orders, Profile).
  - `cartStack.tsx` – nested stack for cart/checkout/payment/confirmation flows.
  - `filter.tsx`, `types.ts` – navigation utilities and type definitions.
- `src/screens/`
  - `auth/` – login/authentication flow.
  - `home/` – home screen and product listing/filtering.
  - `cart/` – cart view and `cartStore` (Redux Toolkit store).
  - `checkout/` / `payment/` – payment details, validations, and placing orders (if split by file).
  - `orders/` – orders list and order details.
  - `profile/` – profile, theme switcher, navigation shortcuts (My Orders, Continue Shopping, Logout).
- `src/componets/` – shared UI components (buttons, inputs, cards, etc.). Note: directory is spelled `componets`.
- `src/firebase/` – Firebase configuration, initialization, and helpers (collections, queries).
- `src/persistence/` – helpers for reading/writing data to `AsyncStorage` (cart, orders, user).
- `src/config/` – app‑level configuration (API keys, environment‑specific config).

Other top‑level files:
- `package.json` – scripts and dependencies.
- `jest.config.js` – Jest test configuration.
- `metro.config.js`, `babel.config.js` – bundler and Babel configuration.
- `app.json` – app metadata.

## Known issues / limitations

- Sample/demo data: The app expects product and order data in Firebase collections defined in `FIREBASE_COLLECTIONS` (e.g., `items`, `carts`, `orders`, `userOrders`). You must configure these collections and security rules yourself.
- Firebase config not included: API keys, project ID, and other Firebase settings are not committed; you need to create your own config in `src/firebase` and ensure it matches the expected shape.
- Validation assumptions: Payment and address validations (card number length, expiry format, ZIP length, phone length, UPI ID rules) are opinionated and may not cover all real‑world edge cases or international formats.
- Platform requirements: React Native 0.82+ and Node 20+ are required; older environments may fail to build.
- Incomplete error handling: Some network/storage failures may only surface as generic error toasts using messages from `ERROR_MESSAGES` and might not provide detailed diagnostics in the UI.
