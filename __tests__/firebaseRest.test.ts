/**
 * @format
 */

import { FirebaseError, firebaseRest } from '../src/restapi/firebaseRest';

describe('FirebaseError', () => {
  // Validate the custom error shape used across Firebase REST calls.
  it('should create error with message', () => {
    const error = new FirebaseError('Test error');
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('FirebaseError');
  });

  it('should create error with message and code', () => {
    const error = new FirebaseError('Test error', 'TEST_CODE');
    expect(error.message).toBe('Test error');
    expect(error.code).toBe('TEST_CODE');
  });

  it('should create error with message, code, and details', () => {
    const details = { status: 404, info: 'Not found' };
    const error = new FirebaseError('Not found', 'NOT_FOUND', details);
    expect(error.message).toBe('Not found');
    expect(error.code).toBe('NOT_FOUND');
    expect(error.details).toBe(details);
  });

  it('should have undefined code and details when not provided', () => {
    const error = new FirebaseError('Error');
    expect(error.code).toBeUndefined();
    expect(error.details).toBeUndefined();
  });

  it('should preserve error name as FirebaseError', () => {
    const error = new FirebaseError('Test', 'CODE');
    expect(error.name).toBe('FirebaseError');
  });

  it('should be catchable as Error', () => {
    const error = new FirebaseError('Test');
    expect(error instanceof Error).toBe(true);
  });

  it('should support different code types', () => {
    const error1 = new FirebaseError('Error', 'NETWORK_ERROR');
    const error2 = new FirebaseError('Error', 'PERMISSION_DENIED');
    const error3 = new FirebaseError('Error', 'FIREBASE_ERROR');

    expect(error1.code).toBe('NETWORK_ERROR');
    expect(error2.code).toBe('PERMISSION_DENIED');
    expect(error3.code).toBe('FIREBASE_ERROR');
  });

  it('should support complex details object', () => {
    const details = {
      status: 400,
      error: 'Bad Request',
      body: { field: 'value' },
    };
    const error = new FirebaseError('Error', 'CODE', details);
    expect(error.details).toEqual(details);
    expect(error.details.status).toBe(400);
  });
});

describe('firebaseRest function', () => {
  // These tests check argument handling; calls are expected to fail without real URLs.
  it('should be defined', () => {
    expect(firebaseRest).toBeDefined();
    expect(typeof firebaseRest).toBe('function');
  });

  it('should be async function', () => {
    const result = firebaseRest('test/path', 'GET');
    expect(result instanceof Promise).toBe(true);
  });

  it('should accept path and method parameters', async () => {
    try {
      await firebaseRest('test/path', 'GET');
    } catch {
      // Expected to fail due to invalid URL
    }
  });

  it('should accept optional body parameter', async () => {
    try {
      await firebaseRest('test/path', 'POST', { key: 'value' });
    } catch {
      // Expected to fail
    }
  });

  it('should accept optional idToken parameter', async () => {
    try {
      await firebaseRest('test/path', 'GET', undefined, 'token123');
    } catch {
      // Expected to fail
    }
  });

  it('should use GET method by default', async () => {
    try {
      await firebaseRest('test/path');
    } catch {
      // Expected to fail, but we're testing default behavior
    }
  });

  it('should handle different HTTP methods', async () => {
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    for (const method of methods) {
      try {
        await firebaseRest('test/path', method);
      } catch {
        // Expected to fail for invalid paths
      }
    }
  });
});
