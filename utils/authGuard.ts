import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

/**
 * Auth Guard - Checks if user is authenticated and token is valid
 * Redirects to login if authentication fails
 */
export const checkAuth = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      console.log('No auth token found - redirecting to login');
      router.replace('/login');
      return false;
    }

    // Token exists - user is authenticated
    return true;
  } catch (error) {
    console.error('Auth check error:', error);
    router.replace('/login');
    return false;
  }
};

/**
 * Check if API response indicates token expiration or auth error
 * Returns true if token is expired/invalid
 */
export const isAuthError = (statusCode: number, responseCode?: string): boolean => {
  // 401 = Unauthorized, 403 = Forbidden
  if (statusCode === 401 || statusCode === 403) {
    return true;
  }

  // Check backend response code for auth errors
  // Adjust these codes based on your backend's error codes
  const authErrorCodes = ['401', '403', 'UNAUTHORIZED', 'TOKEN_EXPIRED', 'INVALID_TOKEN'];
  if (responseCode && authErrorCodes.includes(responseCode.toUpperCase())) {
    return true;
  }

  return false;
};

/**
 * Handle auth error - Clear storage and redirect to login
 */
export const handleAuthError = async (errorMessage?: string) => {
  console.log('Auth error detected:', errorMessage);

  try {
    // Clear all auth-related data
    await AsyncStorage.multiRemove(['authToken', 'userRole', 'userData']);
    console.log('Auth data cleared');
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }

  // Redirect to login
  router.replace('/login');
};

/**
 * Fetch with auth - Makes API call with automatic token handling
 * Automatically redirects to login if token is expired
 */
export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  try {
    // Get token
    const token = await AsyncStorage.getItem('authToken');

    // Add Authorization header if token exists
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Check for auth errors
    if (isAuthError(response.status)) {
      await handleAuthError('Token expired or invalid');
      throw new Error('Authentication failed');
    }

    return response;
  } catch (error: any) {
    // If it's a network error, just throw it
    if (error.message === 'Authentication failed') {
      throw error;
    }

    // For other errors, log and rethrow
    console.error('Fetch error:', error);
    throw error;
  }
};
