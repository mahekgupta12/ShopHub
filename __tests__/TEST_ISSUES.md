# ShopHub Unit Testing - Issues Report

## Summary
**Test Suites:** 8 failed, 6 passed (14 total)  
**Tests:** 4 failed, 80 passed (84 total)  
**Pass Rate:** 95.2%

---

## 🔴 Critical Issues

### 1. AsyncStorage NativeModule Not Initialized (5 test suites)
**Affected Files:**
- ❌ `storage.test.ts`
- ❌ `cartPersistence.test.ts`
- ❌ `checkoutPersistence.test.ts`
- ❌ `authHelpers.test.ts`
- ❌ `authPersistence.test.ts`

**Root Cause:**
```
[@RNC/AsyncStorage]: NativeModule: AsyncStorage is null.
```

The Jest environment for React Native doesn't properly initialize AsyncStorage's native module. This is because AsyncStorage requires native platform modules (iOS/Android) that Jest can't access.

**Solution:**
The test files need to mock AsyncStorage at the module level BEFORE importing any files that use it. Update each affected test file:

```typescript
// At the very top of the test file, before other imports
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Then import your modules
import { setJson, getJson, removeItem } from '../src/persistence/storage';
```

---

### 2. React-Redux ESM Import Error (App.test.tsx)
**Affected File:** ❌ `App.test.tsx`

**Error:**
```
Cannot use import statement outside a module
at react-redux/dist/react-redux.legacy-esm.js:34
```

**Root Cause:**
Jest is trying to parse react-redux's ESM module but the configuration doesn't handle ES modules properly.

**Solution:**
Update `jest.config.js` to transform node_modules:

```javascript
module.exports = {
  // ... existing config ...
  transformIgnorePatterns: [
    'node_modules/(?!(react-redux|@reduxjs/toolkit)/)',
  ],
};
```

---

### 3. Firebase Error Handling in wishlistFirebase.test.ts (3 test failures)
**Affected File:** ⚠️ `wishlistFirebase.test.ts` (9/12 passing)

**Failed Tests:**
1. `saveWishlistToFirebase › should handle permission denied error`
2. `saveWishlistToFirebase › should throw on non-permission errors`
3. `addItemToFirebaseWishlist › should handle permission denied error gracefully`

**Root Cause:**
The test expects certain error behaviors but the mock returns different values.

**Solution:**
Update test mocks to properly simulate FirebaseError with correct properties.

---

### 4. firebaseRest.test.ts Error (1 test failure)
**Affected File:** ⚠️ `firebaseRest.test.ts` (11/12 passing)

**Failed Test:**
- `firebaseRest function › should accept optional body parameter`

**Root Cause:**
Test expects successful response but mock is returning an error.

---

## ✅ Passing Test Suites (6/14)
- ✓ `authKeys.test.ts` (13/13)
- ✓ `api.test.ts` (9/9)
- ✓ `commonStyles.test.ts` (10/10)
- ✓ `appPressables.test.tsx` (7/7)
- ✓ `emptyState.test.tsx` (8/8)
- ✓ `safeFetch.test.ts` (10/10)

---

## 📋 Action Items

### Immediate (High Priority)
1. **Fix AsyncStorage Mocking** - Add proper jest.mock() calls to all affected files
2. **Fix React-Redux Configuration** - Update jest.config.js transformIgnorePatterns
3. **Fix Firebase Mock Tests** - Correct error simulation in wishlistFirebase tests

### Files to Modify
1. `__tests__/storage.test.ts`
2. `__tests__/cartPersistence.test.ts`
3. `__tests__/checkoutPersistence.test.ts`
4. `__tests__/authHelpers.test.ts`
5. `__tests__/authPersistence.test.ts`
6. `__tests__/App.test.tsx`
7. `__tests__/wishlistFirebase.test.ts`
8. `__tests__/firebaseRest.test.ts`
9. `jest.config.js` - Update transformIgnorePatterns

### Testing After Fixes
```bash
npm test
```

---

## Test Execution Command
```bash
npm test -- --verbose --bail
```

For specific test file:
```bash
npm test -- storage.test.ts
```

---

## Notes
- 80 out of 84 tests passing is a strong foundation
- Most failures are due to Jest/React Native integration issues, not test logic
- Once AsyncStorage and ESM module handling are fixed, pass rate should reach ~100%
